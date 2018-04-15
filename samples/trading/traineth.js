
var path = require('path');
var fs = require('fs');

var simplega = require('../..');
var trading = require('./trading');

function loadValues(fromtime, totime) {
	var values = [];
	
	var data = require('./ethdata/ethereum.json');

	for (var k in data.Data) {
		var datum = data.Data[k];
		
		if (datum.time < fromtime || datum.time > totime)
			continue;
		
		if (!datum.close)
			continue;
		
		values.push(datum.close);
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

values = [];
testvalues = [];

var fromtime = parseInt(process.argv[2]);
var totime = parseInt(process.argv[3]);
var testfromtime = parseInt(process.argv[4]);
var testtotime = parseInt(process.argv[5]);

values = values.concat(loadValues(fromtime, totime));         
testvalues = testvalues.concat(loadValues(testfromtime, testtotime));   

testseries.push({ amount: 1000, values: testvalues });         
series.push({ amount: 1000, values: values });         

var population = runGenerations(500, series, 500);

var best = simplega.getBestGenotype(population);
    
console.log('best trader');
console.dir(best);
console.log('best value', best.evaluate());
console.log('training market value', calculateMarketValue(series[0]));
console.log('training series length', best.series[0].values.length, series[0].values.length);

best.series = testseries;
console.log('test value', best.evaluate());
console.log('test market value', calculateMarketValue(testseries[0]));
console.log('test series length', testseries[0].values.length);
    
function calculateMarketValue(serie) {
	return serie.amount * serie.values[serie.values.length - 1] / serie.values[0];
}

