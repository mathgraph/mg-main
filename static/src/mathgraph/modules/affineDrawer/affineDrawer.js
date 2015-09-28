define(['../../core/core'], function (core) {

    core.extend('affineDrawer', ['space2', 'axes', 'sheet'], function (module, space2, axes, sheet) {

        module.model(function () {
            var ox = space2.make_segment().make_project(axes.get()),
                oy = space2.make_segment().make_project(axes.get());

            ox.point1 = {
                x: -sheet.width / 2,
                y: 0
            };
            ox.point2 = {
                x: sheet.width / 2,
                y: 0
            };

            oy.point1 = {
                x: 0,
                y: -sheet.height / 2
            };
            oy.point2 = {
                x: 0,
                y: sheet.height / 2
            };

            return {
                ox: ox,
                oy: oy
            };
        });

        module.view('axes', function factory(model) {
            return {
                ox: sheet.draw_arrow(model.ox.point1, model.ox.point2, {
                        strokeColor: 'black',
                        strokeWidth: 1
                    }).ticker().grid().set('interactive', false),
                oy: sheet.draw_arrow(model.oy.point1, model.oy.point2, {
                        strokeColor: 'black',
                        strokeWidth: 1
                    }).ticker().grid().set('interactive', false)
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