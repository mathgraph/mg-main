define(['../core/core', 'mg-sheet'], function (core, Sheet) {

    core.module('sheet', ['space2'], function (moduleProto, space2) {
        var sheet = new Sheet('canvas');

        sheet.axes = space2.make_axes('affine');
        sheet.axes.basis = [[50, 0], [0, -50]];
        
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