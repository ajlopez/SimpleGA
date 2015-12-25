
var path = require('path');
var fs = require('fs');

var simplega = require('../..');
var trading = require('./trading');

function loadValues(name) {
    var text = fs.readFileSync(path.join('data', name + '.csv')).toString();
    
    var lines = text.split('\r');
    var nlines = lines.length;
    var values = [];
    
    for (var k = 0; k < nlines; k++) {
        var line = lines[k].trim();
        var ch = line[0];

        if (ch < '0' || ch > '9')
            continue;
            
        var parts = line.split(',');
        
        if (parts.length != 2)
            continue;
            
        values.push(parseFloat(parts[1]));
    }
    
    values.reverse();
    
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

for (var n = 2; n < process.argv.length; n++) {
    var values = loadValues(process.argv[n]);
    
    if (values && values.length > 10)
        series.push({ amount: 1000, values: values });         
}

var population = runGenerations(1000, series, 100);

var best = simplega.getBestGenotype(population);
    
console.log('best trader');
console.dir(best);
console.log('best value', best.evaluate());

    
