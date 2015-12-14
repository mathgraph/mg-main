define(['../../core/core', "mg-sheet"], function (core, Sheet) {

    core.extend('zoom', ['sheet'], function (module, sheet) {
        sheet.on('wheel', function (e) {
            var d = 0.1,
                basis = sheet.axes.basis;
            if (e.wheelDelta > 0) {
                d = 1 + d;
            } else {
                d = 1 - d;
            }
            basis[0][0] *= d;
            basis[0][1] *= d;
            basis[1][0] *= d;
            basis[1][1] *= d;
        });
    });
});