define(['../../core/core'], function (core) {
    core.extend('Segment', [], function (module) {
        module.hint(function factory(model) {
            return {
                type: 'segment'
            }
        });
    });
});