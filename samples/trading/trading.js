
var Trading = (function () {
    var predicates = [ "up", "down" ];
    var actions = [ "buy", "sell" ];
    
    function choose(options) {
        return options[Math.floor(Math.random() * options.length)];
    }
    
    function rndint(mean) {
        return Math.floor(mean + Math.random() * mean - mean / 2);
    }
    
    function clone(obj) {
        var newobj = {};
        
        for (var n in obj)
            newobj[n] = obj[n];
            
        return newobj;
    }
    
    function createGen() {
        return {
            predicate: choose(predicates),
            days: rndint(5),
            action: choose(actions),
            amount: rndint(100)
        };
    }
    
    function alterGenPredicate(gen) {
        var newgen = clone(gen);
        newgen.predicate = choose(predicates);
        return newgen;
    }
    
    function alterGenDays(gen) {
        var newgen = clone(gen);
        newgen.days = alterint(gen.days);
        return newgen;
    }
    
    function alterGenAction(gen) {
        var newgen = clone(gen);
        newgen.action = choose(action);
        return newgen;
    }

    function alterGenAmount(gen) {
        var newgen = clone(gen);
        newgen.amount = alterint(gen.amount);
        return newgen;
    }
    
    function createGenes() {
        var genes = [];
        
        genes.push(createGen());
        
        while (Math.random() < 0.6)
            genes.push(createGen());
            
        return genes;
    }
    
    function eraseGen(genes) {
        if (genes.length <= 1)
            return;
            
        var pos = Math.floor(Math.random() * genes.length);
        
        var newgenes = [];
        
        for (var k = 0; k < genes.length; k++)
            if (k != pos)
                newgenes.push(genes[k]);
                
        return newgenes;
    }
    
    function insertGen(genes) {
        if (genes.length >= 10)
            return;
            
        var pos = Math.floor(Math.random() * genes.length);
        
        var newgenes = [];
        
        for (var k = 0; k < genes.length; k++) {
            if (k == pos)
                newgenes.push(createGen());
                
            newgenes.push(genes[k]);
        }
                
        return newgenes;
    }
    
    function alterGenes(genes) {
        var pos = Math.floor(Math.random() * genes.length);
        var newgenes = genes.slice();
        
        newgenes[pos] = choose(mutators)(genes[pos]);
            
        return newgenes;
    }
    
    function Trader(options) {
        options = options || { };
        
        this.evaluate = function () { 
            if (!this.series)
                return 0;
                
            var value = 0;
            var self = this;
            
            this.series.forEach(function (serie) {
                value += self.run(serie.amount, serie.values);
            });
            
            return value; 
        }
        
        this.genes = createGenes();
        
        this.run = function (amount, values) {
            var nvalues = values.length;
            var ngenes = this.genes.length;
            var status = { amount: amount, quantity: 0 };
            
            for (var k = 0; k < nvalues; k++)
                for (var j = 0; j < ngenes; j++)
                    if (applyGen(this.genes[j], values, k))
                        executeGen(this.genes[j], values[k], status)
                        
            return status.amount + status.quantity * values[nvalues - 1];
        };
    }
    
    function executeGen(gene, value, status) {
        if (gene.action === 'buy') {
            var amount = Math.min(gene.amount, status.amount);
            status.quantity += amount / value;
            status.amount -= amount;
            console.log('buy', amount / value, value, amount);
            console.log('status', status);
            return;
        }

        if (gene.action === 'sell') {
            var quantity = Math.min(gene.amount / value, status.quantity);
            status.quantity -= quantity;
            status.amount += quantity * value;
            console.log('sell', quantity, value, quantity * value);
            console.log('status', status);
            return;
        }
    }
    
    function applyGen(gene, values, day) {
        if (gene.days > 0) {
            if (gene.predicate === 'up') {
                for (var k = 0; k < gene.days; k++) {
                    if (values[day - k] == null)
                        return false;
                    if (values[day - k - 1] == null)
                        return false;
                    if (values[day - k] < values[day - k - 1])
                        return false;
                }
                
                return true;
            }

            if (gene.predicate === 'down') {
                for (var k = 0; k < gene.days; k++) {
                    if (values[day - k] == null)
                        return false;
                    if (values[day - k - 1] == null)
                        return false;
                    if (values[day - k] > values[day - k - 1])
                        return false;
                }
                
                return true;
            }
        }
            
        return false;
    }
    
    function Mutator() {
        this.mutate = function (trader) {
            var newtrader = trader.clone();
            
            if (Math.random() < 0.2) {
                newtrader.genes = alterGenes(newtrader.genes);
                return newtrader;
            }
            
            if (Math.random() < 0.2) {
                newtrader.genes = insertGen(newtrader.genes);
                return newtrader;
            }
            
            if (Math.random() < 0.2) {
                newtrader.genes = eraseGen(newtrader.genes);
                return newtrader;
            }
            
            return trader;
        }
    }

    return {
        trader: function (options) { return new Trader(options); },
        mutator: function () { return new Mutator(); },
        createGenes: createGenes
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Trading;

     