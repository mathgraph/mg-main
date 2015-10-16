define(['../../core/core'], function (core) {
    core.extend('Line', ['space2', 'sheet', 'axes'], function (module, space2, sheet, axes) {
        module.model(function () {
            var m = space2.make_line();
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