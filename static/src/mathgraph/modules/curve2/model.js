define(['../../core/core'], function (core) {
    core.extend('Curve2', ['space2', 'sheet', 'axes'], function (module, space2, sheet, axes) {
        module.model(function () {
            var m = space2.make_curve2(),
                ax = m.make_project(axes.get());
            axes.get().type === 'affine' && ax.setEquation({
                A: 1,
                B: 0,
                C: 0,
                D: 0,
                E: -1,
                F: 0
            });
            axes.get().type === 'polar' && ax.setEquation({
                p: 0.5,
                e: 1,
                shift: {
                    r: 0,
                    phi: 0
                },
                alpha: Math.PI / 2
            });
            var sh = m.make_project(sheet.axes);
            return {
                model: m,
                sheet: sh,
                get axes() {
                    return m.make_project(axes.get())
                }
            }
        });
    });
});