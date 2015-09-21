define(['../../core/core'], function (core) {

    core.extend('affineDrawer', ['space2', 'axes', 'sheet'], function (module, space2, axes, sheet) {

        module.model(function () {
            var ox = space2.make_segment().make_project(axes.get()),
                oy = space2.make_segment().make_project(axes.get()),
                grid = [],
                step = 50,
                line, count, i;

            ox.point1 = {
                x: -450,
                y: 0
            };
            ox.point2 = {
                x: 450,
                y: 0
            };

            oy.point1 = {
                x: 0,
                y: -350
            };
            oy.point2 = {
                x: 0,
                y: 350
            };

            count = ox.length / step;
            for (i = 0; i < count; i++) {
                line = space2.make_segment().make_project(axes.get());
                line.point1 = {
                    x: -450 + i * step,
                    y: -350
                };
                line.point2 = {
                    x: -450 + i * step,
                    y: 350
                };
                grid.push(line);
            }
            count = oy.length / step;
            for (i = 0; i < count; i++) {
                line = space2.make_segment().make_project(axes.get());
                line.point1 = {
                    x: -450,
                    y: -350 + i * step
                };
                line.point2 = {
                    x: 450,
                    y: -350 + i * step
                };
                grid.push(line);
            }

            return {
                ox: ox,
                oy: oy,
                grid: grid
            };
        });

        module.view('axes', function factory(model) {
            return {
                ox: sheet.draw_arrow(model.ox.point1, model.ox.point2),
                oy: sheet.draw_arrow(model.oy.point1, model.oy.point2)
            }
        });

        module.view('grid', function factory(model) {
            return model.grid.map(function (l) {
                return sheet.draw_segment(l.point1, l.point2);
            })
        });

        module.start = function () {
            module
                .item()
                .show('grid')
                .show('axes');
        };

    });

});