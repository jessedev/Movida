var peerflix = require('peerflix');
var fs = require('fs-extra'); // We need more functions, byebye fs hello fs-extra!
var path = require('path');

function StreamInstance(magnet, tmpPath) {
    this.magnet = magnet;
    this.tmpPath = tmpPath;
}

StreamInstance.prototype.start = function() {
    this.started = true;
    this.engine = peerflix(this.magnet, { port: 8888, path: this.tmpPath } ); // Creates the tmp directory if it doesn't exist.

    this.engine.on('ready', function() {
        console.log('Take a seat! The video will now start streaming on localhost:8888.');
    });
}

StreamInstance.prototype.getBiggestFile = function() {
    if(!this.started) {
        console.log("StreamInstance wasn't even started yet!");
        return;
    }

    var index = this.engine.files.reduce(function(a, b) {
        return a.length > b.length ? a : b;
    });
    index = this.engine.files.indexOf(index);
    return this.engine.files[index];
}

module.exports = StreamInstance;