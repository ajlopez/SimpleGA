
var simplega = require('../../');
var fnxy = require('./fnxy');

var fn = function (x, y) {
    return x + y;
}

var population = fnxy.createPopulation(1000, fn, -10, 10, -10, 10);
var mutators = [];

mutators.push(fnxy.createMutator(1, -10, 10, -10, 10));
mutators.push(fnxy.createMutator(0.1, -10, 10, -10, 10));
mutators.push(fnxy.createMutator(0.01, -10, 10, -10, 10));
mutators.push(fnxy.createMutator(0.001, -10, 10, -10, 10));

var engine = new simplega.Engine();

engine.setPopulation(population);
engine.setMutators(mutators);

for (var k = 1; k < 500; k++)
{
    population = engine.nextPopulation();
    var best = simplega.getBestGenotype(population);
    console.log(best.x(), best.y(), best.evaluate());
}
