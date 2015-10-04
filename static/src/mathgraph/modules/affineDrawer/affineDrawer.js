define(['../../core/core'], function (core) {

    core.extend('affineDrawer', ['space2', 'axes', 'sheet'], function (module, space2, axes, sheet) {

        module.model(function () {
            var ox = space2.make_line(),
                oy = space2.make_line();

            var spOx = ox.make_project(sheet.axes),
                spOy = oy.make_project(sheet.axes);

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

            return {
                model: {
                    ox: ox,
                    oy: oy
                },
                axes: {
                    ox: ox.make_project(axes.get()),
                    oy: oy.make_project(axes.get())
                },
                sheet: {
                    ox: spOx,
                    oy: spOy
                }

            }
        });

        module.view('axes', function factory(model) {
            var params = {
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
                    }).ticker(params).grid(params).labeled(content, params).set('interactive', false),
                oy: sheet.draw_arrow(model.sheet.oy.point1, model.sheet.oy.point2, {
                        strokeColor: 'black',
                        strokeWidth: 1
                    }).ticker(params).grid(params).labeled(content, params).set('interactive', false)
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