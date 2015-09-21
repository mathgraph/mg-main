define(function () {

    var deps = [];

    return {
        dep: function (array) {
            deps = array.concat(deps);
        },
        start: function (callback) {
            function load(module) {
                console.log(module);
                require([module], function () {
                    if (deps.length) {
                        load(deps.shift());
                    } else {
                        callback && callback();
                    }
                })
            }

            load(deps.shift());
        }
    };

});