
var simplega = (function() {

    function Engine() {
    }

    return {
        Engine: Engine
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplega;
}

