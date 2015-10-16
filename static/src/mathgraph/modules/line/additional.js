define(['../../core/core'], function (core) {
    core.extend('Line', ['axes'], function (module, axes) {

        module.additional('affine', function factory(model) {
            var can = model.axes.canonical;
            return [{
                name: 'A',
                type: 'number',
                step: 0.01,
                value: can.A,
                init: function () {
                    this.value = can.A;
                },
                change: function () {
                    var can = model.axes.canonical;
                    can.A = this.value;
                    model.axes.canonical = can;
                }
            }, {
                name: 'B',
                type: 'number',
                step: 0.01,
                value: can.B,
                init: function () {
                    this.value = can.B;
                },
                change: function () {
                    var can = model.axes.canonical;
                    can.B = this.value;
                    model.axes.canonical = can;
                }
            }, {
                name: 'C',
                type: 'number',
                step: 0.01,
                value: can.C,
                init: function () {
                    this.value = can.C;
                },
                change: function () {
                    var can = model.axes.canonical;
                    can.C = this.value;
                    model.axes.canonical = can;
                }
            }];
        }, function update(model, data) {
            data[0].value = model.axes.canonical.A;
            data[1].value = model.axes.canonical.B;
            data[2].value = model.axes.canonical.C;
        });

        //module.additional('polar', function factory(model) {
        //    return [{
        //        name: 'rho',
        //        type: 'number',
        //        step: 0.01,
        //        min_value: 0,
        //        init: function () {
        //            this.value = model.axes.canonical.rho;
        //        },
        //        change: function () {
        //            var can = model.axes.canonical;
        //            can.rho = this.value;
        //            model.axes.canonical = can;
        //        }
        //    }, {
        //        name: 'theta',
        //        type: 'number',
        //        step: 0.01,
        //        min_value: -Math.PI / 2,
        //        max_value: Math.PI / 2,
        //        init: function () {
        //            this.value = model.axes.canonical.theta;
        //        },
        //        change: function () {
        //            var can = model.axes.canonical;
        //            can.theta = this.value;
        //            model.axes.canonical = can;
        //        }
        //    }];
        //}, function update(model, data) {
        //    data[0].value = model.axes.canonical.rho;
        //    data[1].value = model.axes.canonical.theta;
        //});
    });
})
;