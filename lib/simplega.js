
var simplega = (function() {

    function Engine() {
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
            
            for (var k = 0; k < l; k++) {
                var value = population[k].evaluate();
                total += value;
                values[k] = value;
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

    return {
        Engine: Engine
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplega;
}

