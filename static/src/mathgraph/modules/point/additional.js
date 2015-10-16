define(['../../core/core'], function (core) {
    core.extend('Point', ['axes'], function (module, axes) {

        module.additional('affine', function factory(model) {
            return [{
                name: 'x',
                type: 'number',
                step: 0.01,
                init: function () {
                    this.value = model.axes.x;
                },
                change: function () {
                    model.axes.x = this.value;
                }
            }, {
                name: 'y',
                type: 'number',
                step: 0.01,
                value: model.axes.y,
                init: function () {
                    this.value = model.axes.y;
                },
                change: function () {
                    model.axes.y = this.value;
                }
            }]
        }, function update(model, data) {
            data[0].value = model.axes.x;
            data[1].value = model.axes.y;
        });

        module.additional('polar', function factory(model) {
            return [{
                name: 'r',
                type: 'number',
                step: 0.01,
                init: function () {
                    this.value = model.axes.r;
                },
                change: function () {
                    model.axes.r = this.value;
                }
            }, {
                name: 'phi',
                type: 'number',
                step: 0.01,
                init: function () {
                    this.value = model.axes.phi;
                },
                change: function () {
                    model.axes.phi = this.value;
                }
            }]
        }, function update(model, data) {
            data[0].value = model.axes.r;
            data[1].value = model.axes.phi;
        });
    });
})
;