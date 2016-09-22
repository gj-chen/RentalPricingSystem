//Module Requirements 
var express = require('express'); 
	http = require('http'); 
	path = require("path"); 
	url = require('url'); 
	fs = require('fs'); 
	byline = require('byline'); 
	bodyParser = require('body-parser');
	ejs = require('ejs');


//Create an Express application 
var app = express();

//Uses bodyParser to support JSON encoded bodies 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Express router 
var router = express.Router(); 

//Create a server for app to listen to 
http.createServer(app).listen(process.env.PORT || 8080); 

//Middleware 
router.use(function(req, res, next){
	console.log(req.method, req.url); 
	next(); 
});

//Calculations
var pricePerSqftArray0 = []; 
var pricePerSqftArray1 = []; 
var pricePerSqftArray2 = []; 
var pricePerSqftArray3 = []; 
var pricePerSqftArray4 = []; 
var pricePerSqftArray5 = []; 
var pricePerSqftArrayMore = []; 

//arrays for house prices by # of bedrooms 
var priceByRoomSizeArray0 = []; 
var priceByRoomSizeArray1 = []; 
var priceByRoomSizeArray2 = []; 
var priceByRoomSizeArray3 = []; 
var priceByRoomSizeArray4 = []; 
var priceByRoomSizeArray5 = []; 
var priceByRoomSizeArrayMore = []; 

//array for sqft of houses by bedroom size 
var sqftByRoomSizeArray0 = [];
var sqftByRoomSizeArray1 = [];
var sqftByRoomSizeArray2 = [];
var sqftByRoomSizeArray3 = [];
var sqftByRoomSizeArray4 = [];
var sqftByRoomSizeArray5 = []; 
var sqftByRoomSizeArrayMore = [];

function checkRoomSizeAndCalculate(price, numBedrooms, numBathrooms, sqft){
	var pricePerSqft = 0; 
	if(numBedrooms == 0){
		//no bedrooms, only bathrooms
		//add to list of houses with this criteria
		pricePerSqft = (price / sqft); 
		pricePerSqftArray0.push(pricePerSqft);
		
		priceByRoomSizeArray0.push(price);
		sqftByRoomSizeArray0.push(sqft);  
	}else if(numBedrooms == 1){
		//house has 1 bedroom, any number of bathrooms
		pricePerSqft = (price / sqft); 
		pricePerSqftArray1.push(pricePerSqft);

		priceByRoomSizeArray1.push(price);
		sqftByRoomSizeArray1.push(sqft);
	}else if(numBedrooms == 2){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray2.push(pricePerSqft);

		priceByRoomSizeArray2.push(price);
		sqftByRoomSizeArray2.push(sqft);
	}else if(numBedrooms == 3){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray3.push(pricePerSqft);

		priceByRoomSizeArray3.push(price);
		sqftByRoomSizeArray3.push(sqft);
	}else if(numBedrooms == 4){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray4.push(pricePerSqft);

		priceByRoomSizeArray4.push(price);
		sqftByRoomSizeArray4.push(sqft);
	}else if(numBedrooms == 5){
		pricePerSqft = (price / sqft); 
		pricePerSqftArray5.push(pricePerSqft);

		priceByRoomSizeArray5.push(price);
		sqftByRoomSizeArray5.push(sqft);
	}else{
		//anything bigger than 5 rooms
		pricePerSqft = (price / sqft); 
		pricePerSqftArrayMore.push(pricePerSqft); 

		priceByRoomSizeArrayMore.push(price);
		sqftByRoomSizeArrayMore.push(sqft);
	}
}

