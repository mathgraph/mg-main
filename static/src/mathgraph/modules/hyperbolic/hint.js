define(['../../core/core'], function (core) {
    core.extend('Hyperbolic', [], function (module) {
        module.hint(function factory(model) {
            return {
                'type:': 'Hyperbolic',
                'a': model.axes.a,
                'b': model.axes.b,
                'eccentricity': model.axes.eccentricity
            }
        });
    });
});