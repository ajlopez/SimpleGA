
var Path = (function () {
    function World(width, height) {
        this.width = function () { return width; }
        
        this.height = function () { return height; }
        
        this.get = function (x, y) { return false; }
    }
    
    return {
        createWorld: function (w, h) { return new World(w, h); }
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Path;
