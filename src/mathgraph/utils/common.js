define({
    id: (function () {
        var count = 0;
        return function () {
            return count++;
        }
    })(),
    isArray: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
});