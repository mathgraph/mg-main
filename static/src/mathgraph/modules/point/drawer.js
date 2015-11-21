define(['../../core/core'], function (core) {
    core.extend('Point', ['sheet'], function (module, sheet) {

        module.view(function factory(model) {
            return sheet.draw_circle([model.sheet.x,model.sheet.y], 5, { fillColor: 'red', opacity: 0.5 })
        }, function update(model, view) {
            view.center.x = model.sheet.x;
            view.center.y = model.sheet.y;
        });

        module.tool('drawer', {
            type: 'control',
            target: 'sheet',
            mode: 'single',
            $_current: null,
            mouseDown: function (sheet, event) {
                // Костыль, для того чтобы не строить новые точки, когда мы селектим уже созданные
                if (event.item) {
                    return;
                }
                var p = module.item();
                p.model.sheet.x = event.point.x;
                p.model.sheet.y = event.point.y;
            }
        });

        module.toolbar({
            type: 'selectable',
            icon: '/icons/point.svg',
            select: function () {
                module.use('drawer');
            },
            unselect: function () {
                module.unuse('drawer');
            }
        });

    });
});