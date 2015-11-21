define(['lodash', '../../core/core'], function (_, core) {

    core.extend('axesSwitcher', ['space2', 'axes', 'toolbar'], function (module, space2, axes, toolbar) {
        module.toolbar({
            type: 'button',
            icon: '../../../icons/SW.svg',
            select: function () {
                axes.toggle();
            }
        })
    });

});