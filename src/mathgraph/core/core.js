define(function () {

    var scope = {
        moduleProto: {
            view: function (name, factory, update) {
                if (typeof name !== 'string') {
                    update = factory;
                    factory = name;
                    name = 'default';
                }
                if (!this.$_views) {
                    this.$_views = [];
                }
                this.$_views.push({
                    factory: factory,
                    update: update
                });
            }
        },
        depInjection: function (deps, name) {
            var dependencies = [];

            deps.forEach(function (dep) {
                if (dep === '$scope') {
                    dependencies.push(scope);
                    return;
                }
                if (!scope.modules[dep]) {
                    throw new Error('Cannot resolve module dependency. Module: ' + name + '; Dep: ' + dep);
                }
                dependencies.push(scope.modules[dep]);
            });

            return dependencies;
        },
        modules: {},
        core: {
            extend: function (name, deps, fn) {
                if (!scope.modules[name]) {
                    scope.modules[name] = Object.create(scope.moduleProto);
                }
                fn.apply(null, [scope.modules[name]].concat(scope.depInjection(deps, name)));
                scope.modules[name].name = name;
            },

            module: function (name, deps, factory) {
                scope.modules[name] = factory.apply(null, [scope.moduleProto].concat(scope.depInjection(deps, name)));
                scope.modules[name] && (scope.modules[name].name = name);
            },

            start: function () {

                Object.keys(scope.modules).forEach(function (m) {
                    scope.modules[m] &&
                    scope.modules[m].start &&
                    scope.modules[m].start();
                })

            }
        }
    };

    return scope.core;
});