
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
    
    function alterGen(genes) {
        var pos = Math.floor(Math.random() * genes.length);
        var newgenes = genes.slice();
        
        newgenes[pos] = choose(mutators)(genes[pos]);
            
        return newgenes;
    }
    
    function Trader(options) {
        options = options || { };
                
        this.energy = function (value) { if (value != null) energy = value; return energy; }
        
        this.clone = function () {
            var newanimal = new Animal(options);
            newanimal.world(world);
            newanimal.genes = this.genes;
            newanimal.run = this.run;
            return newanimal;
        }
        
        this.evaluate = function () { return energy; }        
    }
    
    function Mutator() {
        this.mutate = function (trader) {
            var newtrader = trader.clone();
            
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
        createWorld: function (width, height) { return new World(width, height); },
        createAnimal: function (options) { return new Animal(options); },
        createMutator: function () { return new Mutator(); },
        createGenes: createGenes,
        genesToFunction: genesToFunction
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Trading;

     