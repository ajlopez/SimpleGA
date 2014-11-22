
var path = require('../path');

exports['create genotype'] = function (test) {
    var world = path.createWorld(10, 10);
    var genotype = path.createGenotype(world, { x: 0, y: 0 }, { x: 9, y: 9 });
    
    test.ok(genotype);
    test.ok(Array.isArray(genotype.path()));
    
    var pth = genotype.path();
    
    test.ok(pth.length >= 2);
    
    test.equal(pth[0].x, 0);
    test.equal(pth[0].y, 0);
    test.equal(pth[pth.length - 1].x, 9);
    test.equal(pth[pth.length - 1].y, 9);
    
    for (var k = 1; k < pth.length - 1; k++) {
        var point = pth[k];
        test.ok(point.x >= 0);
        test.ok(point.x <= 9);
        test.ok(point.y >= 0);
        test.ok(point.y <= 9);
    }
    
    test.ok(genotype.evaluate() > 0);
};
