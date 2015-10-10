define(['../core/core'], function (core) {
    core.extend('axes', ['space2'], function (module, space2) {
        var affine = space2.make_axes('affine'),
            polar = space2.make_axes('polar'),
            current = affine,
            listeners = [];

        module.get = function () {
            return current;
        };
        module.toggle = function () {
            current = current === affine ? polar : affine;
            listeners.forEach(function (fn) {
                fn();
            });
            return module;
        };
        module.onToggle = function (fn) {
            listeners.push(fn);
        };
    });
});