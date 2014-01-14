var editwin = Titanium.UI.currentWindow

var recMemo = Titanium.UI.createButton({  
    title:'Röstmemo',
    height: 40,
    width : 200,
    top: 10,
  });

recMemo.addEventListener('click', function(evt) {
	
   var win= Ti.UI.createWindow({
   	title :'Tala in',
   	backgroundColor : '#fff',
   	url : 'Record.js'
   });
   
	Ti.App.navGroup.open(win);
});


var snapPic = Titanium.UI.createButton({
	title:"Ta kort",
	height:40,
	width: 200,
	top : 60
});

snapPic.addEventListener("click", function(){
Ti.Media.showCamera({
	showControls:true,  
   
    success:function(event) {
	var image = event.media
	
	// Filmamn
	var filename = new Date().getTime() + ".jpg";
	
	// Skapa fil i app directory
	bgImage = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
	
	// Skriv bild till fil
	bgImage.write(image);
	// In i databas
	var db = Titanium.Database.open(Ti.App.DatabaseName);
	try{
	     db.execute('INSERT INTO Picture (URL, AnnotationID) VALUES (?,?)', filename, Ti.App.AnnotationID);
	
	} catch(e) {
	    alert(e.message);
	}	
	db.close();

editwin.add(imageView);	
	},	
	    cancel:function() {},
        error:function(error) {}       
    });
 });

var picGallery = Titanium.UI.createButton({
	title:"Fotoalbum",
	height:40,
	width: 200,
	top:110,
	
});

picGallery.addEventListener("click", function(){

	var win= Ti.UI.createWindow({
   	title :'Bilder',
   	backgroundColor : '#fff',
   	url : 'Photos.js'
  	 });

	Ti.App.navGroup.open(win);
	
});

var voicegallery= Titanium.UI.createButton({
	title:"Välj röstmemo",
	height:40,
	width: 200,
	top : 160
});

voicegallery.addEventListener("click", function(){
	
var win= Ti.UI.createWindow({
   	title :'Röstmeddelande',
   	backgroundColor : '#fff',
   	url : 'VoiceList.js'
   });
 Ti.App.navGroup.open(win);

});

editwin.add(voicegallery);
editwin.add(recMemo);
editwin.add(snapPic);
editwin.add(picGallery);