Titanium.include("/database.js");

Ti.App.DatabaseName = "environment007";

var first = Ti.UI.createWindow({
  backgroundColor:"#fff",
  title:"InventeringsAPP"
});

Ti.App.navGroup= Ti.UI.iPhone.createNavigationGroup({
    window:first
});

//Huvudfönstret för applikationen.

var main = Ti.UI.createWindow();
main.add(Ti.App.navGroup);
main.open();


var name = Ti.UI.createTextField({
	color:"#336699",	
	hintText:"Projektnamn",
	height:35,
	width:200,
	top:125,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

name.addEventListener("return", function(){
	name.blur();
});

first.add(name);

var sign = Ti.UI.createTextField({
	color:"#336699",	
	hintText:"Signatur",
	height:35,
	width:200,
	top:170,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

sign.addEventListener("return", function(){
	sign.blur();
});

first.add(sign);

// skall lägga till fält att skriva i projektnamn och användare.
var newproj = Titanium.UI.createButton({  
    title:'Nytt projekt',
    height: 40,
    width : "auto",
    right:60,
    top: 220,
  });
  
var last = Titanium.UI.createButton({
	title:"Välj projekt",
	height:40,
	width: 230,
	top : 30
});

first.add(newproj);
first.add(last);

newproj.addEventListener('click', function(){

	if (name.value != "" && sign.value != "")
	{	
			   var win= Ti.UI.createWindow({
   						title : name.value,
   						backgroundColor : '#fff',
   						url : 'mapp.js'
   							});
   							
						createDB();
   				Ti.App.navGroup.open(win);
   				
   				name.value = "";
   				sign.value = "";	
	}
	else
	{
		alert("Fyll i både projektnamn och signatur");
	}
});

 last.addEventListener('click', function(){
	 var win= Ti.UI.createWindow({
   	 title :'Välj projekt',
   	 backgroundColor : '#fff',
   	 url : 'pickproject.js'
    });	
    Ti.App.navGroup.open(win);
});