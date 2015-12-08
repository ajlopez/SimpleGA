
var trading = require('../trading');

exports['create trader'] = function (test) {
    var trader = trading.trader();
    
    test.ok(trader);
    test.equal(trader.amount(), 0);
    test.equal(trader.evaluate(), 0);
}

exports['create trader with genes'] = function (test) {
    var trader = trading.trader();
    
    test.ok(trader.genes);
    test.ok(Array.isArray(trader.genes));
    test.ok(trader.genes.length);
}

exports['set amount'] = function (test) {
    var trader = trading.trader();
    
    trader.amount(1000);
    test.equal(trader.amount(), 1000);
    test.equal(trader.evaluate(), 0);
}

