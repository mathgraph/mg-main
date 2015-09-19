define(['../../core'], function (core) {
    var module = core.extend('Segment');

    module.model('default', function () {
        return core.space2.make_segment();
    });

});