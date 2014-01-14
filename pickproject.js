var win = Titanium.UI.currentWindow;
Titanium.include("/database.js");


var data = [];

var db = Titanium.Database.open(Ti.App.DatabaseName);
db.execute('CREATE TABLE IF NOT EXISTS Annotations(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , Longitude INTEGER, Latitude INTEGER, Title INTEGER, ProjectID INTEGER);');
db.execute('CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , Name TEXT, Signature TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS Picture(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , URL TEXT, AnnotationID INTEGER);');
db.execute('CREATE TABLE IF NOT EXISTS Voismemo(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , URL TEXT, AnnotationID INTEGER);');
var dbrows = db.execute('SELECT Name,id FROM Project');


while (dbrows.isValidRow()) {

    data.push({
    title: dbrows.fieldByName('Name'),
    id: dbrows.fieldByName('id')

}); 

    dbrows.next();
}

if (data.length<1){
	alert('Det finns inga projekt');
}
dbrows.close();
db.close();
 var tableview = Titanium.UI.createTableView({
    data:data,
    allowsSelection:true,
    top: 50,
    //index 
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});


win.add(tableview);

tableview.addEventListener('click', function(e){
	
Ti.App.ProjectID = e.rowData.id;
Ti.App.ProjectName = e.rowData.title;
});

var button = Titanium.UI.createButton({
	title:'Gå till Projekt',
	width:200,
	height:40,
	top:2
});
win.add(button);

button.addEventListener('click',function(){


	var mapwin= Ti.UI.createWindow({
   		title :getNameFromId(Ti.App.ProjectID),
   		backgroundColor : '#fff',
   		url : 'mapp.js'
   	});
   

   	Ti.App.navGroup.open(mapwin);
});






