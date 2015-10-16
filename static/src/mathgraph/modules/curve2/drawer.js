define(['../../core/core'], function (core) {
    core.extend('Curve2', ['sheet'], function (module, sheet) {

        function calc(eq, p) {
            var t0, t1, t2, t3,
                A = eq.A,
                B = eq.B,
                C = eq.C,
                D = eq.D,
                E = eq.E,
                F = eq.F,
                x = p.x,
                y = p.y;
            if (typeof y !== 'undefined') {
                if (A !== 0) {
                    t0 = (C * y + D) * (C * y + D);
                    t1 = -4 * A * (B * y * y + E * y + F);
                    t2 = Math.sqrt(t0 + t1);
                    return (t2 - C * y - D) / 2 / A;
                }
                return (-B * y * y - E * y - F) / (C * y + D);
            }
            if (typeof x !== 'undefined') {
                if (B !== 0) {
                    t0 = (C * x + E) * (C * x + E);
                    t1 = -4 * B * (A * x * x + D * x + F);
                    t2 = Math.sqrt(t0 + t1);
                    return (t2 - C * x - E) / 2 / B;
                }
                return (-A * x * x - D * x - F) / (C * x + E);
            }
            return null;
        }

        function calcPoints(model) {
            var eq = model.sheet.getEquation(),
                d = eq.A * eq.B - (eq.C * eq.C / 4),
                x0 = (eq.C / 2 * eq.E / 2 - eq.D / 2 * eq.B) / d,
                y0 = (eq.C / 2 * eq.D / 2 - eq.A * eq.E / 2) / d;
            switch (model.model.getType()) {
                case 'Ellipse':
                    return [[x0, calc(eq, {x: x0})]];
                case 'Parabolic':
                case 'Point':
                case 'Two intersecting lines':
                case 'Line':
                    //return [[x0, calc(eq, {x: x0})]];
                    //break;
                case 'Hyperbolic':
                case 'Two parallel lines':
                    return [[calc(eq, {y: 0}), 0], [0, calc(eq, {x: 0})]];
                default:
                    return;
            }
        }

        function getCoeff(eq) {
            return [
                [eq.A, 2, 0],
                [eq.B, 0, 2],
                [eq.C, 1, 1],
                [eq.D, 1, 0],
                [eq.E, 0, 1],
                [eq.F, 0, 0]
            ];
        }

        module.view(function factory(model) {
            var eq = model.sheet.getEquation();
            return sheet.draw_polynomial(getCoeff(eq), calcPoints(model), {radius: 2, eps: 0.02});
        }, function update(model, view) {
            view.coefficients = getCoeff(model.sheet.getEquation());
            view.points = calcPoints(model);
            view.recalc();
        });

        module.toolbar({
            type: 'button',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=curve2',
            select: function () {
                module.item();
            }
        });

    });
});