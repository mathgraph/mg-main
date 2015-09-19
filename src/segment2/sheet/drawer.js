define(['../../core'], function (core) {

    core.extend('segment', ['sheet', 'selected', 'item'], function (module, sheet, selected, item) {

        module.view(function factory(model) {
            return sheet.draw_segment(model.point1, model.point2);
        }, function update(model, view) {
            view.from = model.point1;
            view.to = model.point2;
        });

        module.tool('drawer', {
            target: 'sheet',
            mode: 'single',
            $_isCreating: false,
            mouseDrag: function (sheet, event) {
                if (!this.$_isCreating) {
                    item(event.point);
                    this.$_isCreating = true;
                }
                selected.model.point2 = event.point;
            },
            mouseUp: function (sheet, event) {
                selected.model.point2 = event.point;
                this.$_isCreating = false;
            }
        });

        module.toolbar({
            type: 'selectable',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=arrow',
            select: function () {
                module.use('drawer');
            },
            unselect: function () {
                module.unuse('drawer');
            }
        });
    });

});