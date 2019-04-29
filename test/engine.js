
const simplega = require('../');
const assert = require('assert');

const engine = new simplega.Engine();

assert.ok(engine);

var population = generateGenotypes(10, 1);

engine.setPopulation(population);

var result = engine.nextPopulation();

assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(10, result.length);

population = [];
population.push(new SimpleGenotype(1));
population.push(new SimpleGenotype(2));

engine.setPopulation(population);

var result = engine.nextPopulation();

assert.ok(result);
assert.ok(Array.isArray(result));
assert.ok(result.length >= 1);

var mutator = new SimpleMutator();

var mutators = [ mutator, mutator, mutator ];

engine.setMutators(mutators);

result = engine.nextPopulation();

assert.ok(result);
assert.ok(Array.isArray(result));
assert.ok(result.length >= 1);

engine.setPopulation(generateGenotypes(10, 1));

for (var k = 1; k <= 10; k++)
{
    result = engine.nextPopulation();
    engine.setPopulation(result);
}

assert.ok(result);
assert.ok(Array.isArray(result));
assert.ok(result.length >= 1);
assert.ok(getMaxValue(result) >= 1);

function generateGenotypes(n, value)
{
    const genotypes = [];
    
    for (var k = 0; k < n; k++)
        genotypes.push(new SimpleGenotype(value));
        
    return genotypes;
}

function SimpleGenotype(value)
{
    this.evaluate = function() { return value; }
}

function SimpleMutator()
{
    this.mutate = function(genotype) {
        return new SimpleGenotype(genotype.evaluate() + Math.random() - 0.5);
    }
}

function getMaxValue(population) {
    const l = population.length;
    
    if (l == 0)
        return 0;
        
    let max = population[0].evaluate();
    
    for (let k = 1; k < l; k++) {
        const value = population[k].evaluate();
        
        if (value > max)
            max = value;
    }
    
    return max;
}

