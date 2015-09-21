define(['../../core/core'], function (core) {
    core.extend('Segment', ['sheet', 'selected'], function (module, sheet, selected) {

        module.view(function factory(model) {
            return sheet.draw_segment(model.point1, model.point2);
        }, function update(model, view) {
            view.from = model.point1;
            view.to = model.point2;
        });

        module.tool('drawer', {
            target: 'sheet',
            mode: 'single',
            $_current: null,
            mouseDrag: function (sheet, event) {
                if (!this.$_current) {
                    this.$_current = module.item(event.point);
                }
                this.$_current.model.point2 = event.point;
            },
            mouseUp: function (sheet, event) {
                if (this.$_current) {
                    this.$_current.model.point2 = event.point;
                    this.$_current = null;
                }
            }
        });

        module.toolbar({
            type: 'selectable',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=segment',
            select: function () {
                module.use('drawer');
            },
            unselect: function () {
                module.unuse('drawer');
            }
        });

    });
});