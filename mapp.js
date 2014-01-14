var coordxy = require('com.mdpauley.coordxy'); // för longpress skall fungera
var mapwin = Titanium.UI.currentWindow
Titanium.include("/database.js");

//Nästa fönster, Edit.
var mapview = coordxy.createView({ //cordxy för longpress
	mapType: Titanium.Map.STANDARD_TYPE,
	region: {latitude:59.2567, longitude: 15.2189, latitudeDelta:0.05, longitudeDelta:0.05},
	animate:true,
	regionFit:true,
	userLocation:true,
		//annotations:annotations
});

mapwin.add(mapview);
//Gå till Edit efter tryck på en annotation
mapview.addEventListener("click", function(evt)
	{
		if (evt.clicksource == "rightButton")
		{
			Ti.App.AnnotationID = evt.annotation.myid;

			var Edit = Ti.UI.createWindow({
  				backgroundColor : '#fff',
  				title:'Redigera',
  				url: 'Edit.js'
			});

			Ti.App.navGroup.open(Edit)
		}
		else (evt.clicksource == "leftButton")
		{
				if (evt.annotation && (evt.clicksource === 'leftButton' || evt.clicksource == 'leftPane')) {  
				mapview.removeAnnotation(evt.annotation);
		var db = Ti.Database.open(Ti.App.DatabaseName);
    	db.execute('DELETE FROM Annotations WHERE id ="' + evt.annotation.myid +'"');

		db.close;
			// *****Delete from database****
			}         
		}
});

//zoomknappar

var zoomin = null;
var zoomout = null;

		zoomin = Titanium.UI.createButton({
		title:'+',
		height: 30,
		width: 30,
		top: 15,
		right: 10,
		opacity: 0.8,
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
	
		zoomout = Titanium.UI.createButton({
		title:'-',
		height: 30,
		width: 30,
		top:50,
		right: 10,
		opacity: 0.8,
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
	
		zoomin.addEventListener('click',function() {
		mapview.zoom(1);
		});
	
		zoomout.addEventListener('click',function() {
		mapview.zoom(-1);
		});


mapwin.add(zoomout);
mapwin.add(zoomin);

//Lägg till knappnåls-knapp

var addAnnotation = Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.ADD
});

addAnnotation.addEventListener("click", function(){
	addNewAnno();
});

mapwin.rightNavButton = addAnnotation;

// variabel för största värdet på Title på annotations
var largestTitle = 0;
if (!mapview.annotations || mapview.annotations.length < 1){
	var db = Ti.Database.open(Ti.App.DatabaseName);
	var annos = db.execute('SELECT id, Longitude, Latitude, Title FROM Annotations WHERE ProjectID ="' + Ti.App.ProjectID + '"');	
	
	while(annos.isValidRow()){
	
		thislatitude = annos.fieldByName('Latitude');
		thislongitude = annos.fieldByName('Longitude');
		thisid =annos.fieldByName('id');
		thistitle = annos.fieldByName('Title');
		Ti.API.info('Title:' + thistitle + ' lon:' + thislongitude + ' lat:' + thistitle + ' ID' + thisid);
		
		if(largestTitle < thistitle){ // Hittar den största titeln
			largestTitle = thistitle;
		}
			addAnno = Titanium.Map.createAnnotation({
	        latitude:thislatitude,
	        longitude:thislongitude,
	        title:'Plats: ' + thistitle,   
	        myid : thisid,
	        rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
	        pincolor: Titanium.Map.ANNOTATION_RED,
	        animate:true,
	        leftButton: "delete.png",
	    
	    });
	    mapview.addAnnotation(addAnno);
		annoAdded = true;
		annos.next();
	}
	annos.close();
	db.close();
}


//Funktion för att lägga till en knappnål

var annoAdded = false;
var addAnno;

// Om largets title har beräknats så används den när ny annotation läggs till
var Title = 1;
if(largestTitle > 0){
		
	var Title = largestTitle + 1;
}


function addNewAnno(){
		var db = Ti.Database.open(Ti.App.DatabaseName);
    	db.execute('INSERT INTO Annotations (Longitude, Latitude, Title, ProjectID) VALUES (?,?,?,?)', Titanium.App.Properties.getString('goLong'), Titanium.App.Properties.getString('goLat'), Title, Ti.App.ProjectID);
		var thisid = db.lastInsertRowId;
		db.close;
		getAnnotationInfo(thisid);
    	addAnno = Titanium.Map.createAnnotation({
        latitude:Titanium.App.Properties.getString('goLat'),
        longitude:Titanium.App.Properties.getString('goLong'),
        title:'Plats: ' + Title,
        myid : thisid,
        rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
        pincolor: Titanium.Map.ANNOTATION_RED,
        animate:true,
        leftButton: "delete.png",
    });
    mapview.addAnnotation(addAnno);
    mapview.selectAnnotation(addAnno);
    annoAdded = true;

    Title++;
};

//klicka på addknapp
mapview.addEventListener('regionChanged',function(evt){
    Titanium.App.Properties.setString('goLat',evt.latitude.toPrecision(10));
    Titanium.App.Properties.setString('goLong',evt.longitude.toPrecision(10));
});

//klicka i karta
mapview.addEventListener('xychange', function(e){
Titanium.App.Properties.setString('goLat',e.latitude.toPrecision(10));
Titanium.App.Properties.setString('goLong',e.longitude.toPrecision(10));
addNewAnno();
});


//Locationknapp i Toolbar
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

		var locationButton = Titanium.UI.createButton({
			title:">",
			style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
			});
			var space = Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});



var sat = Titanium.UI.createButton({
	title:"Flygfoto",
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var standard = Titanium.UI.createButton({
	title:"Karta",
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	
});



standard.addEventListener("click", function(){
mapview.setMapType(Titanium.Map.STANDARD_TYPE);
});

sat.addEventListener("click", function(){
	mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
});



mapwin.setToolbar([locationButton,space, sat, standard]);

function getLocation(){
//Get the current position and set it to the mapview
Titanium.Geolocation.getCurrentPosition(function(e){
	
        var region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.001,
            longitudeDelta:0.001
        };
        mapview.setLocation(region);
});
}

locationButton.addEventListener('click',function() 
{
	Ti.Geolocation.restart();
	getLocation();
});

standard.addEventListener("click", function(){
mapview.setMapType(Titanium.Map.STANDARD_TYPE);
});

sat.addEventListener("click", function(){
	mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
});