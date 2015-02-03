var app = angular.module('DemoEventApp', ['ngRoute', 'UserApp']);

app.run(function(user) {
	user.init({ appId: '53dcb68044eaf' });
	
});
  app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {templateUrl: 'views/login.html', login: true});
	$routeProvider.when('/signup', {templateUrl: 'views/signup.html', public: true});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

// defining main controller
app.controller('MainCtrl', function($scope, $http, $location) {

  // define deafult order of event by date by using a scope "order" 
  $scope.order = "startdate";

  // send the request to api/ DB to get event from Events api
  $http.get('/api/events').success(function(res) {
    $scope.events = res;                           // if success , set value as a events scope
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
// For get detail by _id to delete event
  $scope.deleteEvent = function(eventId) {
    console.log(eventId);
    $http.delete('/api/events/' + eventId).success(function() {
      $scope.events = _.reject($scope.events, function(el) { return el._id == eventId; });
    });
  };

});   