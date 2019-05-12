
const simplega = (function() {
    function Engine(options) {
        options = options || {};
        let population = [];
        let mutators = [];
        
        this.population = function(newpopulation) {
            if (newpopulation)
                population = newpopulation;
            else
                return population;
        }
        
        this.mutators = function(newmutators) {
            if (newmutators)
                mutators = newmutators;
            else
                return mutators;
        }
        
        this.evolve = function() {
            const l = population.length;
            const values = new Array(l);
            let total = 0;
            let minimum;
            
            for (let k = 0; k < l; k++) {
                let value = population[k].evaluate();
                
                if (options.minimize)
                    value = -value;
                    
                total += value;
                values[k] = value;
                
                if (k == 0 || value < minimum)
                    minimum = value;
            }
            
            if (minimum < 0)
                for (let k = 0; k < l; k++) {
                    total -= minimum;
                    values[k] -= minimum;
                }
            
            total /= l;
            
            const newpopulation = [];
            
            for (let k = 0; k < l; k++) {
                if (values[k] < 0)
                    continue;
                    
                const fitness = values[k] / total;
                
                if (fitness < 0)
                    continue;
                    
                const ntimes = Math.floor(fitness);
                const fraction = fitness - ntimes;
                
                for (let j = 0; j < ntimes; j++)
                    newpopulation.push(population[k]);
                    
                if (fraction > 0 && Math.random() <= fraction)
                    newpopulation.push(population[k]);
            }
            
            if (mutators && mutators.length > 0) {
                const l = newpopulation.length;
                const lm = mutators.length;
                
                for (let k = 0; k < l / 3; k++) {
                    const j = Math.floor(Math.random() * l);
                    const mutator = mutators[Math.floor(Math.random() * lm)];
                    newpopulation[j] = mutator.mutate(newpopulation[j]);
                }
            }
                
            population = newpopulation;
        }
    }

    function getBestValue(population, options) {
        options = options || { };
        
        const l = population.length;
        
        if (l == 0)
            return 0;
            
        let max = population[0].evaluate();
        
        for (let k = 1; k < l; k++) {
            let value = population[k].evaluate();
            
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
        
        const l = population.length;
        
        if (l == 0)
            return null;
            
        let best = population[0];
        let max = population[0].evaluate();
        
        if (options.minimize)
            max = -max;
        
        for (let k = 1; k < l; k++) {
            let value = population[k].evaluate();
            
            if (options.minimize)
                value = -value;
            
            if (value > max) {
                max = value;
                best = population[k];
            }
        }
        
        return best;
    }
    
    function createEngine(options) {
        return new Engine(options);
    }
    
    return {
        engine: createEngine,
        getBestValue: getBestValue,
        getBestGenotype: getBestGenotype
    }
}());

if (typeof(window) === 'undefined') {
    module.exports = simplega;
}

