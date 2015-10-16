define(['../../core/core'], function (core) {
    core.extend('Line', [], function (module) {
        module.hint(function factory(model) {
            return {
                type: 'segment'
            }
        });
    });
});