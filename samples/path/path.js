
var Path = (function () {    
    function World(width, height) {
        var values = [];
        
        for (var x = 0; x < width; x++)
            for (var y = 0; y < height; y++)
                values[y * width + x] = false;
        
        this.width = function () { return width; }
        
        this.height = function () { return height; }
        
        this.get = function (x, y) { return values[y * width + x]; }
        
        this.fill = function (ratio) {
            for (var x = 0; x < width; x++)
                for (var y = 0; y < height; y++)
                    values[y * width + x] = Math.random() <= ratio;
        }
    }
    
    return {
        createWorld: function (w, h) { return new World(w, h); }
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Path;
