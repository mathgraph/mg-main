define(['../../core/core'], function (core) {
    core.extend('Hyperbolic', ['sheet'], function (module, sheet) {


        module.view(function (model) {
            return sheet.draw_curve2({
                A: 1 / model.sheet.a / model.sheet.a,
                B: -1 / model.sheet.b / model.sheet.b,
                C: 0,
                D: 0,
                E: 0,
                F: -1
            });
        }, function update(model, view) {

            view.coefficients = {
                A: 1 / model.sheet.a / model.sheet.a,
                B: -1 / model.sheet.b / model.sheet.b,
                C: 0,
                D: 0,
                E: 0,
                F: -1
            };

        });


        module.view('conjugate', function factory(model) {
            return sheet.draw_curve2({
                A: -1 / model.sheet.a / model.sheet.a,
                B: 1 / model.sheet.b / model.sheet.b,
                C: 0,
                D: 0,
                E: 0,
                F: -1
            }).set('interactive', false)
                .hide()
                .pushStyle('ghost', {strokeColor: '#555555'})
                .enableStyle('ghost')
                .set('tt', 'conjugate');
        }, function update(model, view) {
            if (!!model.conjugate) {
                view.coefficients = {
                    A: -1 / model.sheet.a / model.sheet.a,
                    B: 1 / model.sheet.b / model.sheet.b,
                    C: 0,
                    D: 0,
                    E: 0,
                    F: -1
                };
                view.show();
            } else {
                view.hide();
            }
        });


        module.toolbar({
            type: 'button',
            icon: '/icons/hyperbolic.svg',
            select: function () {
                module.item().show('conjugate');
            }
        });

    });
});