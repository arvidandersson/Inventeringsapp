var photoswin= Titanium.UI.currentWindow
Titanium.include("/database.js");
Ti.include('picturegallery.js');




images = [];

var db = Titanium.Database.open(Ti.App.DatabaseName);
var dbrows = db.execute('SELECT URL FROM Picture WHERE AnnotationID="' + Ti.App.AnnotationID + '"');

while (dbrows.isValidRow()) {

    images.push({
    path:Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + dbrows.fieldByName('URL')
}); 

    dbrows.next();
}

dbrows.close();
db.close();


var pictureGallery = PictureGallery.createWindow({
	 images: images,
  scrollableGallery: {
    labelColor: 4,
    labelFont: {fontSize : 18, fontWeight : 'bold'},
    barColor: '#000',
    displayArrows: true,
    displayCaption: true
  }
});

photoswin.add(pictureGallery);
