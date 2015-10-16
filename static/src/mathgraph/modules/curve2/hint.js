define(['../../core/core'], function (core) {
    core.extend('Curve2', [], function (module) {
        module.hint(function factory(model) {
            return {
                'a^2': model.axes.getCanonical().a2 || -1,
                'b^2': model.axes.getCanonical().b2 || -1,
                'p': model.axes.getCanonical().p || -1
            }
        });
    });
});