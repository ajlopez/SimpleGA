var simplega = require('../../'),
    min = require('./min');

var population = min.createPopulation(100000);

var engine = simplega.engine({ minimize: true });

engine.population(population);
engine.mutators([new min.Mutator(), { mutate: function(genotype) { return genotype; }}]);

var thebest;
var thebestvalue;

for (var k = 1; k < 5000; k++)
{
    engine.evolve();
    population = engine.population();
    const best = simplega.bests(population, 1, true)[0];
    const bestvalue = best.value();
	
	if (!thebest || thebestvalue > bestvalue) {
		thebest = best;
		thebestvalue = bestvalue;
	}
	
	if (k % 20)
		continue;
		
    console.log('round best value', bestvalue);
	console.log('round best', best.getValues());
    console.log('best value', thebestvalue);
	console.log('best', thebest.getValues());
}

