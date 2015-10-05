var Promise = require('promise');
var query = require('../../../helpers/wolfram');
var _ = require('lodash');

function genQuery(fxy, str) {
    return new Promise(function (resolve, reject) {
        query('solve({' + fxy + '=0,' + str + '})', function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            var solutions = _.pluck(_.find(result, {title: 'Solutions'}).subpods, 'value').map(function (s) {
                var arr = s.split(' ').join('').split(',');
                var sol = {};
                arr.forEach(function (item) {
                    sol[item.split('=')[0]] = +item.split('=')[1];
                });
                return sol;
            });
            resolve(solutions);
        });
    })
}

module.exports = function (req, res) {
    var left = req.query.left,
        right = req.query.right,
        top = req.query.top,
        bottom = req.query.bottom,
        fxy = req.query.fxy,
        promises = [];

    left && promises.push(genQuery(fxy, 'x=' + left));
    right && promises.push(genQuery(fxy, 'x=' + right));
    top && promises.push(genQuery(fxy, 'y=' + top));
    bottom && promises.push(genQuery(fxy, 'y=' + bottom));
    promises.push(genQuery(fxy, ))

};