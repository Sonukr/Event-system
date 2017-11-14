var app = angular.module('DemoEventApp', ['ngRoute']);


// defining main controller
app.controller('MainCtrl', function($scope, $http, $location, $window) {

	$scope.select_all = false;
	$scope.selected = {
		'obj' : {},
		'events' : {}
	}

	$scope.$watch('selected.obj', function(){
  	var events = [];
    angular.forEach($scope.selected.obj, function(value, key){
    		if(value){
        	events.push(key);
        }
    });
    $scope.selected.events = events;
 },true);

 $scope.checkAll = function() {
	 angular.forEach($scope.events, function(event) {
		 $scope.selected.obj[event._id] = !$scope.select_all;
	 });
 };

  // define deafult order of event by date by using a scope "order"
  $scope.order = "startdate";

  // send the request to api/ DB to get event from Events api
  $http.get('/api/events').success(function(res) {
    $scope.events = res;
  });
	// For get detail by _id to explore event
  $scope.explore = {};
  $scope.exploreEvent = function(eventId){
    console.log(eventId);
    $http.get('/api/events/' +eventId).success(function(res){
      console.log(res);
      $scope.explore = res;
    });
	};

	// create a new event
	$scope.newEvent  = function (data) {
		$http.post('/api/events', data).success(function (res) {
			console.log(res);
				if(res){
					$window.location.href = '/';
				}
		})
	}

	// eidt modal
	$scope.editEvent = function(data){
		console.log(data);
		$scope.data = data;
	}

	//update events
	$scope.updateEvent = function (data){
		$http.put('/api/events/' + data._id, data).success(function(res){
			console.log(res)
				if(res){
					$window.location.href = '/';
				}
		});

	}


// For get detail by _id to delete event
  $scope.deleteEvent = function(eventId) {
		var sure = confirm('Are you sure ? ');
		if (sure){
			$http.delete('/api/events/' + eventId).success(function() {
				$scope.events = _.reject($scope.events, function(el) { return el._id == eventId; });
			});
		}


  };

	//delete multiple
	$scope.deleteMutliple = function(data){
		console.log(data)
	}

});
