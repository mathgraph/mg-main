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

define(['../../mg-gui/src/mg-gui', 'mg-sheet', 'mg-space2'], function (gui, Sheet, space2) {
    var sheet = new Sheet('canvas');
    var arrow_tool = {
        type: 'global',
        down: function (event) {},
        drag: function (event) {
            if (!this._current) {
                this._current = sheet.draw_arrow(event.point, event.point);
            }
            this._current.to = event.point;
        },
        up: function (event) {
            this._current = null;
        }
    };
    var circle_tool = {
        type: 'global',
        down: function (event) {
            this._downPoint = event.point;
        },
        drag: function (event) {
            if (!this._current) {
                this._current = sheet.draw_circle(event.point, 0);
            }
            this._current.fit(this._downPoint, event.point);
        },
        up: function (event) {
            this._current = null;
        }
    };
    var toolbar = {
        fields: [{
            id: 0,
            type: 'selectable',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=arrow',
            callback: function () {
                sheet.on('mouseDown', arrow_tool.down);
                sheet.on('mouseDrag', arrow_tool.drag);
                sheet.on('mouseUp', arrow_tool.up);
            },
            callback_disable: function () {
                sheet.off('mouseDown', arrow_tool.down);
                sheet.off('mouseDrag', arrow_tool.drag);
                sheet.off('mouseUp', arrow_tool.up);
            }
        }, {
            id: 1,
            type: 'selectable',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=circle',
            callback: function () {
                sheet.on('mouseDown', circle_tool.down);
                sheet.on('mouseDrag', circle_tool.drag);
                sheet.on('mouseUp', circle_tool.up);
            },
            callback_disable: function () {
                sheet.off('mouseDown', circle_tool.down);
                sheet.off('mouseDrag', circle_tool.drag);
                sheet.off('mouseUp', circle_tool.up);
            }
        }]
    };

    gui.toolbar.init($('#toolbar'), 2, 1);
    gui.toolbar.on(toolbar);
});