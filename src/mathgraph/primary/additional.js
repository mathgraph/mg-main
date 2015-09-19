define(['../core/core', '../utils/common', 'mg-gui'], function (core, utils, gui) {
    core.module('additional', ['selected'], function (moduleProto, selected) {

        selected.on(function (item) {
            item.view('additional');
        });

        selected.off(function (item) {
            item.view('additional', false);
        });

        moduleProto.additional = function (factory, update) {
            var module = this,
                part = utils.id();

            if (!module.$__additional) {
                module.$__additional = [];
                module.$__additionalMap = {};
            }

            if (!module.$__additionalMap[part]) {
                module.$__additionalMap[part] = [];
            }
            module.$__additionalMap.push({
                factory: factory,
                update: update
            });
            module.$__additional.push({
                part: part,
                factory: factory,
                update: update
            });

            module.view('additional', function factory(model) {
                var fields = [],
                    obj = {};
                module.$__additional.forEach(function (o) {
                    var tmp = o.factory(model);
                    if (utils.isArray(tmp)) {
                        tmp = tmp.map(function (t) {
                            t.part = o.part;
                            return t
                        });
                        fields = fields.concat(tmp);
                    } else {
                        tmp.part = o.part;
                        fields.push(tmp);
                    }
                });

                obj = {
                    fields: fields
                };
                gui.additional.create(obj);
                return obj;
            }, function update(model, additional) {
                var currentPartId = null,
                    currentPart = [];
                additional.fields.forEach(function (f) {
                    if (currentPartId === null) {
                        currentPartId = f.part;
                        currentPart.push(f);
                    } else if (currentPartId === f.part) {
                        currentPart.push(f);
                    } else {
                        module.$__additionalMap[currentPartId].update(model, currentPart);
                        currentPartId = f.part;
                        currentPart = [f];
                    }
                });
            });

        }


    });
});