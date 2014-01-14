var win = Titanium.UI.currentWindow
var sound;
voicememo = [];

var db = Titanium.Database.open(Ti.App.DatabaseName);
var dbrows = db.execute('SELECT URL FROM Voismemo WHERE AnnotationID="' + Ti.App.AnnotationID + '"');

while (dbrows.isValidRow()) {

    voicememo.push({
    title:dbrows.fieldByName('URL')
    
}); 

    dbrows.next();
}

dbrows.close();
db.close();

var view = Ti.UI.createView({
	height: 50,
	backgroundColor:'#fff'
});
var button = Ti.UI.createButton({
	backgroundColor : '#fff',
	top:5,
	title:'spela röstmemo'
	
});
//view.add(button);

var b2 = Titanium.UI.createButton({
	title:'Playback Recording',
	width:200,
	height:40,
	top:2
});
view.add(b2);
b2.addEventListener('click',function(){
	
	
		if (sound && sound.playing)
	{
		sound.stop();
		sound.release();
		sound = null;
		b2.title = 'Playback Recording';
	}
	else
	{
		
		sound = Titanium.Media.createSound({url:Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + Ti.App.Row});
		sound.addEventListener('complete', function()
		{
			b2.title = 'Playback Recording';
		});
		sound.play();
		b2.title = 'Stop Playback';
	}
});

var tableview = Titanium.UI.createTableView({
    data:voicememo,
    allowsSelection:true,
    headerView:view,
    top: 50,
    
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

win.add(tableview);

tableview.addEventListener('click', function(e){
	function getRow(e){
		row = e.rowData.title;
		return row;
	}
Ti.App.Row = e.rowData.title;
});


