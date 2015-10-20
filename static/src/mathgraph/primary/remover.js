define(['../core/core'], function (core) {
    core.extend('remover', ['toolbar', 'selected'], function (module, toolbar, selected) {
        module.toolbar({
            type: 'button',
            icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=remove',
            select: function () {
                selected.get() && selected.get().remove();
            }
        });
        
    });
});