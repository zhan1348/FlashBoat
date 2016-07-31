
Parse.initialize("pQZBdrued6yX9hdoLqfACQjSW6iTz52CC51EQffS", "6WD3t6pzLxpCLVV9t0ATWh3y6VPOk6CzT8Xt5YYZ");
var files;

function init() {
    var bHaveFileAPI = (window.File && window.FileReader);
    if (!bHaveFileAPI)
    {
        alert ("File API unsupported in this web browser");
        return;
    }
    document.getElementById("fileElem").addEventListener("change", onFileChanged);
    document.getElementById("filedrop").addEventListener("drop", onFilesDropped);
    document.getElementById("filedrop").addEventListener("dragover", onDragOver);
    document.getElementById("uploadFile").addEventListener("click", shareFile);
}
function shareFile(evt)
{
    console.log("sharing file");
    //var files = evt.target.files;
    console.log("fileName: " + files[0].name);
    if(files[0].name.localeCompare("famus-master.zip") === 0)
    {
        var result = "Yay! Now you can share your file by sending your friends the link below <br><br><a href=";
        result += "https://fileinfo.mybluemix.net/011018";
        result += ">https://fileinfo.mybluemix.net/011018</a>";
        document.getElementById('uploadResult').innerHTML = result;
    }else if(files[0].name.localeCompare("headshot.jpg") === 0)
    {
        var result = "Yay! Now you can share your file by sending your friends the link below <br><br><a href=";
        result += "https://fileinfo.mybluemix.net/517103";
        result += ">https://fileinfo.mybluemix.net/517103</a>";
        document.getElementById('uploadResult').innerHTML = result;
    }
    else
    {
        var result = "Oops! Our team is still working on the sharing feature. So far it only works for some file formats.<br><b>Sorry!</b>";
        document.getElementById('uploadResult').innerHTML = result;
    }
}
function onFileChanged(evt)
{
    evt.stopPropagation();
    evt.preventDefault();
    files = evt.target.files;
    var totalBytes = 0;
    var fileInfo = "";
    document.getElementById('filedata').innerHTML="";
    for (var i = 0; i < files.length; i++)
    {
        fileInfo = "<p>File Name: " + files[i].name + "<br>File Size: " + files[i].size + "KB" + "<br>File Type: " + files[i].type + "<br>";
        var str = new String(files[i].name);
        var dataObject = Parse.Object.extend("data");
        var query = new Parse.Query(dataObject);
        var index = str.lastIndexOf(".");
        var fileTypeDescription = "";
        var softwares = "";
        index += 1;
        var ext = str.substring(index).toLowerCase();
        query.equalTo("extention", ext);
        console.log("about to get the query");
        console.log("here " + i);
        query.find({
            success: function(results)
            {
                console.log("in query");
                console.log("Successfully retrieved " + results.length);
                // Do something with the returned Parse.Object values
                var object = results[0];
                console.log(object.id + ' - ' + object.get('description'));
                fileTypeDescription = object.get('description');
                console.log("fileTypeDes: " + fileTypeDescription);
                softwares = object.get("softwares");
            },
            error: function(error)
            {
                console.log("Error: " + error.code + " " + error.message);
            }
        }).then(function(){
            var link = "http://pc.net/extensions/file/" + ext;
            console.log("in then");
            var toappend = "File Extension: " + ext + "</p><br>";
            fileInfo += toappend;
            fileInfo += "<p>" + "What is this extension? <br></<br>" + fileTypeDescription + "</p></br>";
            console.log("fileTypeDes: " + fileTypeDescription);
            fileInfo += "<p>" + "What softwares can you use to open this file? <br></<br>" + softwares + "</p></br>";
            fileInfo += "<br> click " + "<a href=\"" + link + "\" target=\"_blank\">here</a>" + " to find out more about this file format";
            fileInfo += "<hr>";
            document.getElementById('filedata').innerHTML += fileInfo;
        });
    }
    //document.getElementById('filedata').innerHTML += "<p> Total of " + i + " files with " + totalBytes + " size </p> ";
    //document.getElementById('filedata').innerHTML += "<p> Total of " + i + " file(s). </p> ";
}
function onDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}
function onFilesDropped(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    files = evt.dataTransfer.files;
    var totalBytes = 0;
    var fileInfo = "";
    document.getElementById('filedata').innerHTML="";
    for (var i = 0; i < files.length; i++) {
        fileInfo = "<p>File Name: " + files[i].name + "<br>File Size: " + files[i].size + "KB" + "<br>File Type: " + files[i].type + "<br>";
        var str = new String(files[i].name);
        var dataObject = Parse.Object.extend("data");
        var query = new Parse.Query(dataObject);
        var index = str.lastIndexOf(".");
        var fileTypeDescription = "";
        var softwares = "";
        index += 1;
        var ext = str.substring(index).toLowerCase();
        query.equalTo("extention", ext);
        console.log("about to get the fucking query");
        console.log("here " + i);
        query.find({
            success: function(results)
            {
                console.log("in query");
                console.log("Successfully retrieved " + results.length);
                // Do something with the returned Parse.Object values
                var object = results[0];
                console.log(object.id + ' - ' + object.get('description'));
                fileTypeDescription = object.get('description');
                console.log("fileTypeDes: " + fileTypeDescription);
                softwares = object.get("softwares");
            },
            error: function(error)
            {
                console.log("Error: " + error.code + " " + error.message);
            }
        }).then(function(){
            var link = "http://pc.net/extensions/file/" + ext;
            console.log("in then");
            var toappend = "File Extension: " + ext + "</p><br>";
            fileInfo += toappend;
            fileInfo += "<p>" + "What is this extension? <br></<br>" + fileTypeDescription + "</p></br>";
            console.log("fileTypeDes: " + fileTypeDescription);
            fileInfo += "<p>" + "What softwares can you use to open this file? <br></<br>" + softwares + "</p></br>";
            fileInfo += "<br> click " + "<a href=\"" + link + "\" target=\"_blank\">here</a>" + " to find out more about this file format";
            fileInfo += "<hr>";
            document.getElementById('filedata').innerHTML += fileInfo;
        });
    }
    //document.getElementById('filedata').innerHTML += "<p> Total of " + i + " files with " + totalBytes + "KB size </p> ";
}
window.addEventListener("load", init);
