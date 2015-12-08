
var simplega = require('../../..');
var trading = require('../trading');

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

exports['create population'] = function (test) {
    var series = [
        { amount: 1000, values: [ 1, 2, 1, 2 ] }
    ];
    
    var population = trading.population(100, series);
    
    test.ok(population);
    test.ok(Array.isArray(population));
    test.equal(population.length, 100);
    
    population.forEach(function (trader) {
        test.ok(trader);
        test.ok(trader.genes);
        test.ok(Array.isArray(trader.genes));
        test.ok(trader.genes.length);
        test.strictEqual(trader.series, series);
    });
};

exports['run generation'] = function (test) {
    var series = [
        { amount: 1000, values: [ 1, 2, 3, 4 ] }
    ];
    
    var newpopulation = runGenerations(1000, series, 1);
    
    test.ok(newpopulation);
    test.ok(Array.isArray(newpopulation));
    test.ok(newpopulation.length);
    
    newpopulation.forEach(function (trader) {
        test.ok(trader);
        test.ok(trader.genes);
        test.ok(Array.isArray(trader.genes));
        test.ok(trader.genes.length);
        test.strictEqual(trader.series, series);
    });
    
    var best = simplega.getBestGenotype(newpopulation);
    
    test.ok(best);
    console.log('best trader');
    console.dir(best);
    console.log('best value', best.evaluate());
    test.ok(best.evaluate() >= 1000);
};

exports['run generation with up and down series'] = function (test) {
    var series = [
        { amount: 1000, values: [ 1, 2, 3, 4, 5, 4, 3, 2, 1 ] }
    ];
    
    var newpopulation = runGenerations(1000, series, 1);
    
    test.ok(newpopulation);
    test.ok(Array.isArray(newpopulation));
    test.ok(newpopulation.length);
    
    newpopulation.forEach(function (trader) {
        test.ok(trader);
        test.ok(trader.genes);
        test.ok(Array.isArray(trader.genes));
        test.ok(trader.genes.length);
        test.strictEqual(trader.series, series);
    });
    
    var best = simplega.getBestGenotype(newpopulation);
    
    test.ok(best);
    console.log('best trader');
    console.dir(best);
    console.log('best value', best.evaluate());
    test.ok(best.evaluate() >= 1000);
};

exports['run one hundred generations'] = function (test) {
    var series = [
        { amount: 1000, values: [ 1, 2, 3, 4 ] }
    ];
    
    var newpopulation = runGenerations(1000, series, 100);
    
    test.ok(newpopulation);
    test.ok(Array.isArray(newpopulation));
    test.ok(newpopulation.length);
    
    newpopulation.forEach(function (trader) {
        test.ok(trader);
        test.ok(trader.genes);
        test.ok(Array.isArray(trader.genes));
        test.ok(trader.genes.length);
        test.strictEqual(trader.series, series);
    });
    
    var best = simplega.getBestGenotype(newpopulation);
    
    test.ok(best);
    console.log('best trader');
    console.dir(best);
    console.log('best value', best.evaluate());
    test.ok(best.evaluate() >= 1000);
};

exports['run one hundred generations with up and down series'] = function (test) {
    var series = [
        { amount: 1000, values: [ 1, 2, 3, 4, 5, 4, 3, 2, 1 ] }
    ];
    
    var newpopulation = runGenerations(1000, series, 100);
    
    test.ok(newpopulation);
    test.ok(Array.isArray(newpopulation));
    test.ok(newpopulation.length);
    
    newpopulation.forEach(function (trader) {
        test.ok(trader);
        test.ok(trader.genes);
        test.ok(Array.isArray(trader.genes));
        test.ok(trader.genes.length);
        test.strictEqual(trader.series, series);
    });
    
    var best = simplega.getBestGenotype(newpopulation);
    
    test.ok(best);
    console.log('best trader');
    console.dir(best);
    console.log('best value', best.evaluate());
    test.ok(best.evaluate() >= 1000);
};

