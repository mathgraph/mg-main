define(['../core/core'], function (core) {
    core.extend('selected', ['sheet'], function (module, sheet) {
        module.get = function () {
            return sheet.filter(function (entity) {
                return entity.markers.selected;
            }).map(function (e) {
                return e.$__item;
            })[0];
        };

        module.on = function (callback) {
            sheet.on('select', function (entity) {
                callback(entity.$__item);
            });
        };

        module.off = function (callback) {
            sheet.on('deselect', function (entity) {
                callback(entity.$__item);
            })
        };
    });
});