var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , simplega = require('../../')
  , tsp = require('../tsp/tsp.js');

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var population;
var engine = new simplega.Engine();
var mutator = new tsp.Mutator();
engine.setMutators([mutator]);

var stopped = false;

io.sockets.on('connection', function (socket) {
  socket.on('newproblem', function (data) {
    var points = tsp.createPointRectangle(data.width, data.height);
    var maxlength = data.width * data.height * (data.width*data.width + data.height*data.height);
    population = tsp.createPopulation(5000, points, maxlength);
    engine.setPopulation();
    stopped = false;
    
    function doStep() {
        engine.setPopulation(population);
        population = engine.nextPopulation();
        var bestvalue = simplega.getBestValue(population);
        var bestpath = maxlength - bestvalue;
        var l = population.length;
        console.log(l + ': ' + bestpath);
        
        for (var k = 0; k < l; k++)
            if (population[k].evaluate() == bestvalue)
                socket.emit('newresult', { value: bestpath, values: population[k].getValues() });
                
        if (!stopped)
            setImmediate(doStep);
    }
    
    setImmediate(doStep);
  });
  
  socket.on('stop', function() {
    stopped = true;
  });
});