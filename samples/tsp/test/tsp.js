
var tsp = require('../tsp'),
    assert = require('assert');

var points = tsp.createPointRectangle(3, 4);

assert.ok(points);
assert.ok(Array.isArray(points));
assert.equal(3*4, points.length);	

var maxlength = 3 * 4 * (3*3 + 4*4);

var genotype = new tsp.Genotype(points, maxlength);

assert.ok(genotype);
assert.ok(genotype.evaluate() > 0);

var values = genotype.getValues();

assert.ok(values);
assert.ok(Array.isArray(values));
assert.equal(3*4, values.length);

var mutator = new tsp.Mutator();

var newgenotype = mutator.mutate(genotype);

assert.ok(newgenotype);

var newvalues = newgenotype.getValues();

assert.ok(newvalues);
assert.ok(Array.isArray(newvalues));
assert.equal(3*4, newvalues.length);

var population = tsp.createPopulation(1000, points, maxlength);

assert.ok(population);
assert.ok(Array.isArray(population));
assert.equal(1000, population.length);

