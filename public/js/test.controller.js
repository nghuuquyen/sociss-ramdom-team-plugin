var app = angular.module('testApp' , []);

app.controller('TestController' , function($scope, $timeout , $interval) {
  $scope.counter = 1;
  console.log($scope);

  $timeout(function oneTimeOut() {
      console.log("Hello world");
  },3000);

  $interval(function() {

    $scope.counter += 1;
  },2000);

});

app.controller('subController' , function ($scope , $interval) {
  $interval(function() {
    $scope.counter += 10;
  },1000);
});
