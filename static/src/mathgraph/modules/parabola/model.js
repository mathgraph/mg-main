define(['../../core/core'], function (core) {
    core.extend('Parabola', ['space2', 'sheet', 'axes'], function (module, space2, sheet, axes) {
        module.model(function () {
            var m = space2.make_parabola();
            m.make_project(axes.get()).p = 2.5;
            console.log(m.make_project(sheet.axes).p);
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