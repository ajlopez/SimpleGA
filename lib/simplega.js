
const simplega = (function() {
    function Engine(options) {
        options = options || {};
        let population = [];
        let mutators = [];
        let crossovers = [];
        
        this.population = function(newpopulation) {
            if (newpopulation)
                population = newpopulation;
            else
                return population;
        };
        
        this.mutators = function (newmutators) {
            if (newmutators)
                mutators = newmutators;
            else
                return mutators;
        };
        
        this.crossovers = function (newcrossovers) {
            if (newcrossovers)
                crossovers = newcrossovers;
            else
                return crossovers;
        };
        
        this.evolve = function() {
            const l = population.length;
            const values = new Array(l);
            let total = 0;
            let minimum;
            
            for (let k = 0; k < l; k++) {
                const genotype = population[k];
                let value = genotype.evaluate();
                
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
                    
                const genotype = population[k];
                
                const fitness = values[k] / total;
                
                if (fitness < 0)
                    continue;
                    
                const ntimes = Math.floor(fitness);
                const fraction = fitness - ntimes;
                
                for (let j = 0; j < ntimes; j++)
                    newpopulation.push(genotype);
                    
                if (fraction > 0 && Math.random() <= fraction)
                    newpopulation.push(genotype);
            }
            
            const nl = newpopulation.length;
            
            if (mutators && mutators.length > 0) {
                const lm = mutators.length;
                
                for (let k = 0; k < nl / 3; k++) {
                    const j = Math.floor(Math.random() * nl);
                    const mutator = mutators[Math.floor(Math.random() * lm)];
                    newpopulation[j] = mutator.mutate(newpopulation[j]);
                    newpopulation[j].evaluate();
                }
            }
                
            if (crossovers && crossovers.length > 0) {
                const lc = crossovers.length;
                
                for (let k = 0; k < nl / 3; k++) {
                    const j1 = Math.floor(Math.random() * nl);
                    const j2 = Math.floor(Math.random() * nl);
                    const crossover = crossovers[Math.floor(Math.random() * lc)];
                    newpopulation[j1] = crossover.crossover(newpopulation[j1], newpopulation[j2]);
                    newpopulation[j1].evaluate();
                }
            }

            population = newpopulation;
        }
    }
    
    function bests(population, n, reverse) {
        if (reverse)
            population.sort(function (a, b) { return a.value() - b.value(); });
        else
            population.sort(function (a, b) { return b.value() - a.value(); });
        
        return population.slice(0, n);
    }

    function createEngine(options) {
        return new Engine(options);
    }
    
    return {
        engine: createEngine,
        bests: bests
    }
}());

if (typeof(window) === 'undefined') {
    module.exports = simplega;
}

