
var simplega = require('../../'),
    tsp = require('./tsp');

var points = tsp.createPointRectangle(3, 4);
var maxlength = 3 * 4 * (3*3 + 4*4);

var population = tsp.createPopulation(5000, points, maxlength);

var engine = new simplega.Engine();

engine.setPopulation(population);
engine.setMutators([new tsp.Mutator()]);

for (var k = 1; k < 500; k++)
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

