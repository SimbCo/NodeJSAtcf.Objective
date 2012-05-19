var connect = require('connect');

var server = connect()
    .use(connect.logger('dev'))
    .use(connect.static('public'))
    .use(connect.responseTime())
    .use(function(req, res){    	
        res.end('hello world\n');
    })
    .listen(3000);