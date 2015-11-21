define(['../core/core'], function (core) {
    core.extend('remover', ['toolbar', 'selected'], function (module, toolbar, selected) {
        module.toolbar({
            type: 'button',
            icon: '../../icons/remove.svg',
            select: function () {
                selected.get() && selected.get().remove();
            }
        });
        
    });
});