define(['../../core/core'], function (core) {
    core.extend('Parabola', ['sheet'], function (module, sheet) {

        module.view(function factory(model) {
            return sheet.draw_curve2({
                A: 0,
                B: 1 ,
                C: 0,
                D: -2 * model.sheet.p,
                E: 0,
                F: 0
            });
        }, function update(model, view) {

            view.coefficients = {
                A: 0,
                B: 1 ,
                C: 0,
                D: -2 * model.sheet.p,
                E: 0,
                F: 0
            };

        });

        module.view(function factory(model) {
            return sheet.draw_polynomial(
                [[1, 0, 2], [-2 * model.sheet.p, 1, 0]], [[0, 0]], { radius: 2, eps: 0.02 });
        }, function update(model, view) {
            view.coefficients = [[1, 0, 2], [-2 * model.sheet.p, 1, 0]];
            view.recalc();
        });

        module.toolbar({
            type: 'button',
            icon: '/icons/parabolic.svg',
            select: function () {
                module.item();
            }
        });

    });
});