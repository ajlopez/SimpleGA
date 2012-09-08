
var simplega = require('../'),
    assert = require('assert');

var engine = new simplega.Engine();

assert.ok(engine);

var population = generateGenotypes(10);

engine.setPopulation(population);

var result = engine.nextPopulation();

assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(10, result.length);

function generateGenotypes(n)
{
    var genotypes = [];
    
    for (var k = 0; k < n; k++)
        genotypes.push(new SimpleGenotype());
        
    return genotypes;
}

function SimpleGenotype()
{
    this.evaluate = function() { return 1; }
}

