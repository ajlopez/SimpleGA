
var Path = (function () {    
    function World(width, height) {
        var values = [];
        
        for (var x = 0; x < width; x++)
            for (var y = 0; y < height; y++)
                values[y * width + x] = false;
        
        this.width = function () { return width; }
        
        this.height = function () { return height; }
        
        this.get = function (x, y) { return values[y * width + x]; }
        
        this.set = function (x, y, value) { values[y * width + x] = value; }
        
        this.fill = function (ratio) {
            for (var x = 0; x < width; x++)
                for (var y = 0; y < height; y++)
                    values[y * width + x] = Math.random() <= ratio;
        }

        this.points = function (from, to) {
            var points = [];
            
            if (from.x > to.x || (from.x == to.x && from.y > to.y)) {
                var temp = from;
                from = to;
                to = temp;                
            }
            
            if (from.y == to.y) {
                for (var x = from.x; x <= to.x; x++)
                    points.push({ x: x, y: to.y });
                        
                return points;
            }
            
            return points;
        }
        
        this.stones = function (from, to) {
            var stones = [];
            
            if (from.x > to.x || (from.x == to.x && from.y > to.y)) {
                var temp = from;
                from = to;
                to = temp;                
            }
            
            if (from.y == to.y) {
                for (var x = from.x; x <= to.x; x++)
                    if (this.get(x, to.y))
                        stones.push({ x: x, y: to.y });
                        
                return stones;
            }
            
            if (from.x == to.x) {
                for (var y = from.y; y <= to.y; y++)
                    if (this.get(to.x, y))
                        stones.push({ x: to.x, y: y });
                
                return stones;
            }
            
            return stones;
        }
    }
    
    // http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    function distance(from, to, point) {
        var dx = to.x - from.x;
        var dy = to.y - from.y;
        
        var a = -dy;
        var b = dx;
        var c = dy * from.x - dx * from.y;
        
        return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b);
    }
    
    return {
        createWorld: function (w, h) { return new World(w, h); },
        distance: function (from, to, point) { return distance(from, to, point); }
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Path;
