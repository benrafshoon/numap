var editor = angular.module("editor", []);

editor.controller("ShuttleRouteController", function($scope, $http) {
	$http.get("/data/shuttleroute").success(function(data) {
		console.log(data);
		$scope.shuttleRoutes = data;
	});
});
