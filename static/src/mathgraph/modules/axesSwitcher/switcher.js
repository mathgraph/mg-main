define(['lodash', 'jquery', '../../core/core'], function (_, $, core) {

    core.extend('axesSwitcher', ['space2', 'axes', 'sheet'], function (module, space2, axes, sheet) {

        $('#btn').click(function () {
            axes.toggle();
        });

    });

});