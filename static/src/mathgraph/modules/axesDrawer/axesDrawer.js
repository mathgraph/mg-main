define(['../../core/core'], function (core) {

    core.extend('axesDrawer', ['space2', 'axes', 'sheet'], function (module, space2, axes, sheet) {

        module.model(function () {
            var ox = space2.make_line(),
                oy = space2.make_line(),
                or = space2.make_line();

            var spOx = ox.make_project(sheet.axes),
                spOy = oy.make_project(sheet.axes),
                spOr = or.make_project(sheet.axes);

            spOx.point1 = {
                x: -sheet.width / 2,
                y: 0
            };
            spOx.point2 = {
                x: sheet.width / 2,
                y: 0
            };

            spOy.point1 = {
                x: 0,
                y: sheet.height / 2
            };
            spOy.point2 = {
                x: 0,
                y: -sheet.height / 2
            };

            spOr.point1 = {
                x: 0,
                y: 0
            };
            spOr.point2 = {
                x: sheet.width / 2,
                y: 0
            };

            return {
                model: {
                    ox: ox,
                    oy: oy
                },
                sheet: {
                    ox: spOx,
                    oy: spOy,
                    or: spOr
                }

            }
        });

        var last = axes.get().type;

        module.view('axes', function factory(model) {
            var paramsA = {
                step: {
                    length: '50',
                    unit: 'px'
                }
            }, paramsP = {
                type: 'circles',
                start: 0,
                step: {
                    length: '50',
                    unit: 'px'
                }
            };
            var content = function (o) {
                return (+o / 10).toFixed(0);
            };
            return {
                ox: sheet.draw_arrow(model.sheet.ox.point1, model.sheet.ox.point2, {
                        strokeColor: 'black',
                        strokeWidth: 1
                    }).ticker(paramsA).grid(paramsA).labeled(content, paramsA).set('interactive', false),
                oy: sheet.draw_arrow(model.sheet.oy.point1, model.sheet.oy.point2, {
                        strokeColor: 'black',
                        strokeWidth: 1
                    }).ticker(paramsA).grid(paramsA).labeled(content, paramsA).set('interactive', false),
                or: sheet.draw_arrow(model.sheet.or.point1, model.sheet.or.point2, {
                        strokeColor: 'black',
                        strokeWidth: 1
                    }).ticker(paramsP).grid(paramsP).labeled(content, paramsP).set('interactive', false).hide()
            }
        }, function update(model, view) {
            switch (axes.get().type) {
                case 'affine':
                    view.ox.show();
                    view.oy.show();
                    view.or.hide();
                    break;
                case 'polar':
                    view.ox.hide();
                    view.oy.hide();
                    view.or.show();
                    break;
            }
        });

        module.start = function () {
            module
                .item()
                .show('grid')
                .show('axes');
        };

    });

});