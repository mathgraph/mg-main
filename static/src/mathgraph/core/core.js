define(['lodash'], function (_) {

    var scope = {
        moduleProto: {},
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
        depGraph: {},
        doExtend: function (name, deps, fn) {
            if (!scope.modules[name]) {
                scope.modules[name] = Object.create(scope.moduleProto);
            }
            fn.apply(null, [scope.modules[name]].concat(scope.depInjection(deps, name)));
            scope.modules[name].name = name;
        },
        doModule: function (name, deps, factory) {
            scope.modules[name] = factory.apply(null, [scope.moduleProto].concat(scope.depInjection(deps, name)));
            scope.modules[name] && (scope.modules[name].name = name);
        },
        load: function (mod) {
            if (!mod || mod.loaded) {
                return;
            }
            mod.deps.forEach(function (d) {
                scope.depGraph[d] && scope.depGraph[d].forEach(function (m) {
                    scope.load(m)
                });
            });
            if (mod.type === 'module') {
                scope.doModule(mod.name, mod.deps, mod.factory);
            } else if (mod.type === 'extend') {
                scope.doExtend(mod.name, mod.deps, mod.fn);
            }
            mod.loaded = true;
            console.log('Mathgraph: module "' + mod.name + '" successfully loaded...');
        },

        loadAll: function () {
            scope.primary.forEach(function (d) {
                scope.depGraph[d] && scope.depGraph[d].forEach(function (m) {
                    !m.loaded && scope.load(m);
                });
            });
            _.forOwn(scope.depGraph, function (d) {
                d && d.forEach(function (m) {
                    !m.loaded && scope.load(m);
                });
            });
        },

        primary: [],

        core: {
            primary: function (deps) {
                scope.primary = scope.primary.concat(deps);
                return scope.core;
            },
            extend: function (name, deps, fn) {
                scope.depGraph[name] = scope.depGraph[name] || [];
                scope.depGraph[name].push({
                    type: 'extend',
                    name: name,
                    deps: deps,
                    fn: fn,
                    loaded: false
                });
                return scope.core;
            },

            module: function (name, deps, factory) {
                scope.depGraph[name] = scope.depGraph[name] || [];
                scope.depGraph[name].push({
                    type: 'module',
                    name: name,
                    deps: deps,
                    factory: factory,
                    loaded: false
                });
                return scope.core;
            },

            start: function () {
                scope.loadAll();
                Object.keys(scope.modules).forEach(function (m) {
                    scope.modules[m] &&
                    scope.modules[m].start &&
                    scope.modules[m].start();
                });
                return scope.core;
            }
        }
    };

    return scope.core;
});