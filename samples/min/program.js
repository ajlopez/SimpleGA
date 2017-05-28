var simplega = require('../../'),
    min = require('./min');

var population = min.createPopulation(100000);

var engine = new simplega.Engine();

engine.setPopulation(population);
engine.setMutators([new min.Mutator(), { mutate: function(genotype) { return genotype; }}]);

var thebest;
var thebestvalue;

for (var k = 1; k < 5000; k++)
{
    population = engine.nextPopulation();
    var bestvalue = simplega.getBestValue(population);
	var best = simplega.getBestGenotype(population);
    engine.setPopulation(population);
	
	if (!thebest || thebestvalue < bestvalue) {
		thebest = best;
		thebestvalue = bestvalue;
	}
	
	if (k % 100)
		continue;
		
    console.log('round best value', -bestvalue);
	console.log('round best', best.getValues());
    console.log('best value', -thebestvalue);
	console.log('best', thebest.getValues());
}

