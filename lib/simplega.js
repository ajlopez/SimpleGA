
const simplega = (function() {
    function Engine(options) {
        options = options || {};
        let population = [];
        let lpop = 0;
        let mutators = [];
        let crossovers = [];
        
        this.population = function(newpopulation) {
            if (newpopulation) {
                population = newpopulation;
                lpop = population.length;
            }
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
        
        this.evolve = function(world) {
            const l = population.length;
            const values = new Array(l);
            let minimum;
            let maximum;
            
            for (let k = 0; k < l; k++) {
                const genotype = population[k];
                let value = genotype.evaluate(world);
                
                values[k] = value;
                
                if (k == 0 || value < minimum)
                    minimum = value;
                
                if (k == 0 || value > maximum)
                    maximum = value;
            }
            
            if (options.minimize)
                for (let k = 0; k < l; k++)
                    values[k] = maximum - values[k] + minimum;
            
            if (minimum < 0)
                for (let k = 0; k < l; k++)
                    values[k] -= minimum;
                
            let total = 0;
            
            for (let k = 0; k < l; k++)
                total += values[k];
            
            total /= l;
            
            let newpopulation = [];
            
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
            const mutated = [];
            
            if (mutators && mutators.length > 0) {
                const lm = mutators.length;
                
                for (let k = 0; k < nl / 3; k++) {
                    const j = Math.floor(Math.random() * nl);
                    const mutator = mutators[Math.floor(Math.random() * lm)];
                    const newgenotype = mutator.mutate(newpopulation[j]);
                    newgenotype.evaluate(world);
                    mutated.push(newgenotype);
                }
            }
            
            const crossed = [];
                
            if (crossovers && crossovers.length > 0) {
                const lc = crossovers.length;
                
                for (let k = 0; k < nl / 3; k++) {
                    const j1 = Math.floor(Math.random() * nl);
                    const j2 = Math.floor(Math.random() * nl);
                    const crossover = crossovers[Math.floor(Math.random() * lc)];
                    const crossedgenotype = crossover.crossover(newpopulation[j1], newpopulation[j2]);
                    crossedgenotype.evaluate(world);
                    crossed.push(crossedgenotype);
                }
            }
            
            newpopulation = newpopulation.concat(mutated);
            newpopulation = newpopulation.concat(crossed);

            if (options.minimize)
                newpopulation.sort(function (a, b) { return a.value() - b.value(); });
            else
                newpopulation.sort(function (a, b) { return b.value() - a.value(); });

            if (newpopulation.length > lpop)
                newpopulation = newpopulation.slice(0, lpop);
            
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

