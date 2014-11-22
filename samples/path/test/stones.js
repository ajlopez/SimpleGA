
var path = require('../path');

exports['horizontal line free world'] = function (test) {
    var world = path.createWorld(10, 10);
    var stones = world.stones({ x: 0, y: 0 }, { x: 6, y: 0 });
    
    test.ok(stones);
    test.ok(Array.isArray(stones));
    test.equal(stones.length, 0);
};

exports['vertical line free world'] = function (test) {
    var world = path.createWorld(10, 10);
    var stones = world.stones({ x: 0, y: 0 }, { x: 0, y: 6 });
    
    test.ok(stones);
    test.ok(Array.isArray(stones));
    test.equal(stones.length, 0);
};

exports['diagonal line free world'] = function (test) {
    var world = path.createWorld(10, 10);
    var stones = world.stones({ x: 0, y: 0 }, { x: 6, y: 6 });
    
    test.ok(stones);
    test.ok(Array.isArray(stones));
    test.equal(stones.length, 0);
};

exports['horizontal line one stone'] = function (test) {
    var world = path.createWorld(10, 10);
    
    world.set(3, 0, true);    
    
    var stones = world.stones({ x: 0, y: 0 }, { x: 6, y: 0 });

    test.ok(stones);
    test.ok(Array.isArray(stones));
    test.equal(stones.length, 1);
    test.equal(stones[0].x, 3);
    test.equal(stones[0].y, 0);
};
