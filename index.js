require.config({
    baseUrl: '.',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        text: 'bower_components/text/text',
        paper: 'bower_components/paper/dist/paper-full.min'
    },
    shim: {
        paper: {
            exports: 'paper'
        }
    },
    packages: [
        {
            name: 'dat',
            location: 'bower_components/dat-gui/src/dat',
            main: 'gui/GUI'
        }, {
            name: 'mg-gui',
            location: 'bower_components/mg-gui/src',
            main: 'mg-gui'
        }, {
            name: 'mg-sheet',
            location: 'bower_components/mg-sheet/src/mg-sheet',
            main: 'sheet/sheet'
        }, {
            name: 'mg-space2',
            location: 'bower_components/mg-space2/src/mg-space2',
            main: 'space2/space2'
        }
    ]
});

define(['mg-gui', 'mg-sheet', 'mg-space2', './js/synchronizer'], function (gui, Sheet, space2, synch) {
    var sheet = new Sheet('canvas');
    var axes0 = space2.make_axes('affine');
    axes0.basis = [[1, 0], [0, -1]];

    var generate_additional_segment = function (project) {
        return {
            start_position: {
                x: 0,
                y: 400
            },
            fields: [
                {
                    name: 'point2--x',
                    type: 'slider',
                    value: project.point2.x
                },
                {
                    name: 'point2--y',
                    type: 'slider',
                    value: project.point2.y
                }
            ]
        }
    };

    var arrow_tool = sheet.use({
        name: 'arrow',
        target: 'sheet',
        mode: 'single',
        mouseDown: function (sheet, event) {
        },
        mouseDrag: function (sheet, event) {
            if (!this._current) {

                this._model = space2.make_segment().make_project(axes0);
                this._model.point1 = event.point;
                this._current = sheet.draw_segment(event.point, event.point);
                this._add = generate_additional_segment(this._model);
                synch(this._model, this._current, this._add);
                gui.additional.create(this._add);
            }
            this._model.point2 = event.point;
        },
        mouseUp: function (sheet, event) {
            this._current = null;
        }
    });
    var circle_tool = sheet.use({
        name: 'circle',
        target: 'sheet',
        mode: 'single',
        mouseDown: function (sheet, event) {
            this._downPoint = event.point;
        },
        mouseDrag: function (sheet, event) {
            if (!this._current) {
                this._current = sheet.draw_circle(event.point, 0);
            }
            this._current.fit(this._downPoint, event.point);
        },
        mouseUp: function (sheet, event) {
            this._current = null;
        }
    });
    var toolbar = {
        fields: [{
            id: 0,
            type: 'selectable',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=arrow',
            select: function () {
                arrow_tool.enabled = true;
            },
            unselect: function () {
                arrow_tool.enabled = false;
            }
        }, {
            id: 1,
            type: 'selectable',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=circle',
            callback: function () {
                circle_tool.enabled = true;
            },
            callback_disable: function () {
                circle_tool.enabled = false;
            }
        }]
    };

    gui.toolbar.init($('#toolbar'), 2, 1);
    gui.toolbar.on(toolbar);
});