define(['../../core/core'], function (core) {
    core.extend('Parabola', [], function (module) {
        module.hint(function factory(model) {
            return {
                'type:': 'Parabola',
                'p': model.axes.p,
                'eps': 1
            }
        });
    });
});