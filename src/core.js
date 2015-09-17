define(['mg-sheet', 'mg-space2', 'mg-gui'], function (Sheet, space2, gui) {

    var mathgraph = {};

    mathgraph.sheet = new Sheet('canvas');
    mathgraph.space2 = space2;
    mathgraph.axes = space2.make_axes('affine');
    mathgraph.axes.basis = [[1, 0], [0, -1]];

    var $_toolbars = [];
    mathgraph.toolbar = function (t) {
        $_toolbars.push(t);
    };

    Object.defineProperty(mathgraph, 'selected', {
        get: function () {
            var s = null;
            sheet.entities.forEach(function (e) {
                if (s) {
                    return;
                }
                if (e.markers.selected) {
                    s = e;
                }
            });
            return s;
        }
    });

    var views = [];
    mathgraph.addUpdater = function (upd) {
        views.push(upd);
    };

    var update = function () {
        views.forEach(function (fn) {
            fn();
        });
        mathgraph.sheet.redraw();
        requestAnimationFrame(update);
    };

    update();

    mathgraph.additional = gui.additional;
    mathgraph.additional.default_start_position = {
        x: 0,
        y: 300
    };
    mathgraph.start = function () {
        gui.toolbar.init($('#toolbar'), 2, 1);
        gui.toolbar.on({
            fields: $_toolbars
        })
    };

    return mathgraph;
});