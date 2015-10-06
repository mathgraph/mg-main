define(['../core/core'], function (core) {
    core.extend('axes', ['space2'], function (module, space2) {
        var affine = space2.make_axes('affine'),
            polar = space2.make_axes('polar'),
            current = affine;

        module.get = function () {
            return current;
        };
        module.toggle = function () {
            current = current === affine ? polar : affine;
            return module;
        }
    });
});