define(['../../core/core'], function (core) {
    core.extend('Curve2', [], function (module) {

        module.additional('affine', function factory(model) {
            var eq = model.axes.getEquation();
            return [{
                name: 'A',
                type: 'slider',
                min_value: -50,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.A;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.A = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'B',
                type: 'slider',
                min_value: -50,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.B;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.B = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'C',
                type: 'slider',
                min_value: -50,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.C;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.C = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'D',
                type: 'slider',
                min_value: -50,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.D;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.D = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'E',
                type: 'slider',
                min_value: -50,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.E;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.E = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'F',
                type: 'slider',
                min_value: -50,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.F;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.F = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'Ecc',
                type: 'slider',
                step: 0.1,
                init: function () {
                    this.value = model.axes.getEccentricity();
                },
                change: function () {}
            }];
        }, function update(model, data) {
            var eq = model.axes.getEquation();
            data[0].value = eq.A;
            data[1].value = eq.B;
            data[2].value = eq.C;
            data[3].value = eq.D;
            data[4].value = eq.E;
            data[5].value = eq.F;
            data[6].value = model.axes.getEccentricity();
        });

        module.additional('polar', function factory(model) {
            var eq = model.axes.getEquation();
            return [{
                name: 'p',
                type: 'slider',
                min_value: 1,
                step: 1,
                max_value: 50,
                init: function () {
                    this.value = eq.p;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.p = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'e',
                type: 'slider',
                min_value: 0,
                step: 0.1,
                max_value: 5,
                init: function () {
                    this.value = eq.e;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.e = this.value;
                    console.log(eq);
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'alpha',
                type: 'slider',
                min_value: -Math.PI,
                step: 0.01,
                max_value: Math.PI,
                init: function () {
                    this.value = eq.alpha;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.alpha = this.value;
                    model.axes.setEquation(eq);
                }
            }];
        }, function update(model, data) {
            var eq = model.axes.getEquation();
            data[0].value = eq.p;
            data[1].value = eq.e;
            data[2].value = eq.alpha;
        });

    });
})
;