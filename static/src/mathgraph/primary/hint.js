define(['lodash', '../core/core', 'jquery', 'mg-gui'], function (_, core, $, gui) {
    var lastPoint = null;
    $('body').mousemove(function (event) {
        lastPoint = {
            x: event.pageX + 10,
            y: event.pageY + 10
        };
    });

    core.module('hint', ['hover'], function (moduleProto, hover) {
        var hint = gui.hint,
            module = Object.create(moduleProto);

        moduleProto.hint = function (hfactory) {
            var module = this;
            if (hfactory) {
                module.$__hint = {
                    factory: hfactory
                }
            }
            return module;
        };

        var hintData = {
            flag: false,
            update: function () {
                hint.off();
                this.data = this.factory();
                hint.data = this.data;
                this.flag && hint.on(lastPoint);
            },
            data: null,
            factory: function () {
                return null;
            }
        };
        var timer = -1;

        hover.on(function (item) {
            hintData.factory = function () {
                return item.module.$__hint && item.module.$__hint.factory(item.model);
            };
            timer = setTimeout(function () {
                hintData.update();
                hint.on(lastPoint);
                hintData.flag = true;
            }, 1000);
        });
        hover.off(function (item) {
            clearTimeout(timer);
            timer = -1;
            hintData.flag = false;
            hint.off();
            hintData.data = null;
            hintData.factory = function () { return null; };
        });

        module.model(function () {
            return hintData;
        });

        module.view(function factory(model) {
            return model;
        }, function update(model) {
            model.update();
        }, function remove() {});

        module.item().show();

        return module;

    });
});