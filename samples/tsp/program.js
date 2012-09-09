
var simplega = require('../../');

// http://www.merlyn.demon.co.uk/js-shufl.htm#FnB

function shuffle(values)
{
	var l = values.length;
	
	for (var k = l, j; k-- > 0; )
	{
		var value = values[k];
		j = Math.floor(Math.random() * l);
		values[k] = values[j];
		values[j] = value;
	}
	
	return values;
}

function getPoints(m, n)
{
    var points = [];
    
    for (var k = 0; k < m; k++)
        for (var j = 0; j < n; j++)
            points.push({ x: k, y: j });
            
    return points;
}

function getValues(n)
{
    var values = new Array(n);
    
    for (var k = 0; k < n; k++)
        values[k] = k;
    
    return values;
}

function Genotype(points, maxlength, values)
{
    var n = points.length;
    var value = 0;
    
    if (!values) {
        values = getValues(n);
        shuffle(values);
    }
    
    this.evaluate = function() {
        if (value)
            return value;
            
        value = maxlength;
        
        var x = points[values[0]].x;
        var y = points[values[0]].y;
        
        for (var k = 1; k < n; k++)
        {
            var x2 = points[values[k]].x;
            var y2 = points[values[k]].y;
            
            value -= (x-x2) * (x-x2) + (y-y2)*(y-y2);
            
            x = x2;
            y = y2;
        }
        
        return value;
    }
    
    this.getValues = function() { return values; }
    
    this.clone = function(newvalues) {
        return new Genotype(points, maxlength, newvalues);
    }
}

function Mutator() {
    this.mutate = function(genotype) {
        if (Math.random() >= 0.2)
            return genotype;
            
        var values = genotype.getValues().slice(0);
        var l = values.length;
        
        var pos1 = Math.floor(Math.random() * l);
        var pos2 = (pos1 + 1) % l;
        
/*        if (Math.random() >= 0.8)
            pos2 = Math.floor(Math.random() * l);*/
        
        var value = values[pos1];
        values[pos1] = values[pos2];
        values[pos2] = value;
        
        return genotype.clone(values);
    }
}

var points = getPoints(3, 4);
var maxlength = 3 * 4 * (3*3 + 4*4);

var population = [];

for (var k = 1; k < 5000; k++)
    population.push(new Genotype(points, maxlength));
    
var engine = new simplega.Engine();

engine.setPopulation(population);
engine.setMutators([new Mutator()]);

for (k = 1; k < 500; k++)
{
    population = engine.nextPopulation();
    var bestvalue = simplega.getBestValue(population);
    var bestpath = maxlength - bestvalue;
    var l = population.length;
    console.log(l + ': ' + bestpath);
    engine.setPopulation(population);
}

function dump(points, values)
{
    var l = values.length;
    var result = new Array(l);
    
    for (var k =0; k < l; k++)
        result[k] = [ points[values[k]].x, points[values[k]].y ];
        
    console.log(result);
}