var rentalSystem = angular.module("rentalSystem", []); 
rentalSystem.controller('mainController', function($scope, $http){
	$scope.houseName = ''; 
	$scope.numBedrooms = '';
	$scope.numBathrooms = ''; 
	$scope.sqft = ''; 

	$scope.getCall = function(){
		$http({
			method: 'GET',
			url: '/getVariablesAndCalculate'
		}).then(function successCallBack(data){
			$scope.rentalCost = data;
			console.log('the rental cost is: ' + data); 
		}, function errorCallBack(data){
			console.log('An error has occurred during return'); 
		});
	};	
}); 


