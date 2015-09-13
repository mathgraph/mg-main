require.config({
    baseUrl: './js',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        text: '../bower_components/text/text',
        paper: '../bower_components/paper/dist/paper-full.min'
    },
    shim: {
        paper: {
            exports: 'paper'
        }
    },
    packages: [
        {
            name: 'dat',
            location: '../bower_components/dat-gui/src/dat',
            main: 'gui/GUI'
        }, {
            name: 'mg-gui',
            location: '../../mg-gui/src',
            main: 'mg-gui'
        }, {
            name: 'mg-sheet',
            location: '../../mg-sheet/js/mg-sheet',
            main: 'mg-sheet'
        }, {
            name: 'mg-space2',
            location: '../../mg-space2/js/mg-space2',
            main: 'mg-space2'
        }
    ]
});

define(['mg-gui', 'mg-sheet', 'mg-space2'], function (gui, Sheet, space2) {
    var sheet = new Sheet('canvas');
    var axes0 = space2.make_axes('affine');
    axes0.basis = [[1, 0], [-1, 0]];

    var generate_additional_segment = function (project) {
        return {
            start_position: {
                x: 0,
                y: 400
            },
            fields: [
                { name:'point2--x',
                    type:'slider',
                    value: project.point2.x,
                    change: function(v) {
                        project.point2.x = v;
                    }
                },
                { name:'point2--y',
                    type:'slider',
                    value: project.point2.y,
                    change: function(v) {
                        project.point2.y = v;
                    }
                }
            ]
        }
    };

    var arrow_tool = sheet.use({
        name: 'arrow',
        target: 'sheet',
        mode: 'single',
        mouseDown: function (sheet, event) {},
        mouseDrag: function (sheet, event) {
            if (!this._current) {

                this._model = space2.make_segment().make_project(axes0);
                this._current = sheet.draw_arrow(event.point, event.point);
                var self = this;
                this._current.on('change', function () {
                    console.log(self._current.to.x);
                    self._model.point1.x = self._current.from.x;
                    self._model.point1.x = self._current.from.y;
                    self._model.point2.x = self._current.to.x;
                    self._model.point2.y = self._current.to.y;
                    console.log(self._model.point2.x);
                    self._add.fields[0].value = self._model.point2.x;
                    self._add.fields[1].value = self._model.point2.y;
                });
                this._add = generate_additional_segment(self._model);
                gui.additional.create(this._add);
            }
            this._current.to = event.point;
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
            callback: function () {
                arrow_tool.enabled = true;
            },
            callback_disable: function () {
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