
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
            
        value = 0;
        
        var x = points[0].x;
        var y = points[0].y;
        
        for (var k = 1; k < n; k++)
        {
            var x2 = points[k].x;
            var y2 = points[k].y;
            
            value += (x-x2) * (x-x2) + (y-y2)*(y-y2);
            
            x = x2;
            y = y2;
        }
        
        return maxlength - value;
    }
}

var points = getPoints(3, 4);
var maxlength = 3 * 4 * (3*3 + 4*4);

var population = [];

for (var k = 1; k < 50; k++)
    population.push(new Genotype(points, maxlength));
    
var engine = new simplega.Engine();

engine.setPopulation(population);

console.log(simplega.getBestValue(population));

for (k = 1; k < 30; k++)
{
    population = engine.nextPopulation();
    console.log(population.length);
    console.log(simplega.getBestValue(population));
    engine.setPopulation(population);
}
