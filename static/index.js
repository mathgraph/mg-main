require.config({
    baseUrl: '.',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        text: 'bower_components/text/text',
        paper: 'bower_components/paper/dist/paper-full',
        lodash: 'bower_components/lodash/lodash'
    },
    shim: {
        paper: {
            exports: 'paper'
        }
    },
    packages: [
        {
            name: 'dat',
            location: 'bower_components/dat-gui/src/dat',
            main: 'gui/GUI'
        }, {
            name: 'mg-gui',
            location: 'bower_components/mg-gui/src',
            main: 'mg-gui'
        }, {
            name: 'mg-sheet',
            location: 'bower_components/mg-sheet/src/mg-sheet',
            main: 'sheet/sheet.full'
        }, {
            name: 'mg-space2',
            location: 'bower_components/mg-space2/src/mg-space2',
            main: 'space2/space2'
        }
    ]
});

define(['jquery', './src/mathgraph/mathgraph.full'], function ($, mathgraph) {
    $(function () {
            mathgraph.start();
        }
    )
});