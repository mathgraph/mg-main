define(['../core/core'], function (core) {

    var updates = [];

    core.module('item', [], function (moduleProto) {

        moduleProto.item = function () {
            var module = this,
                item = {};

            item.module = module;
            item.model = module.$_model.apply(null, arguments);
            item.model.$__item = item;
            if (module.$_views && module.$_views.default) {
                item.view = module.$_views.default.factory(item.model);
                item.view.$__item = item;
                updates.push(function () {
                    module.$_views.default.update(item.model, item.view);
                });
            }

            return item;

        };

        moduleProto.view = function (name, factory, update) {
            if (typeof name !== 'string') {
                update = factory;
                factory = name;
                name = 'default';
            }
            if (!this.$_views) {
                this.$_views = {};
            }
            this.$_views[name] = {
                factory: factory,
                update: update
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