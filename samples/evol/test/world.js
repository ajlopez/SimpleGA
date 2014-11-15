
var evol = require('../evol');

exports['create world'] = function (test) {
    var world = evol.createWorld(10, 10);
    
    test.ok(world);
    test.equal(typeof world, 'object');
    test.equal(world.width(), 10);
    test.equal(world.height(), 10);
    
    for (var x = 0; x < 10; x++)
        for (var y = 0; y < 10; y++)
            test.equal(world.value(x, y), 0);
};

