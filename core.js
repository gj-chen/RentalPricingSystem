var rentalSystem = angular.module('rentalSystem', []); 

function mainController($scope, $http){
	$scope.formHouseName; 
	$scope.formNumBedrooms; 
	$scope.formNumBathrooms; 
	$scope.formSqft; 

	//landing on page - get rental computation and show computation 
	$http.get('/getVariablesAndCalculate')
		.success(function(data){
			$scope.rentalCost = data;
			console.log('the rental cost is: ' + data); 
		})
		.error(function(data){
			console.log('An error has occurred during GET'); 
		}); 

	$scope.calculateRentalCost = function(){
		console.log('into here');
		$http.post('/getVariablesAndCalculate')
			.success(function(data){
				$scope.formHouseName = ''; 
				$scope.formNumBedrooms = ''; 
				$scope.formNumBathrooms = ''; 
				$scope.formSqft = '';
				
				$scope.rentalCost = data; 
				console.log(data); 
			})
			.error(function(data){
				console.log('An error has occurred during POST'); 	
			}); 
	}
}