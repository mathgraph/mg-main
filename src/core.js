define(['./utils'], function (utils) {

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



//define(['mg-sheet', 'mg-space2', 'mg-gui'], function (Sheet, space2, gui) {
//
//    var mathgraph = {};
//
//    mathgraph.sheet = new Sheet('canvas');
//    mathgraph.space2 = space2;
//    mathgraph.axes = space2.make_axes('affine');
//    mathgraph.axes.basis = [[1, 0], [0, -1]];
//
//    var models = [];
//    mathgraph.addModelFactory = function (factory) {
//        models.push(factory);
//    };
//
//    var mgObject = {
//        model: {},
//        views: {
//            sheet: function () {},
//            additional: function () {}
//        }
//    };
//
//    mathgraph.target = mgObject;
//
//
//
//
//
//
//
//    var $_toolbars = [];
//    mathgraph.toolbar = function (t) {
//        $_toolbars.push(t);
//    };
//
//    Object.defineProperty(mathgraph, 'selected', {
//        get: function () {
//            var s = null;
//            sheet.entities.forEach(function (e) {
//                if (s) {
//                    return;
//                }
//                if (e.markers.selected) {
//                    s = e;
//                }
//            });
//            return s;
//        }
//    });
//
//    var views = [];
//    mathgraph.addUpdater = function (upd) {
//        views.push(upd);
//    };
//
//    var update = function () {
//        views.forEach(function (fn) {
//            fn();
//        });
//        mathgraph.sheet.redraw();
//        requestAnimationFrame(update);
//    };
//
//    update();
//
//    mathgraph.additional = gui.additional;
//    mathgraph.additional.default_start_position = {
//        x: 0,
//        y: 300
//    };
//    mathgraph.start = function () {
//        gui.toolbar.init($('#toolbar'), 2, 1);
//        gui.toolbar.on({
//            fields: $_toolbars
//        })
//    };
//
//    return mathgraph;
//});