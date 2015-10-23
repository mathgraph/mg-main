define(['../../core/core'], function (core) {
    core.extend('Point', [], function (module) {
        module.hint(function factory(model) {
        	if (typeof model.axes.x !== 'undefined') {
        		return {
						x: model.axes.x.toFixed(3),
						y: model.axes.y.toFixed(3)
					};
        	} else {
				return {
					r: model.axes.r.toFixed(3),
					phi: model.axes.phi.toFixed(3)
				};
			}
        });
    });
});