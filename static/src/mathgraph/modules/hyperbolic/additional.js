define(['../../core/core'], function (core) {
    core.extend('Hyperbolic', [], function (module) {

        module.additional('affine', function factory(model) {
            return [{
                name: 'a',
                type: 'number',
                min_value: 0.1,
                step: 0.1,
                init: function () {
                    this.value = model.axes.a;
                },
                change: function () {
                    model.axes.a = this.value;
                }
            }, {
                name: 'b',
                type: 'number',
                min_value: 0.38,
                step: 0.1,
                init: function () {
                    this.value = model.axes.b;
                },
                change: function () {
                    model.axes.b = this.value;
                }
            }, {
                name: 'Focal argument',
                type: 'number',
                min_value: 0.05,
                step: 0.1,
                editable: false,
                init: function () {
                    this.value = model.axes.p;
                }
            }, {
                name: 'Eccentricity',
                type: 'number',
                step: 0.1,
                editable: false,
                init: function () {
                    this.value = model.axes.eccentricity;
                }
            }, {
                name: 'Сопряженная',
                type: 'checkbox',
                value: false,
                change: function (value) {
                    model.conjugate = !!value;
                }
            }];
        }, function update(model, data) {
            data[0].value = model.axes.a;
            data[1].value = model.axes.b;
            data[2].value = model.axes.p;
            data[3].value = model.axes.eccentricity;
        });

        module.additional('polar', function factory(model) {
            return [{
                name: 'p',
                type: 'number',
                min_value: 0.1,
                step: 0.1,
                init: function () {
                    this.value = model.axes.p;
                },
                change: function () {
                    model.axes.p = this.value;
                }
            }, {
                name: 'eps',
                type: 'number',
                min_value: 1.01,
                step: 0.1,
                init: function () {
                    this.value = model.axes.eps;
                },
                change: function () {
                    model.axes.eps = Math.max(this.value, 1.01);
                }
            }];
        }, function update(model, data) {
            data[0].value = model.axes.p;
            data[1].value = model.axes.eps;
        });

    });
})
;