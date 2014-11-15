
var Evol = (function () {
    function Animal(options) {
        options = options || { };
        
        var energy = options.energy || 0;
        var food = options.eat || 0;
        var x;
        var y;
        var world;
        
        this.energy = function () { return energy; }
        
        this.world = function (newworld) {
            world = newworld;
            x = Math.floor(Math.random() * world.width());
            y = Math.floor(Math.random() * world.height());
        }
        
        this.x = function () { return x; }
        this.y = function () { return y; }
        
        this.eat = function () {
            var value = world.value(x, y);
            var eat = food;
            
            if (value < food)
                eat = value;
                
            energy += eat;
            world.value(x, y, value - eat);
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
        createAnimal: function (options) { return new Animal(options); }
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Evol;

     