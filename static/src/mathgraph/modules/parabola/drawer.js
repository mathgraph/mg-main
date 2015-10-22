define(['../../core/core'], function (core) {
    core.extend('Parabola', ['sheet'], function (module, sheet) {

        module.view(function factory(model) {
            return sheet.draw_polynomial(
                [[1, 0, 2], [-2 * model.sheet.p, 1, 0]], [[0, 0]], { radius: 2, eps: 0.02 });
        }, function update(model, view) {
            view.coefficients = [[1, 0, 2], [-2 * model.sheet.p, 1, 0]];
            view.recalc();
        });

        module.toolbar({
            type: 'button',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=parabola',
            select: function () {
                module.item();
            }
        });

    });
});