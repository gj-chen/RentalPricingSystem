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

var pricePerSqftArray0 = []; 
var pricePerSqftArray1 = []; 
var pricePerSqftArray2 = []; 
var pricePerSqftArray3 = []; 
var pricePerSqftArray4 = []; 
var pricePerSqftArray5 = []; 
var pricePerSqftArrayMore = []; 

function checkRoomSizeAndCalculate(price, numBedrooms, numBathrooms, sqft){
	var pricePerSqft = 0; 
	if(numBedrooms == 0){
		//no bedrooms, only bathrooms
		//add to list of houses with this criteria
		pricePerSqft = (price / sqft); 
		pricePerSqftArray0.push(pricePerSqft);
		//will get the median later for pricePerSqft of each room type 
	}else if(numBedrooms == 1){
		//house has 1 bedroom, any number of bathrooms
		pricePerSqft = (price / sqft); 
		pricePerSqftArray1.push(pricePerSqft);
	}else if(numBedrooms == 2){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray2.push(pricePerSqft);
	}else if(numBedrooms == 3){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray3.push(pricePerSqft);
	}else if(numBedrooms == 4){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray4.push(pricePerSqft);
	}else if(numBedrooms == 5){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray5.push(pricePerSqft);
	}else{
		//anything bigger than 5 rooms
		pricePerSqft = (price / sqft); 
		pricePerSqftArrayMore.push(pricePerSqft); 
	}
}

function median(values){
	var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

var medianPricePerSqft0 = 0; 
var medianPricePerSqft1 = 0; 
var medianPricePerSqft2 = 0; 
var medianPricePerSqft3 = 0; 
var medianPricePerSqft4 = 0;
var medianPricePerSqft5 = 0; 
var medianPricePerSqftMore = 0;


//read and parse csv file 
function parseCSV(){
	var fileContent = fs.readFileSync(path.join(__dirname + '/challenge_data.csv')); 
	var rentalInformationArray = fileContent.toString().split('\r\n'); 
	for(var i = 0; i < rentalInformationArray.length - 1; i++){
		//parse element to get each value 
		//price, numBedrooms, numBathrooms, sqft 
		var rentalInformation = rentalInformationArray[i]; 
		var rentalVaribles = rentalInformation.split(',');

		var price = rentalVaribles[0]; 
		var numBedrooms = rentalVaribles[1]; 
		var numBathrooms = rentalVaribles[2]; 
		var sqft = rentalVaribles[3]; 

		//pass in variables to check which # of rooms 
		checkRoomSizeAndCalculate(price, numBedrooms, numBathrooms, sqft); 
	}	
}

parseCSV();

function sortAndGetMedians(){
	//so far we have all of the roomsizes and price per sqfts 
	//need to get the median of each to use as the standard 

	//sort each in ascending order
	pricePerSqftArray0.sort();
	pricePerSqftArray1.sort();
	pricePerSqftArray2.sort(); 
	pricePerSqftArray3.sort(); 
	pricePerSqftArray4.sort();
	pricePerSqftArray5.sort(); 
	pricePerSqftArrayMore.sort(); 

	var total = parseInt(pricePerSqftArray0.length) + parseInt(pricePerSqftArray1.length) + parseInt(pricePerSqftArray2.length)
		+ parseInt(pricePerSqftArray3.length) + parseInt(pricePerSqftArray4.length) + parseInt(pricePerSqftArray5.length) + parseInt(pricePerSqftArrayMore.length);
	console.log('length total: ' + total);

	medianPricePerSqft0 = median(pricePerSqftArray0);
	medianPricePerSqft1 = median(pricePerSqftArray1);
	medianPricePerSqft2 = median(pricePerSqftArray2);
	medianPricePerSqft3 = median(pricePerSqftArray3);
	medianPricePerSqft4 = median(pricePerSqftArray4);
	medianPricePerSqft5 = median(pricePerSqftArray5);
	medianPricePerSqftMore = median(pricePerSqftArrayMore);

	console.log(medianPricePerSqft1);
}

sortAndGetMedians();

//now that we have our standard (medians) to use for calculations, get calculations from user to calculate 


//app.get 
app.get('/', router); 

