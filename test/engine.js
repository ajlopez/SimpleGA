
const simplega = require('..');

function generateGenotypes(n, value)
{
    const genotypes = [];
    
    for (let k = 0; k < n; k++)
        genotypes.push(new SimpleGenotype(value));
        
    return genotypes;
}

function SimpleGenotype(value)
{
    this.value = function () { return value; };
    this.evaluate = function() { return value; };
}

function SimpleMutator()
{
    this.mutate = function(genotype) {
        return new SimpleGenotype(genotype.value() + Math.random() - 0.5);
    };
}

function SimpleCrossover() {
    this.crossover = function (genotype1, genotype2) {
        return new SimpleGenotype((genotype1.value() + genotype2.value()) / 2);
    };
}

exports['create engine'] = function (test) {
    const engine = simplega.engine();
    
    test.ok(engine);
    test.equal(typeof engine, 'object');
};

exports['get empty population'] = function (test) {
    const engine = simplega.engine();
    const population = engine.population();
    
    test.ok(population);
    test.ok(Array.isArray(population));
    test.equal(population.length, 0);
};

exports['set and get population'] = function (test) {
    const engine = simplega.engine();
    const population = generateGenotypes(10, 1);
    
    engine.population(population);
    
    const result = engine.population();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, population.length);
    test.deepEqual(result, population);
};

exports['best individuals in population'] = function (test) {
    const engine = simplega.engine();
    const population = generateGenotypes(10, 1);
    
    population.push(new SimpleGenotype(2));
    
    const result = simplega.bests(population, 2);
    
    test.ok(result);
    test.equal(result.length, 2);
    test.equal(result[0].evaluate(), 2);
    test.equal(result[1].evaluate(), 1);
};

exports['worse individuals in population'] = function (test) {
    const engine = simplega.engine();
    const population = generateGenotypes(10, 1);
    
    population.push(new SimpleGenotype(0));
    
    const result = simplega.bests(population, 2, true);
    
    test.ok(result);
    test.equal(result.length, 2);
    test.equal(result[0].evaluate(), 0);
    test.equal(result[1].evaluate(), 1);
};

exports['evolve and get population'] = function (test) {
    const engine = simplega.engine();
    const population = generateGenotypes(10, 1);
    
    engine.population(population);
    engine.evolve();
    
    const result = engine.population();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
};

exports['evolve and get population using mutators'] = function (test) {
    const engine = simplega.engine();
    const population = generateGenotypes(10, 1);
    
    engine.population(population);
    engine.mutators([ new SimpleMutator(), new SimpleMutator() ]);
    engine.evolve();
    
    const result = engine.population();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
};

exports['evolve and get population using crossovers'] = function (test) {
    const engine = simplega.engine();
    const population = generateGenotypes(10, 1);
    
    population.push(new SimpleGenotype(10));
    engine.population(population);
    engine.crossovers([ new SimpleCrossover(), new SimpleCrossover() ]);
    engine.evolve();
    
    const result = engine.population();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
    
    const bests = simplega.bests(result, 1);
    
    test.ok(bests);
    test.equal(bests.length, 1);
    test.equal(bests[0].value(), 10);
};

