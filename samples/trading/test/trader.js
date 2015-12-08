
var trading = require('../trading');

exports['create trader'] = function (test) {
    var trader = trading.trader();
    
    test.ok(trader);
    test.equal(trader.amount(), 0);
    test.equal(trader.evaluate(), 0);
}
