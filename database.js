function createDB()
 {
 		
 		var db = Ti.Database.open(Ti.App.DatabaseName);
		db.file.setRemoteBackup(false);						
		//db.execute('DROP TABLE IF EXISTS Project');
		db.execute('CREATE TABLE IF NOT EXISTS Annotations(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , Longitude INTEGER, Latitude INTEGER, Title INTEGER, ProjectID INTEGER);');
		db.execute('CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , Name TEXT, Signature TEXT);');
		db.execute('CREATE TABLE IF NOT EXISTS Picture(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , URL TEXT, AnnotationID INTEGER);');
		db.execute('CREATE TABLE IF NOT EXISTS Voismemo(id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , URL TEXT, AnnotationID INTEGER);');
		db.execute('INSERT INTO Project(Name, Signature) VALUES (?,?)', name.value, sign.value );
		var thisid = db.lastInsertRowId;
		Ti.App.ProjectID = thisid;
						
		db.close();
}

function getNameFromId(e)
{
	var db = Ti.Database.open(Ti.App.DatabaseName);
	db.file.setRemoteBackup(false);
	
	var a = db.execute('SELECT Name FROM Project WHERE id ="' + e + '"');
	var b = a.fieldByName("Name");
	
	db.close();
	return b;
	
}

function getAnnotatTitle(e)
{
	var db = Ti.Database.open(Ti.App.DatabaseName);
	db.file.setRemoteBackup(false);
	
	var a = db.execute('SELECT Title FROM Annotations WHERE id ="' + e + '"');
	
	var b = a.fieldByName("Title");
	
	db.close();
	return b;
}

function getAnnotations(e){
	var db = Ti.Database.open(Ti.App.DatabaseName);
	
		var annos = db.execute('SELECT id, Longitude, Latitude, Title FROM Annotations WHERE id ="' + e + '"');
	db.close();
	return annos;
}


function getAnnotationInfo(e){
var db = Ti.Database.open(Ti.App.DatabaseName);
var an = db.execute('SELECT id, Longitude, Latitude, Title, ProjectID FROM Annotations WHERE id ="' + e + '"');

while(an.isValidRow()){
		thislatitude = an.fieldByName('Latitude');
		
		thislongitude = an.fieldByName('Longitude');
		thisid =an.fieldByName('id');
		thistitle = an.fieldByName('Title');
		thisprojectID = an.fieldByName('ProjectID');
		Ti.API.info('Title:' + thistitle + ' lon:' + thislongitude + ' lat:' + thistitle + ' ID:' + thisid + ' ProjectID:'+ thisprojectID);
  		an.next();
}
an.close();
		db.close;
}




