define(['../../core/core'], function (core) {
    core.extend('Segment', ['axes'], function (module, axes) {

        module.additional('affine', function factory(model) {
            return [{
                folder_name: 'start',
                fields: [{
                    name: 'x',
                    type: 'number',
                    //min_value: -50,
                    //max_value: 50,
                    step: 0.01,
                    init: function () {
                        this.value = model.axes.point1.x;
                    },
                    change: function () {
                        model.axes.point1.x = this.value;
                    }
                }, {
                    name: 'y',
                    type: 'number',
                    //min_value: -50,
                    //max_value: 50,
                    step: 0.01,
                    value: model.axes.point1.y,
                    init: function () {
                        this.value = model.axes.point1.y;
                    },
                    change: function () {
                        model.axes.point1.y = this.value;
                    }
                }]
            }, {
                folder_name: 'end',
                fields: [{
                    name: 'x',
                    type: 'number',
                    //min_value: -50,
                    //max_value: 50,
                    step: 0.01,
                    value: model.axes.point2.y,
                    init: function () {
                        this.value = model.axes.point2.x;
                    },
                    change: function () {
                        model.axes.point2.x = this.value;
                    }
                }, {
                    name: 'y',
                    type: 'number',
                    //min_value: -50,
                    //max_value: 50,
                    step: 0.01,
                    init: function () {
                        this.value = model.axes.point2.y;
                    },
                    change: function () {
                        model.axes.point2.y = this.value;
                    }
                }]
            }]
        }, function update(model, data) {
            data[0].fields[0].value = model.axes.point1.x;
            data[0].fields[1].value = model.axes.point1.y;

            data[1].fields[0].value = model.axes.point2.x;
            data[1].fields[1].value = model.axes.point2.y;
        });

        module.additional('polar', function factory(model) {
            return [{
                folder_name: 'start',
                fields: [{
                    name: 'r',
                    type: 'number',
                    //min_value: 0,
                    //max_value: 50,
                    step: 0.01,
                    init: function () {
                        this.value = model.axes.point1.r;
                    },
                    change: function () {
                        model.axes.point1.r = this.value;
                    }
                }, {
                    name: 'phi',
                    type: 'number',
                    //min_value: -Math.PI,
                    //max_value: Math.PI,
                    step: 0.01,
                    init: function () {
                        this.value = model.axes.point1.phi;
                    },
                    change: function () {
                        model.axes.point1.phi = this.value;
                    }
                }]
            }, {
                folder_name: 'end',
                fields: [{
                    name: 'r',
                    type: 'number',
                    //min_value: 0,
                    //max_value: 50,
                    step: 0.01,
                    init: function () {
                        this.value = model.axes.point2.r;
                    },
                    change: function () {
                        model.axes.point2.r = this.value;
                    }
                }, {
                    name: 'phi',
                    type: 'number',
                    //min_value: -Math.PI,
                    //max_value: Math.PI,
                    step: 0.01,
                    init: function () {
                        this.value = model.axes.point2.phi;
                    },
                    change: function () {
                        model.axes.point2.phi = this.value;
                    }
                }]
            }]
        }, function update(model, data) {
            data[0].fields[0].value = model.axes.point1.r;
            data[0].fields[1].value = model.axes.point1.phi;
            data[1].fields[0].value = model.axes.point2.r;
            data[1].fields[1].value = model.axes.point2.phi;
        });
    });
})
;