
var trading = require('../trading');

exports['create trader'] = function (test) {
    var trader = trading.trader();
    
    test.ok(trader);
    test.equal(trader.evaluate(), 0);
}

exports['create trader with genes'] = function (test) {
    var trader = trading.trader();
    
    test.ok(trader.genes);
    test.ok(Array.isArray(trader.genes));
    test.ok(trader.genes.length);
}

exports['run values with one up gene'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 }
    ];
    
    test.equal(trader.run(1000, [ 1, 1, 1, 1, 1 ]), 1000);
}

exports['run values with one up gene and increased final value'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 }
    ];
    
    test.ok(trader.run(1000, [ 1, 1, 1, 1, 1, 2 ]) > 1000);
}

exports['run values with one up gene and decrease final value'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 }
    ];
    
    test.equal(trader.run(1000, [ 1, 2, 1 ]), 950);
}

exports['run values with one up gene and one down gene'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 },
        { predicate: "down", days: 1, action: "sell", amount: 10 }
    ];
    
    test.equal(trader.run(1000, [ 1, 2, 1, 2 ]), 990);
}

exports['evaluate with one up gene and one down gene and one series'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 },
        { predicate: "down", days: 1, action: "sell", amount: 10 }
    ];
    
    trader.series = [
        { amount: 1000, values: [ 1, 2, 1, 2 ] }
    ];
    
    test.equal(trader.evaluate(), 990);
}
