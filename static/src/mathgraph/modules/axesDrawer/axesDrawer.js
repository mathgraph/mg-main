define(['../../core/core', 'lodash'], function (core, lodash) {

    core.extend('axesDrawer', ['space2', 'axes', 'sheet'], function (module, space2, axes, sheet) {
        var recalcModel, recalcView, signOfRound, oldBasis, oldTypeAxes;

        signOfRound = function (c) {
            var n = -0;
            if (Math.floor(c) === 0) {
                do {
                    n--;
                    c *= 10;
                } while (Math.floor(c) === 0)
            } else {
                c = Math.floor(c);
                n = -1;
                while (c !== 0) {
                    n++;
                    c = Math.floor(c / 10);
                }
            }
            return n;
        };
        recalcModel = function (spOx, spOy, spOr) {
            var basis = sheet.axes.basis,
                min1 = Math.min(Math.abs(sheet.width / 2 / basis[0][0]), Math.abs(sheet.height / 2 / basis[0][1])),
                min2 = Math.min(Math.abs(sheet.width / 2 / basis[1][0]), Math.abs(sheet.height / 2 / basis[1][1]));
            spOx.point1 = {
                x: -basis[0][0] * min1,
                y: -basis[0][1] * min1
            };
            spOx.point2 = {
                x: basis[0][0] * min1,
                y: basis[0][1] * min1
            };

            spOy.point1 = {
                x: -basis[1][0] * min2,
                y: -basis[1][1] * min2
            };
            spOy.point2 = {
                x: basis[1][0] * min2,
                y: basis[1][1] * min2
            };

            spOr.point1 = {
                x: 0,
                y: 0
            };
            spOr.point2 = {
                x: basis[0][0] * min1,
                y: 0
            };
        };
        recalcView = function () {
            var basis = sheet.axes.basis,
                maximumDistanceBetweenLabel = 60,
                lengthX = Math.sqrt(basis[0][0] * basis[0][0] + basis[0][1] * basis[0][1]),
                signOfRoundX = signOfRound(maximumDistanceBetweenLabel / lengthX),
                lengthY = Math.sqrt(basis[1][0] * basis[1][0] + basis[1][1] * basis[1][1]),
                signOfRoundY = signOfRound(maximumDistanceBetweenLabel / lengthY),
                stepX = Math.floor(maximumDistanceBetweenLabel / lengthX * Math.pow(10, -signOfRoundX)) * Math.pow(10, signOfRoundX),
                stepY = Math.floor(maximumDistanceBetweenLabel / lengthY * Math.pow(10, -signOfRoundY)) * Math.pow(10, signOfRoundY);
            signOfRoundX = Math.max(0, -signOfRoundX);
            signOfRoundY = Math.max(0, -signOfRoundY);
            return {
                paramsAX: {
                    step: {
                        length: stepX * lengthX,
                        unit: 'px'
                    },
                    angle: -(Math.atan(basis[0][1] / basis[0][0]) + Math.atan(basis[1][0] / basis[1][1])) / Math.PI * 180
                },
                paramsAY: {
                    step: {
                        length: stepY * lengthY,
                        unit: 'px'
                    },
                    angle: (Math.atan(basis[0][1] / basis[0][0]) + Math.atan(basis[1][0] / basis[1][1])) / Math.PI * 180
                },
                paramsP: {
                    type: 'circles',
                    start: 0,
                    step: {
                        length: stepX * lengthX,
                        unit: 'px'
                    }
                },
                contentX: function (o) {
                    return (+o / lengthX).toFixed(signOfRoundX);
                },
                contentY: function (o) {
                    return (+o / lengthY).toFixed(signOfRoundY);
                },
                contentP: function (o) {
                    return (+o / lengthX).toFixed(signOfRoundX);
                }
            }
        };

        module.model(function () {
            var spOx = {},
                spOy = {},
                spOr = {};
            recalcModel(spOx, spOy, spOr);

            oldBasis = _.cloneDeep(sheet.axes.basis);
            oldTypeAxes = axes.get().type;
            return {
                    ox: spOx,
                    oy: spOy,
                    or: spOr
            }
        });

        var last = axes.get().type;

        module.view('axes', function factory(model) {
            var config = recalcView();
            return {
                ox: sheet.draw_arrow(model.ox.point1, model.ox.point2, {
                    strokeColor: 'black',
                    strokeWidth: 1
                }).ticker(config.paramsAX).grid(config.paramsAX).labeled(config.contentX, config.paramsAX).set('interactive', false),
                oy: sheet.draw_arrow(model.oy.point1, model.oy.point2, {
                    strokeColor: 'black',
                    strokeWidth: 1
                }).ticker(config.paramsAY).grid(config.paramsAY).labeled(config.contentY, config.paramsAY).set('interactive', false),
                or: sheet.draw_arrow(model.or.point1, model.or.point2, {
                    strokeColor: 'black',
                    strokeWidth: 1
                }).ticker(config.paramsP).grid(config.paramsP).labeled(config.contentP, config.paramsP).set('interactive', false).hide()
            }
        }, function update(model, view) {
            var basis = sheet.axes.basis;
            if (!_.eq(oldBasis, basis) || oldTypeAxes !== axes.get().type) {
                var config = recalcView();
                recalcModel(model.ox, model.oy, model.or);
                switch (axes.get().type) {
                    case 'affine':
                        view.ox.show();
                        view.oy.show();
                        view.or.hide();

                        view.ox.from = model.ox.point1;
                        view.ox.to = model.ox.point2;
                        view.oy.from = model.oy.point1;
                        view.oy.to = model.oy.point2;
                        view.ox.ticker(config.paramsAX).grid(config.paramsAX).labeled(config.contentX, config.paramsAX);
                        view.oy.ticker(config.paramsAY).grid(config.paramsAY).labeled(config.contentX, config.paramsAY);

                        break;
                    case 'polar':
                        view.ox.hide();
                        view.oy.hide();
                        view.or.show();

                        view.or.from = model.or.point1;
                        view.or.to = model.or.point2;
                        view.or.ticker(config.paramsP).grid(config.paramsP).labeled(config.contentX, config.paramsP);
                        break;
                }
                oldBasis =  _.cloneDeep(basis);
                oldTypeAxes = axes.get().type;
            }
        });

        module.start = function () {
            module
                .item()
                .show('grid')
                .show('axes');
        };

    })
    ;

})
;