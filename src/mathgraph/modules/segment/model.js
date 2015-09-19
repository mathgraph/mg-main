define(['../../core/core'], function (core) {
    core.extend('Segment', ['space2', 'axes'], function (module, space2, axes) {
        module.model(function (point) {
            var res = space2.make_segment().make_project(axes);
            res.point1 = point;
            res.point2 = point;
            return res;
        });
    });
});