var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app)
	io = require('socket.io')(server),
	port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  socket.on('request', function (data) {
  	sendResponse(socket, data);
  });
});

var sendResponse = function(socket, data) {
  	setTimeout(function() {
  		socket.emit('response', data);    
  	}, 1000);
}

server.listen(port);