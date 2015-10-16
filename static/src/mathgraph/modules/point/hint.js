define(['../../core/core'], function (core) {
    core.extend('Point', [], function (module) {
        module.hint(function factory(model) {
            return {
                type: 'point'
            }
        });
    });
});