
var path = require('path');
var fs = require('fs');

var simplega = require('../..');
var trading = require('./trading');

function loadValues(year) {
	var values = [];
	var l = year.length;
	
	var data = require('./btcdata/bitcoin.json');

	for (var k in data.bpi) {
		if (k.substring(0,l) != year)
			continue;
		
		values.push(data.bpi[k]);
	}
	
	return values;
}

function runGenerations(popsize, series, ngenerations) {
    var population = trading.population(popsize);
    var mutators = [ trading.mutator() ];
    var engine = simplega.engine();
    engine.population(population);
    engine.mutators(mutators);

    for (var k = 0; k < ngenerations; k++) {
        engine.evolve(series);
        
        if (k % 100 == 0) {
            const newpopulation = engine.population();
            const best = simplega.bests(newpopulation, 1)[0];
            console.log(k, population.length, best.value());
        }
    }
    
    return engine.population();
}

var series = [];
var testseries = [];

var intestseries = false;

values = [];
testvalues = [];

for (var n = 2; n < process.argv.length; n++) {
    if (process.argv[n] === '--') {
        intestseries = true;
        continue;
    }
    
    var newvalues = loadValues(process.argv[n]);
    
    if (newvalues)
        if (intestseries)
            testvalues = testvalues.concat(newvalues);         
        else
            values = values.concat(newvalues);
}

testseries.push({ amount: 1000, values: testvalues });         
series.push({ amount: 1000, values: values });         

var population = runGenerations(500, series, 5000);

var best = simplega.bests(population, 1)[0];
    
console.log('best trader');
console.dir(best);
console.log('best value', best.evaluate(series));
console.log('training market value', calculateMarketValue(series[0]));
console.log('training series length', series[0].values.length, series[0].values.length);

console.log('test value', best.evaluate(testseries));
console.log('test market value', calculateMarketValue(testseries[0]));
console.log('test series length', testseries[0].values.length);
    
function calculateMarketValue(serie) {
	return serie.amount * serie.values[serie.values.length - 1] / serie.values[0];
}

