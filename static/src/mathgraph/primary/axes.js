define(['../core/core'], function (core) {
    core.extend('axes', ['space2'], function (module, space2) {
        var axes = space2.make_axes('affine');
        axes.basis = [[1, 0], [0, -1]];
        module.get = function () {
            return axes;
        }
    });
});