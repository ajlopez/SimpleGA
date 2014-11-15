
var Evol = (function () {
    function World(w, h) {
        this.width = function () { return w; }
        
        this.height = function () { return h; }
        
        this.value = function (x, y) { return 0; }
    }

    return {
        createWorld: function (width, height) { return new World(width, height); }
    }
})();

if (typeof(window) === 'undefined')
	module.exports = Evol;
