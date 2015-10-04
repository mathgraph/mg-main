define(['../../core/core'], function (core) {
    core.extend('Segment', [], function (module) {
        module.additional(function factory(model) {
            return [{
                name: 'point1.x',
                type: 'slider',
                min_value: -50,
                max_value: 50,
                init: function () {
                    this.value = model.axes.point1.x;
                },
                change: function () {
                    model.axes.point1.x = this.value;
                }
            }, {
                name: 'point1.y',
                type: 'slider',
                min_value: -50,
                max_value: 50,
                init: function () {
                    this.value = model.axes.point1.y;
                },
                change: function () {
                    model.axes.point2.y = this.value;
                }
            }, {
                name: 'point2.x',
                type: 'slider',
                min_value: -50,
                max_value: 50,
                init: function () {
                    this.value = model.axes.point2.x;
                },
                change: function () {
                    model.axes.point2.x = this.value;
                }
            }, {
                name: 'point2.y',
                type: 'slider',
                min_value: -50,
                max_value: 50,
                init: function () {
                    this.value = model.axes.point2.y;
                },
                change: function () {
                    model.axes.point2.y = this.value;
                }
            }]
        }, function update(model, data) {
            data[0].value = model.axes.point2.x;
            data[1].value = model.axes.point2.y;
        })
    });
});