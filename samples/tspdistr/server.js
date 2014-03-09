var app = require('express')()
  , httpserver = require('http').createServer(app)
  , io = require('socket.io').listen(httpserver)
  , simplega = require('../../')
  , simplemessages = require('simplemessages');
  
function dump(points, values)
{
    var l = values.length;
    var result = new Array(l);
    
    for (var k =0; k < l; k++)
        result[k] = [ points[values[k]].x, points[values[k]].y ];
        
    console.log(result);
}

function Controller()
{
	var nclients = 0;
	var clients = {};
	var controller = this;
    var stopped = false;
    var bestpath;
	
	this.newClient = function(client) {
        console.log("New Client");
		client.nclient = nclients++;
		clients[client.nclient] = client;
		client.on('data', function(msg) { controller.processMessage(msg); });
		client.on('end', function() { controller.removeClient(client); });
		client.on('close', function() { controller.removeClient(client); });
		client.on('error', function() { controller.removeClient(client); });
	}
	
	this.removeClient = function(client) {
        console.log("Remove Client");
		delete clients[client.nclient];
	}
    
    this.stopClients = function() {
        stopped = true;
        this.broadcast({ action: 'stop' });
    }
	
    this.newProblem = function(width, height) {
        bestpath = width * height * (width*width + height*height);
        stopped = false;
        this.broadcast({ action: 'newproblem', width: width, height: height });
    }
    
    this.processMessage = function(msg) {
        if (stopped)
            return;
        console.log('process message');
        console.dir(msg);
        if (msg.action == 'newresult' && msg.value < bestpath ) {
            bestpath = msg.value;
            this.socket.emit('newresult', { value: msg.value, values: msg.values });
        }
    }
	
	this.broadcast = function(msg) {
        console.log('broadcast');
        console.dir(msg);
		for (var n in clients)
		{
			var client = clients[n];
			try {
				client.write(msg);
			}
			catch (ex) {
				console.log(ex.toString());
			}
		}
	}
}

var controller = new Controller();

var server = simplemessages.createServer(function(client) { controller.newClient(client); });

server.listen(3000);

httpserver.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  controller.socket = socket;
  socket.on('newproblem', function (data) {
    controller.newProblem(data.width, data.height);
  });
  
  socket.on('stop', function() {
    controller.stopClients();
  });
});

