define(['../core/core', 'mg-sheet', 'jquery'], function (core, Sheet, $) {

    core.module('sheet', ['space2'], function (moduleProto, space2) {
        var sheet = new Sheet('canvas');

        sheet.axes = space2.make_axes('affine');
        sheet.axes.basis = [[50, 0], [0, -50]];

        sheet.on('wheel', function (e) {
            var d = 0.1,
                basis = sheet.axes.basis;
            if (e.wheelDelta > 0) {
                d = 1 + d;
            } else {
                d = 1 - d;
            }
            basis[0][0] *= d;
            basis[0][1] *= d;
            basis[1][0] *= d;
            basis[1][1] *= d;
        });

        $(sheet.domElem).on('wheel', function (e) {

        });

        moduleProto.tool = function (name, desc) {
            if (typeof name !== 'string') {
                desc = name;
                name = 'default';
            }
            desc.name = this.name + '::' + name;
            sheet.use(desc, false);
        };

        moduleProto.use = function (name) {
            name = name || 'default';
            sheet.charger[this.name + '::' + name].enabled = true;
        };

        moduleProto.unuse = function (name) {
            name = name || 'default';
            sheet.charger[this.name + '::' + name].enabled = false;
        };

        return sheet;
    });
});