
var Evol = (function () {
    var actions = [ "this.eat()", "this.move(1, 0)", "this.move(0,1)", "this.move(-1, 0)", "this.move(0, -1)" ];
    
    function createGen() {
        return {
            value: Math.random(),
            action: Math.floor(Math.random() * actions.length)
        }
    }
    
    function alterGenAction(gen) {
        return {
            value: gen.value,
            action: Math.floor(Math.random() * actions.length)
        }
    }
    
    function alterGenValue(gen) {
        var newvalue = gen.value + Math.random() * 0.2 - 0.1;
        
        newvalue = Math.max(0, newvalue);
        newvalue = Math.min(1, newvalue);
        
        return {
            value: newvalue,
            action: gen.action
        }
    }
    
    function genToCode(gen) {
        return "if (Math.random() < " + gen.value + ") return " + actions[gen.action] + ";";
    }
    
    function genesToFunction(genes) {
        var code = "";
        
        for (var k = 0; k < genes.length; k++)
            code += genToCode(genes[k]);
            
        return new Function(code);
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
        
        if (Math.random() < 0.5)
            newgenes[pos] = genAlterAction(genes[pos]);
        else
            newgenes[pos] = genAlterValue(genes[pos]);
            
        return newgenes;
    }
    
    function Animal(options) {
        options = options || { };
        
        var energy = options.energy || 0;
        var food = options.eat || 0;
        var move = options.move || 0;
        var x;
        var y;
        var world;
        
        this.energy = function (value) { if (value != null) energy = value; return energy; }
        
        this.world = function (newworld) {
            world = newworld;
            x = Math.floor(Math.random() * world.width());
            y = Math.floor(Math.random() * world.height());
        }
        
        this.x = function () { return x; }
        this.y = function () { return y; }
        
        this.clone = function () {
            var newanimal = new Animal(options);
            newanimal.world(world);
            newanimal.genes = this.genes;
            newanimal.run = this.run;
            return newanimal;
        }
        
        this.evaluate = function () { return energy; }
        
        this.eat = function () {
            var value = world.value(x, y);
            var eat = food;
            
            if (value < food)
                eat = value;
                
            energy += eat;
            world.value(x, y, value - eat);
        }
        
        this.move = function (dx, dy) {
            if (energy < move)
                return;
                
            energy -= move;
            x += dx;
            y += dy;
            
            while (x < 0)
                x += world.width();
            while (x >= world.width())
                x -= world.width();
            while (y < 0)
                y += world.height();
            while (y >= world.height())
                y -= world.height();
        }
    }
    
    function World(w, h) {
        var values = [];
        
        for (var x = 0; x < w; x++) {
            values[x] = [];
         
            for (var y = 0; y < h; y++)
                values[x][y] = 0;
        }
        
        this.width = function () { return w; }
        
        this.height = function () { return h; }
        
        this.value = function (x, y, value) { 
            if (value != null)
                values[x][y] = value;
                
            return values[x][y]; 
        }
        
        this.seed = function (from, to) {
            for (var x = 0; x < w; x++)
                for (var y = 0; y < h; y++)
                    values[x][y] = from + Math.random() * (to - from);
        }
        
        this.grow = function (ratio, max) {
            for (var x = 0; x < w; x++)
                for (var y = 0; y < h; y++)
                    values[x][y] = Math.min(values[x][y] * (1 + ratio), max);
        }
    }

    return {
        createWorld: function (width, height) { return new World(width, height); },
        createAnimal: function (options) { return new Animal(options); },
        createGenes: createGenes,
        genesToFunction: genesToFunction
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Evol;

     