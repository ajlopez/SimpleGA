
var simplega = require('../../..');
var trading = require('../trading');

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