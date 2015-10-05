define(['lodash', '../../core/core'], function (_, core) {

    core.extend('axesSwitcher', ['space2', 'axes', 'toolbar'], function (module, space2, axes, toolbar) {
        module.toolbar({
            type: 'button',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=SW',
            select: function () {
                axes.toggle();
            }
        })
    });

});