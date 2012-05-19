var express = require('express');

var app = express.createServer();

app.configure(function(){
    app.use(express.static(__dirname+ "/public"));
    app.use(express.responseTime());
    app.use(app.router);
});

app.get('/',function(req,res){
    res.send('Hey You found me!');
});

app.get('/hey/:name',function(req,res){
    res.send('Dude! ' + req.params.name + ", You Rock!" );
});

app.listen(3000);