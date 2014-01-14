var Memovin = Titanium.UI.currentWindow
voisArray = [];
voismemos = [];
var db = Titanium.Database.open(Ti.App.DatabaseName);
var dbrows = db.execute('SELECT URL FROM Voismemo WHERE AnnotationID="' + Ti.App.AnnotationID + '"');

while (dbrows.isValidRow()) {

    voisArray.push({
        voismemo:dbrows.fieldByName('URL')
    }); 

    dbrows.next();
}

dbrows.close();

//visar bilder
for (var i = 0; i < voisArray.length; i++){



    var file = Titanium.Filesystem.getFile(voisArray[i].voismemo);

    voismemos[i] = Ti.UI.createButton({
        image: Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + voisArray[i].voismemo, // path to image at applicationDataDirectory
        width: 150,
        height: 40,
        store_id: imageArray[i].id
        
    });
    images.addEventListener('click', function(e){
    	 var win= Ti.UI.createWindow({
		   	 title :'Bild',
		   	 backgroundColor : '#fff',
		   	 
		 });
		 	
		 img = Ti.UI.createImageView({
      		image: Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + imageArray[i].image, // path to image at applicationDataDirectory
       		
        
    });
    
    	win.add(img);
		 Ti.App.navGroup.open(win);
    });

    photoswin.add(images[i]);
}