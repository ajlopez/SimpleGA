
var simplega = require('../../'),
    simplemessages = require('simplemessages');
        
var client = simplemessages.createClient();

client.on('message', function(msg) {
    console.log(msg);
});

client.connect(3000, 'localhost');

