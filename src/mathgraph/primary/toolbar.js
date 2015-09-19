define(['../core/core', 'mg-gui'], function (core, gui) {
    var fullToolbar = {
        fields: []
    };
    core.module('toolbar', [], function (moduleProto) {

        moduleProto.toolbar = function (obj) {
            fullToolbar.fields.push(obj);
        };

        return {
            init: gui.toolbar.init,
            on: function () {
                gui.toolbar.on(fullToolbar);
            },
            start: function () {
                gui.toolbar.init(document.getElementById('toolbar'), 2, 1);
                gui.toolbar.on(fullToolbar);
            }
        }

    });
});