function median(values){
	var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

function mean(values){
	var sum = 0;
	for( var i = 0; i < values.length; i++ ){
    	sum += parseInt(values[i], 10); 
    }
    return sum/values.length;
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

var medianPriceByRoomSize0 = 0; 
var medianPriceByRoomSize1 = 0;
var medianPriceByRoomSize2 = 0;
var medianPriceByRoomSize3 = 0;
var medianPriceByRoomSize4 = 0;
var medianPriceByRoomSize5 = 0;
var medianPriceByRoomSizeMore = 0;

var meanPriceByRoomSize0 = 0;
var meanPriceByRoomSize1 = 0;
var meanPriceByRoomSize2 = 0;
var meanPriceByRoomSize3 = 0;
var meanPriceByRoomSize4 = 0;
var meanPriceByRoomSize5 = 0;
var meanPriceByRoomSizeMore = 0;

var minPriceByRoomSize0 = 0; 
var minPriceByRoomSize1 = 0;
var minPriceByRoomSize2 = 0;
var minPriceByRoomSize3 = 0;
var minPriceByRoomSize4 = 0;
var minPriceByRoomSize5 = 0;
var minPriceByRoomSizeMore = 0;

var maxPriceByRoomSize0 = 0; 
var maxPriceByRoomSize1 = 0;
var maxPriceByRoomSize2 = 0;
var maxPriceByRoomSize3 = 0;
var maxPriceByRoomSize4 = 0;
var maxPriceByRoomSize5 = 0;
var maxPriceByRoomSizeMore = 0;

var medianSqftByRoomSize0 = 0;
var medianSqftByRoomSize1 = 0;
var medianSqftByRoomSize2 = 0; 
var medianSqftByRoomSize3 = 0;
var medianSqftByRoomSize4 = 0;
var medianSqftByRoomSize5 = 0;
var medianSqftByRoomSizeMore = 0;


function sortAndGetMedianMeanMinMax(){
	//so far we have all of the roomsizes and price per sqfts 
	//need to get the median of each to use as the standard 

	//sort each in ascending order
	pricePerSqftArray0.sort(function(a, b){return a-b});
	console.log(pricePerSqftArray0);
	pricePerSqftArray1.sort(function(a, b){return a-b});
	pricePerSqftArray2.sort(function(a, b){return a-b}); 
	pricePerSqftArray3.sort(function(a, b){return a-b}); 
	pricePerSqftArray4.sort(function(a, b){return a-b});
	pricePerSqftArray5.sort(function(a, b){return a-b}); 
	pricePerSqftArrayMore.sort(function(a, b){return a-b}); 

	medianPricePerSqft0 = median(pricePerSqftArray0);
	medianPricePerSqft1 = median(pricePerSqftArray1);
	medianPricePerSqft2 = median(pricePerSqftArray2);
	medianPricePerSqft3 = median(pricePerSqftArray3);
	medianPricePerSqft4 = median(pricePerSqftArray4);
	medianPricePerSqft5 = median(pricePerSqftArray5);
	medianPricePerSqftMore = median(pricePerSqftArrayMore);

	console.log('0 ' + medianPricePerSqft0);
	console.log('1 ' + medianPricePerSqft1);
	console.log('2 ' + medianPricePerSqft2);
	console.log('3 ' + medianPricePerSqft3);
	console.log('4 ' + medianPricePerSqft4);
	console.log('5 ' + medianPricePerSqft5);
	console.log('More ' + medianPricePerSqftMore);

	//Median by Price of # Bedrooms 
	priceByRoomSizeArray0.sort(function(a, b){return a-b}); 
	priceByRoomSizeArray1.sort(function(a, b){return a-b}); 
	priceByRoomSizeArray2.sort(function(a, b){return a-b}); 
	priceByRoomSizeArray3.sort(function(a, b){return a-b}); 
	priceByRoomSizeArray4.sort(function(a, b){return a-b}); 
	priceByRoomSizeArray5.sort(function(a, b){return a-b}); 
	priceByRoomSizeArrayMore.sort(function(a, b){return a-b}); 

	medianPriceByRoomSize0 = median(priceByRoomSizeArray0); 
	medianPriceByRoomSize1 = median(priceByRoomSizeArray1);
	medianPriceByRoomSize2 = median(priceByRoomSizeArray2);
	medianPriceByRoomSize3 = median(priceByRoomSizeArray3);
	medianPriceByRoomSize4 = median(priceByRoomSizeArray4);
	medianPriceByRoomSize5 = median(priceByRoomSizeArray5);
	medianPriceByRoomSizeMore = median(priceByRoomSizeArrayMore);

	//Average by Price of # Bedrooms
	meanPriceByRoomSize0 = mean(priceByRoomSizeArray0); 
	meanPriceByRoomSize1 = mean(priceByRoomSizeArray1);
	meanPriceByRoomSize2 = mean(priceByRoomSizeArray2);
	meanPriceByRoomSize3 = mean(priceByRoomSizeArray3);
	meanPriceByRoomSize4 = mean(priceByRoomSizeArray4);
	meanPriceByRoomSize5 = mean(priceByRoomSizeArray5);
	meanPriceByRoomSizeMore = mean(priceByRoomSizeArrayMore);

	minPriceByRoomSize0 = priceByRoomSizeArray0[0]; 
	minPriceByRoomSize1 = priceByRoomSizeArray1[0];
	minPriceByRoomSize2 = priceByRoomSizeArray2[0];
	minPriceByRoomSize3 = priceByRoomSizeArray3[0];
	minPriceByRoomSize4 = priceByRoomSizeArray4[0];
	minPriceByRoomSize5 = priceByRoomSizeArray5[0];
	minPriceByRoomSizeMore = priceByRoomSizeArrayMore[0];

	maxPriceByRoomSize0 = priceByRoomSizeArray0[priceByRoomSizeArray0.length - 1]; 
	maxPriceByRoomSize1 = priceByRoomSizeArray1[priceByRoomSizeArray1.length - 1];
	maxPriceByRoomSize2 = priceByRoomSizeArray2[priceByRoomSizeArray2.length - 1];
	maxPriceByRoomSize3 = priceByRoomSizeArray3[priceByRoomSizeArray3.length - 1];
	maxPriceByRoomSize4 = priceByRoomSizeArray4[priceByRoomSizeArray4.length - 1];
	maxPriceByRoomSize5 = priceByRoomSizeArray5[priceByRoomSizeArray5.length - 1];
	maxPriceByRoomSizeMore = priceByRoomSizeArrayMore[priceByRoomSizeArrayMore.length - 1];


	sqftByRoomSizeArray0.sort(function(a, b){return a-b});
	sqftByRoomSizeArray1.sort(function(a, b){return a-b});
	sqftByRoomSizeArray2.sort(function(a, b){return a-b});
	sqftByRoomSizeArray3.sort(function(a, b){return a-b});
	sqftByRoomSizeArray4.sort(function(a, b){return a-b});
	sqftByRoomSizeArray5.sort(function(a, b){return a-b});
	sqftByRoomSizeArrayMore.sort(function(a, b){return a-b});
	//get medians 
	medianSqftByRoomSize0 = median(sqftByRoomSizeArray0);
	medianSqftByRoomSize1 = median(sqftByRoomSizeArray1);
	medianSqftByRoomSize2 = median(sqftByRoomSizeArray2);
	medianSqftByRoomSize3 = median(sqftByRoomSizeArray3);
	medianSqftByRoomSize4 = median(sqftByRoomSizeArray4);
	medianSqftByRoomSize5 = median(sqftByRoomSizeArray5);
	medianSqftByRoomSizeMore = median(sqftByRoomSizeArrayMore);

}

parseCSV(); 
sortAndGetMedianMeanMinMax();

var rentalCost = 0; 
function calculatePricePerSqft(numBedrooms, sqft, numBathrooms){
	if(numBedrooms == 0){
		//calculate total cost = price_per_sqft * sqft of house 
		rentalCost = medianPricePerSqft0 * parseInt(sqft); 

		//will append other values here and parse on front end after by commas 
		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+ sqft+ ',' + medianPriceByRoomSize0+','
		+meanPriceByRoomSize0+','+minPriceByRoomSize0+','+maxPriceByRoomSize0 + ',' +medianSqftByRoomSize0;
	}else if(numBedrooms == 1){
		rentalCost = medianPricePerSqft1 * parseInt(sqft);

		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+ sqft+ ','+medianPriceByRoomSize1+','
		+meanPriceByRoomSize1+','+minPriceByRoomSize1+','+maxPriceByRoomSize1+ ',' +medianSqftByRoomSize1;
	}else if(numBedrooms == 2){
		rentalCost = medianPricePerSqft2 * parseInt(sqft);

		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+ sqft+ ','+medianPriceByRoomSize2+','
		+meanPriceByRoomSize2+','+minPriceByRoomSize2+','+maxPriceByRoomSize2+ ',' +medianSqftByRoomSize2;
	}else if(numBedrooms == 3){
		rentalCost = medianPricePerSqft3 * parseInt(sqft);

		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+sqft+ ',' + medianPriceByRoomSize3+','
		+meanPriceByRoomSize3+','+minPriceByRoomSize3+','+maxPriceByRoomSize3+ ',' +medianSqftByRoomSize3;
	}else if(numBedrooms == 4){
		rentalCost = medianPricePerSqft4 * parseInt(sqft);

		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+ sqft+ ',' + medianPriceByRoomSize4+','
		+meanPriceByRoomSize4+','+minPriceByRoomSize4+','+maxPriceByRoomSize4+ ',' +medianSqftByRoomSize4;
	}else if(numBedrooms == 5){
		rentalCost = medianPricePerSqft5 * parseInt(sqft);

		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+ sqft+ ',' + medianPriceByRoomSize5+','
		+meanPriceByRoomSize5+','+minPriceByRoomSize5+','+maxPriceByRoomSize5+ ',' +medianSqftByRoomSize5;
	}else{
		//more than 5 bedrooms 
		rentalCost = medianPricePerSqftMore * parseInt(sqft);

		rentalCost = rentalCost + ','+numBedrooms+','+numBathrooms+','+ sqft+ ',' + medianPriceByRoomSizeMore+','
		+meanPriceByRoomSizeMore+','+minPriceByRoomSizeMore+','+maxPriceByRoomSizeMore+ ',' +medianSqftByRoomSizeMore;
	}
}


//Router paths 
//first page 
router.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname + '/index.html')); 
});

//pass in variables 
router.post('/getVariablesAndCalculate', function(req, res, next){ 
	var numBedrooms = JSON.parse(req.param('numBedrooms'));
	var numBathrooms = JSON.parse(req.param('numBathrooms')); 
	var sqft = JSON.parse(req.param('sqft')); 
	
	//check what the bedroom size is to determine price per sqft 
	calculatePricePerSqft(numBedrooms, sqft, numBathrooms); 
	//rental cost is now calculated 
	console.log(rentalCost);
	res.json(rentalCost);
}); 


//app.get 
app.get('/', router);
app.post('/getVariablesAndCalculate', router); 

