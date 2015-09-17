define(['../core'], function (core) {

    core.toolbar({
        type: 'selectable',
        icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=arrow',
        select: function () {
            creator.enabled = true;
        },
        unselect: function () {
            creator.enabled = false;
        }
    });

    var $_current = null;
    var creator = core.sheet.use({
        name: 'arrow',
        target: 'sheet',
        mode: 'single',
        mouseDrag: function (sheet, event) {
            if (!$_current) {
                console.log(event.point);
                $_current = sheet.draw_segment(event.point, event.point);
                $_current.$_model = core.space2.make_segment().make_project(core.axes);
                $_current.$_model.point1 = event.point;
                $_current.$_model.point2 = event.point;
                (function (c) {
                    c.$_add = {
                        fields: [{
                            name: 'point2.x',
                            type: 'slider',
                            value: 0,
                            min_value: -1000,
                            max_value: 1000,
                            init: function () {
                                this.value = c.$_model.point2.x;
                            },
                            change: function () {
                                c.$_model.point2.x = this.value;
                            }
                        }, {
                            name: 'point2.y',
                            type: 'slider',
                            value: 0,
                            min_value: -1000,
                            max_value: 1000,
                            init: function () {
                                this.value = c.$_model.point2.y;
                            },
                            change: function () {
                                c.$_model.point2.y = this.value;
                            }
                        }]
                    };
                })($_current);
                console.log('hello');
                core.additional.create($_current.$_add);
                (function (c, m, a) {
                    core.addUpdater(function () {
                        updateView(c, m, a);
                    });
                })($_current, $_current.$_model, $_current.$_add);
            }
            $_current.$_model.point2 = event.point;
        },
        mouseUp: function (sheet, event) {
            $_current = null;
        }
    });

    function updateView(view, model, add) {
        view.from.x = model.point1.x;
        view.from.y = model.point1.y;
        view.to.x = model.point2.x;
        view.to.y = model.point2.y;
        updateAdditional(model, add);
    }

    function updateAdditional(model, add) {
        add.fields[0].value = model.point2.x;
        add.fields[1].value = model.point2.y;
    }


});