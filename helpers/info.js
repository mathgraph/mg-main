var express = require('express');
var exec = require('child_process').exec;

module.exports = function (req, res, next) {
    exec('pm2 jlist', function (error, stdout, stderr) {
        var data = JSON.parse(stdout);
        data = data.map(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.node_env = item.pm2_env.NODE_ENV;
            obj.status = item.pm2_env.status;
            obj.uptime = item.pm2_env.uptime;
            obj.pm_id = item.pm2_env.pm_id;
            obj.restartTime = item.pm2_env.restart_time;
            obj.unstableRestarts = item.pm2_env.unstable_restarts;
            obj.git = {};
            obj.git.url = item.pm2_env.versioning.url;
            obj.git.revision = item.pm2_env.versioning.revision;
            obj.git.revisionLink = obj.git.url.slice(0, -4) + '/commit' + obj.git.revision;
            obj.git.updateTime = item.pm2_env.versioning.update_time;
            obj.git.comment = item.pm2_env.versioning.comment;
            obj.git.branch = item.pm2_env.versioning.branch;
            obj.memory = item.monit.memory;
            return obj;
        });
        res.render('info', { data: data });
    });
};