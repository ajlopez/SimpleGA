
var simplega = (function() {
    function Engine(options) {
        options = options || {};
        var population;
        var mutators;
        
        this.setPopulation = function(newpopulation) {
            population = newpopulation;
        }
        
        this.setMutators = function(newmutators) {
            mutators = newmutators;
        }
        
        this.nextPopulation = function() {
            var l = population.length;
            var values = new Array(l);
            var total = 0;
            var minimum;
            
            for (var k = 0; k < l; k++) {
                var value = population[k].evaluate();
                
                if (options.minimize)
                    value = -value;
                    
                total += value;
                values[k] = value;
                
                if (k == 0 || value < minimum)
                    minimum = value;
            }
            
            if (minimum < 0)
                for (var k = 0; k < l; k++) {
                    total -= minimum;
                    values[k] -= minimum;
                }
            
            total /= l;
            
            var newpopulation = [];
            
            for (var k = 0; k < l; k++) {
                if (values[k] < 0)
                    continue;
                    
                var fitness = values[k] / total;
                
                if (fitness < 0)
                    continue;
                    
                var ntimes = Math.floor(fitness);
                var fraction = fitness - ntimes;
                
                for (var j = 0; j < ntimes; j++)
                    newpopulation.push(population[k]);
                    
                if (fraction > 0 && Math.random() <= fraction)
                    newpopulation.push(population[k]);
            }
            
            if (mutators && mutators.length > 0) {
                l = newpopulation.length;
                var lm = mutators.length;
                
                for (k = 0; k < l; k++) {
                    var mutator = mutators[Math.floor(Math.random() * lm)];
                    newpopulation[k] = mutator.mutate(newpopulation[k]);
                }
            }
                
            return newpopulation;
        }
    }

    function getBestValue(population, options) {
        options = options || { };
        
        var l = population.length;
        
        if (l == 0)
            return 0;
            
        var max = population[0].evaluate();
        
        for (k = 1; k < l; k++) {
            var value = population[k].evaluate();
            
            if (options.minimize)
                value = -value;
                
            if (value > max) {
                max = value;
            }
        }
        
        return max;
    }

    function getBestGenotype(population, options) {
        options = options || { };
        
        var l = population.length;
        
        if (l == 0)
            return null;
            
        var best = population[0];
        var max = population[0].evaluate();
        
        if (options.minimize)
            max = -max;
        
        for (k = 1; k < l; k++) {
            var value = population[k].evaluate();
            
            if (options.minimize)
                value = -value;
            
            if (value > max) {
                max = value;
                best = population[k];
            }
        }
        
        return best;
    }
    
    return {
        Engine: Engine,
        getBestValue: getBestValue,
        getBestGenotype: getBestGenotype
    }
}());

if (typeof(window) === 'undefined') {
    module.exports = simplega;
}

