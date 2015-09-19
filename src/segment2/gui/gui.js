define(['../../core'], function (core) {
    var module = core.extend('Segment');

    module.additional(function factory(model) {
        return {
            fields: [{
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
        }
    }, function update(model, additional) {
        additional.fields[0].value = model.point2.x;
        additional.fields[1].value = model.point2.y;
    });

});