var npmRun = require('npm-run');

function logCleanCommand(err, stdout, stderr) 
{
	//console.log('clean:err = ' + err);
	//console.log('clean:stdout = ' + stdout);
	//console.log('clean:stderr = ' + stderr);
}

module.exports = function clean(entry) {
	console.log('clean: ' + entry);
	npmRun.exec('rimraf '+ entry, {cwd: __dirname}, logCleanCommand);
};