var wolfram = require('wolfram').createClient('52LEWP-956YVGYQGW');

module.exports = wolfram.query.bind(wolfram);