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