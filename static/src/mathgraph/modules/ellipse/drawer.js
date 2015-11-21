define(['../../core/core'], function (core) {
    core.extend('Ellipse', ['sheet'], function (module, sheet) {

        module.view(function factory(model) {
            return sheet.draw_curve2({
                A: 1 / model.sheet.a / model.sheet.a,
                B: 1 / model.sheet.b / model.sheet.b,
                C: 0,
                D: 0,
                E: 0,
                F: -1
            });
        }, function update(model, view) {

            view.coefficients = {
                A: 1 / model.sheet.a / model.sheet.a,
                B: 1 / model.sheet.b / model.sheet.b,
                C: 0,
                D: 0,
                E: 0,
                F: -1
            };

        });

        module.toolbar({
            type: 'button',
            icon: '../../icons/ellipse.svg',
            select: function () {
                module.item();
            }
        });

    });
});