define(['../../core/core'], function (core) {
    core.extend('Point', [], function (module) {
        module.hint(function factory(model) {
            return {
                x: model.axes.x.toFixed(3),
                y: model.axes.y.toFixed(3)
            }
        });
    });
});