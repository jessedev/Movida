var StreamInstance = require("./StreamInstance.js");
var path = require('path');
var fs = require('fs-extra');

tmpPath = path.normalize(path.join(__dirname, "tmp"));

// Delete the previous tmp path
fs.exists(tmpPath, function(exists) {
    if (exists) {
        console.log("Deleting tmp folder, because it exists.");
        fs.delete(tmpPath, function(err) {
            console.error("Could NOT delete the tmp folder on startup. Please check if it is writable/removable.")
        });
    }
});

if(process.argv[2] != null) { // So we have atleast one argument
    var magnet = process.argv.slice(2).join(" ");
    var si = new StreamInstance(magnet);
    si.start();
    si.engine.on('ready', function() {
        console.log(si.getBiggestFile());
    });

} else {
    console.log('Arg was null');
}
