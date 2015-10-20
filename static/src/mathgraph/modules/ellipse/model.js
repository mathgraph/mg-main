define(['../../core/core'], function (core) {
    core.extend('Ellipse', ['space2', 'sheet', 'axes'], function (module, space2, sheet, axes) {
        module.model(function () {
            var m = space2.make_ellipse(),
                ax = m.make_project(space2.make_axes('affine'));
            ax.a = 5;
            ax.b = 5;
            return {
                model: m,
                sheet: m.make_project(sheet.axes),
                get axes() {
                    return m.make_project(axes.get())
                }
            }
        });
    });
});