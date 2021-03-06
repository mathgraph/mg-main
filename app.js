var express = require('express');
var config = require('./config');
var auth = require('basic-auth');
var app = express();

app
    .set('views', __dirname + '/views')
    .set('view engine', 'jade')
    .use(require('body-parser').urlencoded({extended: false}))
    .use(require('body-parser').json());
    // .use(function (req, res, next) {
    //     var credentials = auth(req);
    //     var true_auth = config.get((process.env.NODE_ENV === 'production') ? 'auth_prod' : 'auth_dev');
    //     if (!credentials || credentials.name !== true_auth.login || credentials.pass !== true_auth.password) {
    //         res.statusCode = 401;
    //         res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    //         res.end('Access denied')
    //     } else {
    //         next();
    //     }
    // });

if (process.env.NODE_ENV !== 'production') {
    app.get('/info', require('./helpers/info'));
}

app.use(express.static(__dirname + '/static'));

if (process.env.NODE_ENV == 'production') {
    app.listen(config.get('port_prod'), function () {
        console.log('Instance running on port ', config.get('port_prod'));
    });

} else {
    app
        .use(require('morgan')('dev'))
        .listen(config.get('port_dev'), function () {
            console.log('Instance running on port ', config.get('port_dev'));
        });
}
