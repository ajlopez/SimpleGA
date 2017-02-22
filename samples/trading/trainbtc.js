
var path = require('path');
var fs = require('fs');

var simplega = require('../..');
var trading = require('./trading');

function loadValues(year) {
	var values = [];
	
	var data = require('./btcdata/bitcoin.json');

	for (var k in data.bpi) {
		if (k.substring(0,4) != year)
			continue;
		
		values.push(data.bpi[k]);
		if (values.length >= 100)
			return values;
	}
	
	return values;
}

function runGenerations(popsize, series, ngenerations) {
    var population = trading.population(popsize, series);
    var mutators = [ trading.mutator() ];
    var engine = new simplega.Engine();
    engine.setPopulation(population);
    engine.setMutators(mutators);

    for (var k = 0; k < ngenerations; k++) {
        var newpopulation = engine.nextPopulation();
        engine.setPopulation(newpopulation);
    }
    
    return newpopulation;
}

var series = [];
var testseries = [];

var intestseries = false;

for (var n = 2; n < process.argv.length; n++) {
    if (process.argv[n] === '--') {
        intestseries = true;
        continue;
    }
    
    var values = loadValues(process.argv[n]);
    
    if (values && values.length > 10)
        if (intestseries)
            testseries.push({ amount: 1000, values: values });         
        else
            series.push({ amount: 1000, values: values });         
}

var population = runGenerations(1000, series, 100);

var best = simplega.getBestGenotype(population);
    
console.log('best trader');
console.dir(best);
console.log('best value', best.evaluate());

best.series = testseries;
console.log('test value', best.evaluate());
    
