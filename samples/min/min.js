var min = (function() {
	function mutate(value) {
		var rnd = Math.random() * 30;
		
		if (rnd < 10)
			return value / 1.1;
			
		if (rnd < 20)
			return value * 1.1;
			
		return value;
	}
	
    function Genotype(values)
    {
        this.evaluate = function() {
			var vals = [
				values[1] / values[0],
				1.5 * (values[0] + values[1] / 3) / values[1],
				values[3] / values[2],
				1.5 * (values[2] + values[3] / 3) / values[3],
				2 * (values[4] + values[1] / 3) / (values[4] + values[0] + values[1] / 3),
				1 + values[1] / (values[4] + values[0] + values[1] / 2),
				2 * (values[4] + values[0] + values[1] + values[3] / 3) / (values[4] + values[0] + values[1] + values[2] + values[3] / 3)
			];
			
			var val = Math.max(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5], vals[6]);
			
			return -val;
        }
        
        this.getValues = function() { return values; }
        
        this.clone = function(newvalues) {
            return new Genotype(values);
        }
    }    

    function Mutator() {
        this.mutate = function(genotype) {
            var values = genotype.getValues().slice(0);
			
			for (var k = 0; k < values.length; k++)
				values[k] = mutate(values[k]);
				
			return new Genotype(values);
        }
    }
    
    function createPopulation(size)
    {
        var population = [];
        
        for (var k = 0; k < size; k++)
            population.push(new Genotype([ Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10 ]));
        
        return population;
    }

    return {
        Genotype: Genotype,
        Mutator: Mutator,
        createPopulation: createPopulation
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = min;
}
