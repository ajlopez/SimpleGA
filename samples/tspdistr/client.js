
var simplega = require('../../'),
    tsp = require('../tsp/tsp'),
    simplemessages = require('simplemessages');
        
var client = simplemessages.createClient();

client.on('message', function(msg) {
    console.log(msg);
    if (msg.action == 'newproblem')
        newProblem(msg.width, msg.height);
    if (msg.action == 'stop')
        stopped = true;
});

client.connect(3000, 'localhost');

var stopped = false;
var engine = new simplega.Engine();
var mutator = new tsp.Mutator();
engine.setMutators([mutator]);

function newProblem(width, height) {
    var points = tsp.createPointRectangle(width, height);
    var maxlength = width * height * (width*width + height*height);
    var bestresult = maxlength;
    population = tsp.createPopulation(5000, points, maxlength);
    stopped = false;
    
    function doStep() {
        engine.setPopulation(population);
        population = engine.nextPopulation();
        var bestvalue = simplega.getBestValue(population);
        var bestpath = maxlength - bestvalue;
        var l = population.length;
        console.log(l + ': ' + bestpath);
        
        if (bestpath < bestresult) {
            bestresult = bestpath;
            for (var k = 0; k < l; k++)
                if (population[k].evaluate() == bestvalue)
                    client.send( { action: 'newresult', value: bestpath, values: population[k].getValues() });        
        }
                
        if (!stopped)
            process.nextTick(doStep);
    }
    
    process.nextTick(doStep);
}

