
var path = require('../path');

exports['horizontal line'] = function (test) {
    var world = path.createWorld(10, 10);
    var points = world.points({ x: 0, y: 0 }, { x: 6, y: 0 });
    
    test.ok(points);
    test.ok(Array.isArray(points));
    test.equal(points.length, 7);
    
    for (var k = 0; k < 7; k++) {
        test.equal(points[k].x, k);
        test.equal(points[k].y, 0);
    }
};

exports['vertical line'] = function (test) {
    var world = path.createWorld(10, 10);
    var points = world.points({ x: 0, y: 0 }, { x: 0, y: 6 });
    
    test.ok(points);
    test.ok(Array.isArray(points));
    test.equal(points.length, 7);
    
    for (var k = 0; k < 7; k++) {
        test.equal(points[k].x, 0);
        test.equal(points[k].y, k);
    }
};
