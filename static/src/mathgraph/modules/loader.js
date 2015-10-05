define(['../utils/loadSync'], function (loadSync) {

    loadSync.dep([
        './src/mathgraph/modules/segment/loader',
        './src/mathgraph/modules/affineDrawer/loader',
        './src/mathgraph/modules/axesSwitcher/switcher']);

});