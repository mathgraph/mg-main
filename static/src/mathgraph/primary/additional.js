define(['lodash', '../core/core', '../utils/common', 'mg-gui'], function (lodash, core, utils, gui) {
    core.module('additional', ['selected', 'axes'], function (moduleProto, selected, axes) {

        selected.on(function (item) {
            var profile = axes.get().type;
            item.module.$_views['additional#' + profile] && item.show('additional#' + profile);
            !item.module.$_views['additional#' + profile] &&
            item.module.$_views['additional#default'] && item.show('additional#default');
        });

        selected.off(function (item) {
            _.forOwn(item.views, function (val, key) {
                _.startsWith(key, 'additional#') && item.hide(key);
            });
        });

        moduleProto.additional = function (profile, factory, update) {
            var module = this;

            if (_.isFunction(profile)) {
                update = factory;
                factory = profile;
                profile = 'default';
            }

            module.$__additional = module.$__additional || {};
            module.$__additional[profile] = {
                factory: factory,
                update: update
            };

            module.view('additional#' + profile, function factory(model) {
                return gui.additional.create({
                    fields: module.$__additional[profile].factory(model)
                });
            }, function update(model, additional) {
                var data = additional.data;
                module.$__additional[profile].update(model, data.fields);
            }, function remove(additional) {
                additional.remove();
            });
        };

        return {
            start: function () {
                gui.additional.default_start_position = {
                    x: 0,
                    y: 400
                }
            }
        }

    });
});