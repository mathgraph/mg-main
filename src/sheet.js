define(['./core', 'mg-sheet'], function (core, Sheet) {

    core.module('sheet', [], function (moduleProto) {
        var sheet = new Sheet('canvas');

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