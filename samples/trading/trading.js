
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
        
        var amount = 0;
        
        this.amount = function (value) { if (value != null) amount = value; else return amount; }
        
        this.evaluate = function () { return 0; }
        
        this.genes = createGenes();
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

     