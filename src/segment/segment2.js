define(['../core'], function (core) {

    core.toolbar({
        type: 'selectable',
        icon: 'http://dummyimage.com/50x50/ad6685/0c00f0.png&text=arrow',
        select: function () {
            creator.enabled = true;
        },
        unselect: function () {
            creator.enabled = false;
        }
    });


});