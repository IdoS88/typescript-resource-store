var npmRun = require('npm-run');

module.exports = function install(entry) {
	npmRun.exec('webpack --env.dev --config ./configuration/webpack.config.js', {cwd: __dirname}, function(err, stdout, stderr) {});
};