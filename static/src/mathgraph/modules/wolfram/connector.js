define(['lodash', 'jquery', '../../core/core'], function (_, $, core) {
    var appId = '52LEWP-956YVGYQGW';
    core.extend('wolfram', [], function (module) {

        module.query = function (input) {
            var url = 'http://api.wolframalpha.com/v2/query?input=' +
                encodeURIComponent(input) + '&appid=' + appId;

            $.get({
                url: url,
                success: function (data) {
                    console.log(data);
                },
                dataType: 'xml'
            })
        }

    });

});