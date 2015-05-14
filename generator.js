var wrench = require('wrench');
var fs = require('fs');
var nodeZip = require("node-native-zip");


//  String enhancements
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.contains = function(text){
    return this.indexOf(text) !== -1;
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

// Helper Functions
var renameAllFoldersAndFiles = function(file, projectName){

    var fileInfo = fs.lstatSync(file);
    if(file.nameContains('unicron') ||
        file.nameContains('Unicron') && fs.existsSync(file)){

        if(fileInfo.isDirectory() || file.endsWith('.sln') || file.endsWith('.csproj') ){
            var newFileName= '';
            if(file.nameContains('Unicron')){
                newFileName = file.replaceLast('Unicron', projectName);
            }
            else if(file.nameContains('unicron')){
                newFileName = file.replaceLast('unicron', projectName);
            }
            console.log('Old File Name ' + file);
            console.log('New File Name ' + newFileName);
            fs.renameSync(file, newFileName);
        }
    }
};

var generateNewFile = function(file, projectName){

    var fileInfo = fs.lstatSync(file);
    if(file.contains('.nuget')){
        // ignore .nuget folder contents
    }
    else if(fileInfo.isDirectory() && file.containsAfter('StarscreamBootstrap','Unicron')){

        var newFileName = file.replaceLast('Unicron', projectName);
        console.log('Old file: '+ file);
        console.log('New File: '+ newFileName);

        fs.renameSync(file, newFileName+'');
    }
    else if(!fileInfo.isDirectory() && !file.endsWith(".dll") && !file.endsWith(".DS_Store")){

        var text = fs.readFileSync(file, 'utf-8');
        var regex = new RegExp("Unicron|unicron|Unicron","gm")
        text = text.replace(regex, projectName);

        fs.writeFileSync(file, text);
    }
};

function convertFilesToObjects(destinationDirectory) {
    var files =  wrench.readdirSyncRecursive(destinationDirectory);
    var objects = []
    for(var i=0; i<files.length;i++) {
        var filePath = destinationDirectory + "/" + files[i];

        var fileInfo = fs.lstatSync(filePath);
        if(!fileInfo.isDirectory()) {
            objects.push(
                        {
                            name: files[i],
                            path: filePath,
                            compression: 'deflate'
                        });
        }
    }
    return objects;
}

var getZipBuffer = function(destinationDirectory, res){

    var zippedArchive = new nodeZip();

    var fileObjects = convertFilesToObjects(destinationDirectory);

    zippedArchive.addFiles(fileObjects, function(){
        var buff = zippedArchive.toBuffer(function(bufferResult){
            res.contentType('zip');
            res.setHeader('Content-disposition', 'attachment; filename=starscream_bootstrap.zip');
            res.send(bufferResult);
            res.end();

            // Remove temp directory:
            wrench.rmdirSyncRecursive(destinationDirectory, false)
        });
    });
};

var generate = function(projectName, res){

    // This is a naive and brute force approach :)
    // Suggestions to improve the code are welcomed

    var sourceDirectory = __dirname + '/Unicron';
    var destinationDirectory = __dirname + '/temp/' + projectName;

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

    files.reverse().forEach(function(file){
        generateNewFile(destinationDirectory+'/'+file, projectName);
    });

    // Zip Files
    var zipBuffer = getZipBuffer(destinationDirectory, res);
};

// Entry Point
module.exports.generate = generate;
