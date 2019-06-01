
var fnxy = (function() {
    function Genotype(fn, x, y) {
        let value;
        
        this.evaluate = function () {
            value = fn(x,y);
            return value;
        }
        
        this.value = function () { return value; };
        
        this.x = function () { return x; }
        this.y = function () { return y; }
        this.fn = function () { return fn; }
    }
    
    function Mutator(delta, fromx, tox, fromy, toy) {
        this.mutate = function (genotype) {
            var x = genotype.x();
            var y = genotype.y();
            var fn = genotype.fn();
            
            var deltax = Math.random() * delta - delta/2;
            var deltay = Math.random() * delta - delta/2;
            
            x += deltax;
            y += deltay;
            
            if (x < fromx)
                x = fromx + (fromx - x);
            if (x > tox)
                x = tox - (x - tox);
            if (y < fromy)
                y = fromy + (fromy - y);
            if (y > toy)
                y = toy - (y - toy);
             
            return new Genotype(fn, x, y);
        }
    }
    
    function createPopulation(size, fn, fromx, tox, fromy, toy) {
        var population = [];
        
        for (var k = 0; k < size; k++) {
            var x = fromx + Math.random() * (tox - fromx);
            var y = fromy + Math.random() * (toy - fromy);
            population.push(new Genotype(fn, x, y));
        }
        
        return population;
    }
    
    function createMutator(delta, fromx, tox, fromy, toy) {
        return new Mutator(delta, fromx, tox, fromy, toy);
    }
    
    return {
        createMutator: createMutator,
        createPopulation: createPopulation
    }
})();

if (typeof(window) === 'undefined')
	module.exports = fnxy;

