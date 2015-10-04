define(['../../core/core'], function (core) {
    core.extend('Segment', ['sheet'], function (module, sheet) {

        module.view(function factory(model) {
            return sheet.draw_segment(model.sheet.point1, model.sheet.point2)
        }, function update(model, view) {
            view.from = model.sheet.point1;
            view.to = model.sheet.point2;
        });

        module.tool('drawer', {
            type: 'control',
            target: 'sheet',
            mode: 'single',
            $_current: null,
            mouseDrag: function (sheet, event) {
                if (!this.$_current) {
                    this.$_current = module.item();
                    this.$_current.model.sheet.point1 = event.point;
                }
                this.$_current.model.sheet.point2 = event.point;
            },
            mouseUp: function (sheet, event) {
                if (this.$_current) {
                    this.$_current.model.sheet.point2 = event.point;
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