
var path = require('../path');

exports['create empty world'] = function (test) {
    var world = path.createWorld(10, 10);
    
    test.ok(world);
    test.equal(world.width(), 10);
    test.equal(world.height(), 10);
    
    for (var x = 0; x < 10; x++)
        for (var y = 0; y < 10; y++)
            test.ok(!world.get(x, y));
};

exports['fill world ramdomly'] = function (test) {
    var world = path.createWorld(10, 10);
    
    world.fill(0.5);
    
    var count = 0;
    
    for (var x = 0; x < 10; x++)
        for (var y = 0; y < 10; y++)
            if (world.get(x, y))
                count++;
                
    test.ok(count > 5);
};

exports['set and get'] = function (test) {
    var world = path.createWorld(10, 10);

    test.ok(!world.get(5, 5));
    world.set(5, 5, true);
    test.ok(world.get(5, 5));
    world.set(5, 5, false);
    test.ok(!world.get(5, 5));
};

