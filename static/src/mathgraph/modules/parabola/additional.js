define(['../../core/core'], function (core) {
    core.extend('Parabola', [], function (module) {

        module.additional(function factory(model) {
            return [{
                name: 'p',
                type: 'number',
                min_value: 0.01,
                step: 0.01,
                init: function () {
                    this.value = model.axes.p;
                },
                change: function () {
                    model.axes.p = this.value;
                }
            }, {
                name: 'Eccentricity',
                type: 'number',
                value: 1,
                editable: false,
                change: function () {
                    this.value = 1;
                }
            }];
        }, function update(model, data) {
            data[0].value = model.axes.p;
            data[1].value = 1;
        });

    });
})
;