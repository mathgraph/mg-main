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
        depInjection: function (deps) {
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
                fn.apply(null, [scope.modules[name]].concat(scope.depInjection(deps)));
                scope.modules[name].name = name;
            },

            module: function (name, deps, factory) {
                scope.modules[name] = factory.apply(null, [scope.moduleProto].concat(scope.depInjection(deps)));
                scope.modules[name].name = name;
            }
        }
    };

    return scope.core;
});