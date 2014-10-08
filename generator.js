var wrench = require('wrench');
var fs = require('fs');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.containsAfter = function(suffix, text) {
    var pos = this.indexOf(suffix);
    if(pos<0) return this;
    var newString = this.substring(pos+suffix.length);
    return newString.lastIndexOf(text) !== -1;
};

String.prototype.nameContains = function(suffix) {
    var pos = this.lastIndexOf('/');
    var newString = this.substring(pos);
    return newString.lastIndexOf(suffix) !== -1;
};

String.prototype.replaceLast = function(text, newText) {
    var pos = this.lastIndexOf(text);
    if(pos < 0) return this;
    partOne = this.substring(0, pos);
    partTwo = this.substring(pos);
    partTwo = partTwo.replace(text, newText);
    return partOne + partTwo;
};

var renameAllFoldersAndFiles = function(file, projectName){

    var fileInfo = fs.lstatSync(file);
    if(file.nameContains('starscream') ||
        file.nameContains('Starscream') ||
        file.nameContains('StarScream')){

        if(fileInfo.isDirectory() || file.endsWith('.sln') || file.endsWith('.csproj') ){
            var newFileName= '';
            if(file.nameContains('StarScream')){
                newFileName = file.replaceLast('StarScream', projectName);
            }
            else if(file.nameContains('Starscream')){
                newFileName = file.replaceLast('Starscream', projectName);
            }
            else if(file.nameContains('starscream')){
                newFileName = file.replaceLast('starscream', projectName);
            }

            console.log('Old file: '+ file);
            console.log('New File: '+ newFileName);

            fs.renameSync(file, newFileName);
        }
    }

};

var generateNewFile = function(file, projectName){

    var fileInfo = fs.lstatSync(file);
    if(fileInfo.isDirectory() && file.containsAfter('StarscreamBootstrap','Starscream')){

        var newFileName = file.replaceLast('Starscream', projectName);
        console.log('Old file: '+ file);
        console.log('New File: '+ newFileName);

        fs.renameSync(file, newFileName);
    }
    else if(!fileInfo.isDirectory() && !file.endsWith(".dll") && !file.endsWith(".DS_Store")){

        var text = fs.readFileSync(file, 'utf-8');
        var regex = new RegExp("Starscream|starscream|StarScream","gm")
        text = text.replace(regex, projectName);

        fs.writeFileSync(file, text);
    }
};

var generate = function(projectName){

    // This is a naive and brute force approach :)
    // Suggestions to improve the code are welcomed

    var sourceDirectory = __dirname + '/Starscream';
    var destinationDirectory = __dirname + '/temp/' + projectName;

    console.log('Source Directory: ' + sourceDirectory);
    console.log('Destination Directory: ' + destinationDirectory);

    //Create Destination Directory:
    wrench.mkdirSyncRecursive(destinationDirectory, 0777);

    // Copy source files to destination
    wrench.copyDirSyncRecursive(sourceDirectory, destinationDirectory, {forceDelete:true});

    // Get All Files, change it to only dirs
    var files = wrench.readdirSyncRecursive(destinationDirectory);

    // Rename folders
    files.reverse().forEach(function(file){
        renameAllFoldersAndFiles(destinationDirectory+'/'+file, projectName);
    });

    // Get All files again, now with new folder names
    var files = wrench.readdirSyncRecursive(destinationDirectory);

    files.forEach(function(file){
        generateNewFile(destinationDirectory+'/'+file, projectName);
    });

};

generate('test');