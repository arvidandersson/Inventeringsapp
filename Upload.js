var win = Titanium.UI.currentWindow;

f1 = Titanium.Filesystem.getFile("/",'delete.png');
image1 = f1.read();

var img = Titanium.UI.createImageView({image: image1}); win.add(img); 

/*
xhr = Titanium.Network.createHTTPClient();
xhr.open('POST','http://orebro.sweco.se/inventering/upload/upload.php'); // false makes it synchronous
//xhr.onload = function() { handleAfterSentRouting(this.responseText); };
xhr.send({media: i1}); // media1 is the field the file information is in when you upload
	
*/

   var xhr = Titanium.Network.createHTTPClient();

    xhr.onerror = function(e)
    {
        Ti.UI.createAlertDialog({title:'Error', message:e.error}).show();
        Ti.API.info('IN ERROR ' + e.error);
    };
    xhr.setTimeout(20000);
    xhr.onload = function(e)
    {
        Ti.UI.createAlertDialog({title:'Success', message:'status code ' + this.status}).show();
        Ti.API.info('IN ONLOAD ' + this.status + ' readyState ' + this.readyState);
    };
    xhr.onsendstream = function(e)
    {
        ind.value = e.progress ;
        Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
    };
    // open the client
    xhr.open('POST','http://orebro.sweco.se/inventering/upload/WebService.asmx/SaveImage');
    // send the data
    xhr.send({recFile:image1});




/*
    var image_name = 'delete' + '.png';
    Ti.API.info('imageName: ' + image_name );
 
    var xhr = Titanium.Network.createHTTPClient();
 
    xhr.onerror = function(e) {
        Ti.API.info('IN ERROR ' + e.error);
        actInd.hide();
    };
    xhr.onload = function() {
        //alert("Your Request has been submitted!");
        Ti.API.info('IN ONLOAD ' + this.status + ' readyState ' + this.readyState);
        actInd.hide();
    };
 
    // open the client
    xhr.open('POST', 'http://orebro.sweco.se/inventering/WebService.asmx/UploadFileCollection');
    xhr.send({ media: image, image_name: image_name });

*/

    //xhr.setRequestHeader("Connection", "close");
    // send the data

    //xhr.send({media:image});
/*
},
cancel:function()
{

},
error:function(error)
{
},
allowImageEditing:true
});
*/

  
 




