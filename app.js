var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
  virtualPath = process.env.VIRTUAL_PATH,
	io = require('socket.io')(server, {path: virtualPath + '/socket.io'}),  
	port = process.env.PORT || 3000;

console.log(virtualPath);

app.use(virtualPath, express.static(__dirname + '/public'));

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