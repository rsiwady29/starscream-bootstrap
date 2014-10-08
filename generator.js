var wrench = require('wrench');

var generate = function(projectName){

    var sourceDirectory = __dirname + '/Starscream';
    var destinationDirectory = __dirname + '/temp/' + projectName;

    console.log('Source Directory: ' + sourceDirectory);
    console.log('Destination Directory: ' + destinationDirectory);

    //Create Destination Directory:
    wrench.mkdirSyncRecursive(destinationDirectory, 0777);

    // Copy source files to destination
    wrench.copyDirSyncRecursive(sourceDirectory, destinationDirectory, {forceDelete:true});

    // Get All Files
    var files = wrench.readdirSyncRecursive(destinationDirectory);

};

generate('test');