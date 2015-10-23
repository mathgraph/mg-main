define(['../../core/core'], function (core) {
    core.extend('Hyperbolic', ['sheet'], function (module, sheet) {

        module.view(function (model) {
            return sheet.draw_polynomial(
                [
                    [1 / model.sheet.a / model.sheet.a, 2, 0],
                    [-1 / model.sheet.b / model.sheet.b, 0, 2],
                    [-1, 0, 0]
                ], [[model.sheet.a, 0], [-model.sheet.a, 0]],
                { radius: 1, eps: 0.1 }).set('tt', 'default');
        }, function (model, view) {
            view.coefficients = [
                [1 / model.sheet.a / model.sheet.a, 2, 0],
                [-1 / model.sheet.b / model.sheet.b, 0, 2],
                [-1, 0, 0]
            ];
            view.points = [[model.sheet.a, 0], [-model.sheet.a, 0]];
            view.recalc();
        });
 
        module.view('conjugate', function (model) {
            return sheet.draw_polynomial(
                [
                    [-1 / model.sheet.a / model.sheet.a, 2, 0],
                    [1 / model.sheet.b / model.sheet.b, 0, 2],
                    [-1, 0, 0]
                ], [[0, model.sheet.a], [0, -model.sheet.a]],
                { radius: 1, eps: 0.1 })
                    .set('interactive', false)
                    .hide()
                    .pushStyle('ghost', { strokeColor: '#555555' })
                    .enableStyle('ghost')
                    .set('tt', 'conjugate');
        }, function (model, view) {
            if (!!model.conjugate) {
                view.coefficients = [
                    [-1 / model.sheet.a / model.sheet.a, 2, 0],
                    [1 / model.sheet.b / model.sheet.b, 0, 2],
                    [-1, 0, 0]
                ];
                view.points = [[0, model.sheet.b], [0, -model.sheet.b]];
                view.recalc();
                view.show();
            } else {
                view.hide();
            }
        });

        module.toolbar({
            type: 'button',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=hyperbolic',
            select: function () {
                module.item().show('conjugate');
            }
        });

    });
});