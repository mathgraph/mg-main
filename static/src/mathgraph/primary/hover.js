define(['../core/core'], function (core) {
    core.extend('hover', ['sheet'], function (module, sheet) {
        module.on = function (callback) {
            sheet.on('entity-mouseEnter', function (entity) {
                callback(entity.$__item);
            });
        };

        module.off = function (callback) {
            sheet.on('entity-mouseLeave', function (entity) {
                callback(entity.$__item);
            })
        };
    });
});