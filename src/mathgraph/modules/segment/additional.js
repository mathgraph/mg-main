define(['../../core/core'], function (core) {
    core.extend('Segment', [], function (module) {
        module.additional(function factory(model) {
            return [{
                name: 'point2.x',
                type: 'slider',
                min_value: -1000,
                max_value: 1000,
                change: function () {
                    model.point2.x = this.value;
                }
            }, {
                name: 'point2.y',
                type: 'slider',
                min_value: -1000,
                max_value: 1000,
                change: function () {
                    model.point2.y = this.value;
                }
            }]
        }, function update(model, data) {
            data[0].value = model.point2.x;
            data[1].value = model.point2.y;
        })
    });
});