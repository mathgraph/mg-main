define(['../../core/core'], function (core) {
    core.extend('Ellipse', [], function (module) {
        module.hint(function factory(model) {
            return {
                'type:': 'Ellipse',
                'a': model.axes.a,
                'b': model.axes.b,
                'eccentricity': model.axes.eccentricity
            }
        });
    });
});