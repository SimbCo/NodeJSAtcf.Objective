NodeAtcf.Objective--
====================

Presentation and Materials from Simeon Batemans presentation at cf.Objective() 2012 on Node.js

#Code Examples

##Node HTTP Example
	
	var http = require('http');
	
	http.createServer(function (req, res) {
	
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	
	}).listen(3000, "127.0.0.1");
	
	console.log('Server running at http://127.0.0.1:3000/');

##Node Socket Example

	var net = require('net');
	
	var server = net.createServer(function( socket ) {
	  socket.write("Echo server\r\n");
	  socket.pipe(socket);
	});
	
	server.listen(8080);
	
##Node Socket Chat Server

	var net = require('net');
	
	var clients = [];
	
	var server = net.createServer(function( socket ) {
		clients.push(socket);
		socket.idno = clients.length;
		socket.write("Welcome Client " + socket.idno + "\r\n");
	
		socket.addListener("data",function(data){
			for ( var i=0;i<clients.length;i++){
			    clients[i].write('client ' + parseInt(socket.idno) + ": " +data);
			}
		});
	});
	
	server.listen(8080);

##NPM Connect Static Server

	var connect = require('connect');
	
	var server = connect()
		.use(connect.logger('dev'))
		.use(connect.static('public'))
		.use(function(req, res){
			res.end('hello world\n');
		})
		.listen(3000);

##Express Application

	var express = require('express');

	var app = express.createServer();

	app.configure(function(){
		app.use(express.static(__dirname+ "/public"));
		app.use(app.router);
	});

	app.get('/',function(req,res){
		res.send('Hey You found me!');
	});

	app.get('/hey/:name',function(req,res){
		res.send('Dude! ' + req.params.name + ", You Rock!" );
	});

	app.listen(3000);

##Express Application Generation

	npm install express -g
	
	express new expgenapp
	cd expgenapp && npm install
	

##Socket.io
###Server.js

	var express = require('express')
	  , app = express.createServer()
	  , io = require('socket.io').listen(app);
	
	app.configure(function(){
	    app.use(express.static(__dirname+ "/public"));
	});
	
	app.listen(3000);
	
	io.sockets.on('connection', function (socket) {
	    socket.send('Please enter a user name ...');
	    var userName;
	
	    socket.on('message', function(message){
	        if(!userName) {
	            userName = message;
	            io.sockets.send(message + ' has entered the zone.');
	            return;
	        }
	
	        var broadcastMessage = userName + ': ' + message;
	        io.sockets.send(broadcastMessage);
	    });
	    socket.on('disconnect', function() {
	        var broadcastMessage = userName + ' has left the zone.';
	        io.sockets.send(broadcastMessage);
	    });
	});

###index.html

	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
	<html>
	    <head><title>Simple Chat</title></head>
	    <body>
	        <div>
	            <label for="messageText">Message</label>
	            <input type="text" id="messageText">
	        </div>
	        <div><ul id="messages"></ul></div>
	        <script type="text/javascript" src="/socket.io/socket.io.js"></script>
	        <script type="text/javascript" src="http://code.jquery.com/jquery-1.5.2.js"></script>
	        <script type="text/javascript">
	            $(document).ready(function() {
	                var webSocket = io.connect('http://' + document.location.hostname + ':' + document.location.port);
	
	                webSocket.on('connect', function() {
	                    $('#messages').append('<li>Connected to the server.<\/li>');
	                });
	
	                webSocket.on('message', function(message) {
	                    $('#messages').append('<li>' + message + '<\/li>');
	                });
	
	                webSocket.on('disconnect', function() {
	                    $('#messages').append('<li>Disconnected from the server.<\/li>');
	                });
	
	                $('#messageText').keypress( function(e) {
	                    if (e.keyCode && e.keyCode == 13) {
	                        var message = $('#messageText').val();
	                        webSocket.send(message);
	                        $('#messageText').val('');
	                    }
	                });
	            });
	        </script>
	    </body>
	</html>



