
var Evol = (function () {
    function World(w, h) {
        var values = [];
        
        for (var x = 0; x < w; x++) {
            values[x] = [];
         
            for (var y = 0; y < h; y++)
                values[x][y] = 0;
        }
        
        this.width = function () { return w; }
        
        this.height = function () { return h; }
        
        this.value = function (x, y) { return values[x][y]; }
        
        this.seed = function (from, to) {
            for (var x = 0; x < w; x++)
                for (var y = 0; y < h; y++)
                    values[x][y] = from + Math.random() * (to - from);
        }
    }

    return {
        createWorld: function (width, height) { return new World(width, height); }
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Evol;

     