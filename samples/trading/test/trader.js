
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

exports['initialize for evaluate'] = function (test) {
    var trader = trading.trader();
    
    trader.init();
    test.equal(trader.evaluate(), 0);
}

exports['run values with one up gene'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 }
    ];
    
    trader.run(1000, [ 1, 1, 1, 1, 1 ]);
    
    test.equal(trader.evaluate(), 1000);
}

exports['run values with one up gene and increased final value'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 }
    ];
    
    trader.run(1000, [ 1, 1, 1, 1, 1, 2 ]);
    
    test.ok(trader.evaluate() > 1000);
}


exports['run values with one up gene and decrease final value'] = function (test) {
    var trader = trading.trader();
    
    trader.genes = [
        { predicate: "up", days: 1, action: "buy", amount: 100 }
    ];
    
    trader.run(1000, [ 1, 2, 1 ]);
    
    test.ok(trader.evaluate() < 1000);
}
