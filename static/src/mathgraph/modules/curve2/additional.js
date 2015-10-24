define(['../../core/core'], function (core) {
    core.extend('Curve2', [], function (module) {

        module.additional('affine', function factory(model) {
            var eq = model.axes.getEquation();
            return [{
                name: 'type',
                type: 'select',
                content: ['Ellipse', 'Hyperbolic', 'Parabolic', 'Other'],
                init: function () {
                    this.value = this.content.indexOf(model.model.getType()) === -1 ? 'Other' : model.model.getType();
                },
                change: function () {
                    this.value = this.content.indexOf(model.model.getType()) === -1 ? 'Other' : model.model.getType();
                }
            }, {
                    name: 'A',
                    type: 'number',
                    min_value: -300,
                    step: 0.1,
                    max_value: 300,
                    editable: true,
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
                    type: 'number',
                    min_value: -300,
                    step: 0.1,
                    max_value: 300,
                    editable: true,
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
                    type: 'number',
                    min_value: -300,
                    step: 0.1,
                    max_value: 300,
                    editable: true,
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
                    type: 'number',
                    min_value: -300,
                    step: 0.1,
                    max_value: 300,
                    editable: true,
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
                    type: 'number',
                    min_value: -300,
                    step: 0.1,
                    max_value: 300,
                    editable: true,
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
                    type: 'number',
                    min_value: -400,
                    step: 0.1,
                    max_value: 400,
                    editable: true,
                    init: function () {
                        this.value = eq.F;
                    },
                    change: function () {
                        var eq = model.axes.getEquation();
                        eq.F = this.value;
                        model.axes.setEquation(eq);
                    }
                }
            ];
        }, function update(model, data) {
            var eq = model.axes.getEquation();
            data[0].value = data[0].content.indexOf(model.model.getType()) === -1 ? 'Other' : model.model.getType();
            data[1].value = eq.A;
            data[2].value = eq.B;
            data[3].value = eq.C;
            data[4].value = eq.D;
            data[5].value = eq.E;
            data[6].value = eq.F;
        });
        module.additional('polar', function factory(model) {
            var eq = model.axes.getEquation();
            return [{
                name: 'p',
                type: 'number',
                editable: false,
                init: function () {
                    this.value = eq.p;
                }
            }, {
                name: 'e',
                type: 'number',
                editable: false,
                init: function () {
                    this.value = eq.e;
                }
            }];
        }, function update(model, data) {
            var eq = model.axes.getEquation();
            data[0].value = eq.p;
            data[1].value = eq.e;
            // data[2].value = eq.alpha;
        });

    });
})
;