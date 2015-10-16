define(['../../core/core'], function (core) {
    core.extend('Curve2', [], function (module) {

        module.additional('affine', function factory(model) {
            var eq = model.axes.getEquation(),
                can = model.axes.getCanonical() || {};
            return [{
                name: 'type',
                type: 'select',
                content: ['Ellipse', 'Hyperbolic', 'Parabolic', 'Other'],
                init: function () {
                    this.value = this.content.indexOf(model.model.getType()) === -1 ? 'Other' : model.model.getType();
                },
                change: function () {
                    var can = model.axes.getCanonical();
                    can.type = this.value;
                    switch (this.value) {
                        case 'Ellipse':
                            can.a2 = can.a2 || 1;
                            can.b2 = can.b2 || 1;
                            break;
                        case 'Hyperbolic':
                            can.a2 = can.a2 || 1;
                            can.b2 = can.b2 || 1;
                            break;
                        case 'Parabolic':
                            can.p = can.p || 1;
                            break;
                        case 'Other':
                            can.a2 = 0;
                            can.b2 = 0;
                            can.p = 0;
                            break;
                    }
                    model.axes.setCanonical(can);
                }
            }, {
                name: 'a^2',
                type: 'number',
                min_value: 0,
                step: 0.001,
                max_value: 25,
                init: function () {
                    this.value = can.a2 || -1;
                },
                change: function () {
                    var can = model.axes.getCanonical();
                    can.a2 = this.value;
                    can.type = model.model.getType();
                    model.axes.setCanonical(can);
                }
            }, {
                name: 'b^2',
                type: 'number',
                min_value: 0,
                step: 0.001,
                max_value: 25,
                init: function () {
                    this.value = can.b2 || -1;
                },
                change: function () {
                    var can = model.axes.getCanonical();
                    can.b2 = this.value;
                    can.type = model.model.getType();
                    model.axes.setCanonical(can);
                }
            }, {
                name: 'p',
                type: 'number',
                min_value: 0,
                step: 0.001,
                max_value: 25,
                init: function () {
                    this.value = can.p || -1;
                },
                change: function () {
                    var can = model.axes.getCanonical();
                    can.p = this.value;
                    can.type = model.model.getType();
                    model.axes.setCanonical(can);
                }
            }, {
                name: 'epsilon',
                type: 'number',
                step: 0.001,
                init: function () {
                    this.value = model.axes.getEccentricity();
                },
                change: function () {}
            }, {
                folder_name: 'traditional',
                fields: [{
                    name: 'A',
                    type: 'number',
                    min_value: -5,
                    step: 0.1,
                    max_value: 5,
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
                    min_value: -5,
                    step: 0.1,
                    max_value: 5,
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
                    min_value: -5,
                    step: 0.1,
                    max_value: 5,
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
                    min_value: -5,
                    step: 0.1,
                    max_value: 5,
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
                    min_value: -5,
                    step: 0.1,
                    max_value: 5,
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
                    min_value: -5,
                    step: 0.1,
                    max_value: 5,
                    init: function () {
                        this.value = eq.F;
                    },
                    change: function () {
                        var eq = model.axes.getEquation();
                        eq.F = this.value;
                        model.axes.setEquation(eq);
                    }
                }]
            }];
        }, function update(model, data) {
            var eq = model.axes.getEquation(),
                can = model.axes.getCanonical() || {};
            data[0].value = data[0].content.indexOf(model.model.getType()) === -1 ? 'Other' : model.model.getType();
            data[1].value = can.a2 || -1;
            data[2].value = can.b2 || -1;
            data[3].value = can.p || -1;
            data[4].value = model.axes.getEccentricity();

            data[5].fields[0].value = eq.A;
            data[5].fields[1].value = eq.B;
            data[5].fields[2].value = eq.C;
            data[5].fields[3].value = eq.D;
            data[5].fields[4].value = eq.E;
            data[5].fields[5].value = eq.F;
        });
        module.additional('polar', function factory(model) {
            var eq = model.axes.getEquation();
            return [{
                name: 'p',
                type: 'number',
                min_value: 0.01,
                step: 0.1,
                max_value: 5,
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
                type: 'number',
                min_value: 0,
                step: 0.1,
                max_value: 5,
                init: function () {
                    this.value = eq.e;
                },
                change: function () {
                    var eq = model.axes.getEquation();
                    eq.e = this.value;
                    model.axes.setEquation(eq);
                }
            }, {
                name: 'alpha',
                type: 'number',
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