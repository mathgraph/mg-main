define({
    id: (function () {
        var count = 0;
        return function () {
            return count++;
        }
    })(),
    isArray: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    randomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});