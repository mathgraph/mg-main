define(['../../core/core'], function (core) {
    core.extend('Line', ['sheet'], function (module, sheet) {

        module.view(function factory(model) {
            return sheet.draw_line(model.sheet.point1, model.sheet.point2)
        }, function update(model, view) {
            view.point1 = model.sheet.point1;
            view.point2 = model.sheet.point2;
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
            icon: '../../icons/line.svg',
            select: function () {
                module.use('drawer');
            },
            unselect: function () {
                module.unuse('drawer');
            }
        });

    });
});