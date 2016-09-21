//Module Requirements 
var express = require('express'); 
	http = require('http'); 
	path = require("path"); 
	url = require('url'); 
	fs = require('fs'); 
	byline = require('byline'); 

//Create an Express application 
var app = express(); 
//Express router 
var router = express.Router(); 

//Create a server for app to listen to 
http.createServer(app).listen(process.env.PORT || 8080); 

//Middleware 
router.use(function(req, res, next){
	console.log(req.method, req.url); 
	next(); 
});

//Router paths 
router.get('/', function(req, res, next){
	console.log('hi gloria'); 
});

//read and parse csv file 
var sqftPerRoomArray = [];
var pricePerSqftArray = []; 
var pricePerRoomArray = [];  

function calculateRoomValues(){
	var fileContent = fs.readFileSync(path.join(__dirname + '/challenge_data.csv')); 
	var rentalInformationArray = fileContent.toString().split('\r\n'); 
	for(var i = 0; i < rentalInformationArray.length - 1; i++){
		//parse element to get each value 
		//price, numBedrooms, numBathrooms, sqft 
		var rentalInformation = rentalInformationArray[i]; 
		//console.log('rental info?' + rentalInformation);
		var rentalVaribles = rentalInformation.split(','); 
		//console.log(rentalVaribles);
		var price = rentalVaribles[0]; 
		var numBedrooms = rentalVaribles[1]; 
		var numBathrooms = rentalVaribles[2]; 
		var sqft = rentalVaribles[3]; 

		var sqftPerRoom = (sqft / (numBedrooms + numBathrooms)); 
		var pricePerSqft = (price / sqft); 
		var pricePerRoom = (pricePerSqft * sqftPerRoom); 

		sqftPerRoomArray.push(sqftPerRoom); 
		pricePerSqftArray.push(pricePerSqft); 
		pricePerRoomArray.push(pricePerRoom); 	
	}
}

calculateRoomValues();

function findMedians(){
	
}


 


//app.get 
app.get('/', router); 

