
var simplega = (function() {

    function Engine() {
        var population;
        
        this.setPopulation = function(newpopulation) {
            population = newpopulation;
        }
        
        this.nextPopulation = function() {
            for (var n in population)
                population[n].evaluate();
                
            return population;
        }
    }

    return {
        Engine: Engine
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplega;
}

