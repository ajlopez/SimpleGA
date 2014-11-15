
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

exports['seed world'] = function (test) {
    var world = evol.createWorld(4, 4);
    
    world.seed(50, 100);
    
    for (var x = 0; x < 4; x++)
        for (var y = 0; y < 4; y++) {
            test.ok(world.value(x, y) >= 50);
            test.ok(world.value(x, y) <= 100);
        }
}

exports['grow world'] = function (test) {
    var world = evol.createWorld(4, 4);
    
    world.seed(50, 100);
    world.grow(0.10, 100);
    
    for (var x = 0; x < 4; x++)
        for (var y = 0; y < 4; y++) {
            test.ok(world.value(x, y) >= 50 * 1.1);
            test.ok(world.value(x, y) <= 100);
        }
}

