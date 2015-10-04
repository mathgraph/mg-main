define(['../../core/core'], function (core) {
    core.extend('Segment', ['space2', 'sheet', 'axes'], function (module, space2, sheet, axes) {
        module.model(function () {
            var m = space2.make_segment();
            return {
                model: m,
                sheet: m.make_project(sheet.axes),
                axes: m.make_project(axes.get())
            }
        });
    });
});