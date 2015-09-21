define(['../core/core'], function (core) {

    var updates = [];

    core.module('item', [], function (moduleProto) {

        moduleProto.item = function () {
            var module = this,
                item = {};

            item.module = module;
            item.model = module.$_model.apply(null, arguments);
            item.model.$__item = item;
            item.views = {};
            item.show = function (name) {
                name = name || 'default';
                if (module.$_views && module.$_views[name]) {
                    item.views[name] = module.$_views[name].factory(item.model);
                    item.views[name].$__item = item;
                    item.views[name].$__updId = updates.length;
                    updates.push(function () {
                        module.$_views[name].update &&
                        module.$_views[name].update(item.model, item.views[name]);
                    })
                }
                return item;
            };
            item.hide = function (name) {
                name = name || 'default';
                item.views &&
                item.views[name] &&
                item.views[name].remove &&
                item.views[name].remove();
                updates.splice(item.views[name].$__updId, 1);
                delete item.views[name];
                return item;
            };
            item.show();
            return item;

        };

        moduleProto.view = function (name, factory, update, remove) {
            if (typeof name !== 'string') {
                remove = update;
                update = factory;
                factory = name;
                name = 'default';
            }
            if (!this.$_views) {
                this.$_views = {};
            }
            this.$_views[name] = {
                factory: factory,
                update: update,
                remove: remove
            };
        };

        moduleProto.model = function (factory) {
            this.$_model = factory;
        };

    });

    function updateAll() {
        updates.forEach(function (fn) {
            fn();
        });
        requestAnimationFrame(updateAll);
    }

    updateAll();
});