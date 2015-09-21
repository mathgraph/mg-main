var express = require('express');
var config = require('./config');
var app = express();

app
    .use(require('body-parser').urlencoded({ extended: false }))
    .use(require('body-parser').json())
    .use(express.static(__dirname + '/static'));
if (process.env.NODE_ENV == 'production'){
    app.listen(config.get('port_prod'), function(){
            console.log('Instance running on port ', config.get('port_prod'));
        });

} else {
    app
        .use(require('morgan')('dev'))
        .listen(config.get('port_dev'), function(){
            console.log('Instance running on port ', config.get('port_dev'));
        });
}
