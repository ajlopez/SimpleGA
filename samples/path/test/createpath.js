
var path = require('../path');

exports['create path'] = function (test) {
    var pth = path.createPath({ x: 0, y: 0 }, { x: 9, y: 9 }, 10, 10);
    
    test.ok(pth);
    test.ok(Array.isArray(pth));
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
};

exports['create forty paths'] = function (test) {
    var tlength = 0;
    
    for (var n = 0; n < 40; n++) {
        var pth = path.createPath({ x: 0, y: 0 }, { x: 9, y: 9 }, 10, 10);
        
        test.ok(pth);
        test.ok(Array.isArray(pth));
        test.ok(pth.length >= 2);
        
        tlength += pth.length;
        
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
    }
    
    test.ok(tlength > 40 * 2);
};
