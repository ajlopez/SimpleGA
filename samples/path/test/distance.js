
var path = require('../path');

exports['distance point to line'] = function (test) {
    var result = path.distance({ x: 0, y: 0}, { x: 1, y: 1 }, { x: 0, y: 1 });
    test.equal(result, 1 / Math.sqrt(2));
};

exports['distance point to inverse line'] = function (test) {
    var result = path.distance({ x: 1, y: 1}, { x: 0, y: 0 }, { x: 0, y: 1 });
    test.equal(result, 1 / Math.sqrt(2));
};

exports['distance inverse point to inverse line'] = function (test) {
    var result = path.distance({ x: -1, y: -1}, { x: 0, y: 0 }, { x: 0, y: -1 });
    test.equal(result, 1 / Math.sqrt(2));
};

exports['near points to line'] = function (test) {
    test.ok(path.distance({ x: 0, y: 0}, { x: 1, y: 2 }, { x: 0, y: 1 }) <= 1 / Math.sqrt(2));
    test.ok(path.distance({ x: 0, y: 0}, { x: 1, y: 2 }, { x: 0, y: 2 }) > 1 / Math.sqrt(2));
    test.ok(path.distance({ x: 0, y: 0}, { x: 1, y: 2 }, { x: 0, y: 3 }) > 1 / Math.sqrt(2));
};

