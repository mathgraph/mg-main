define(['../core/core'], function (core) {
    core.extend('axes', ['space2'], function (module, space2) {
        var axes = space2.make_axes('affine');
        module.get = function () {
            return axes;
        }
    });
});