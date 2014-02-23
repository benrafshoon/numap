var editor = angular.module("editor", ["ngRoute"]);

editor.controller("TopLevelNavigationController", function($scope) {
	$scope.items = [
	{
		name: "Shuttle Routes",
		url: "#/shuttleRoute",
	},
	{
		name: "Shuttle Subroutes",
		url: "#/shuttleSubroute"
	},
	{
		name: "Shuttle Stops",
		url: "#/shuttleStop"
	}];
	
	$scope.selectTopLevelNavItem = function(item) {
		if(!$scope.selectedTopLevelNavItem) {
			$scope.selectedTopLevelNavItem = item;
			item.selected = true;
		} else {
			$scope.selectedTopLevelNavItem.selected = false;
			item.selected = false;
			
			$scope.selectedTopLevelNavItem = item;
			item.selected = true;
		}
	};
		
});

editor.controller("ShuttleRouteController", function($scope, $http) {
	$http.get("/data/shuttleroute").success(function(data) {
		console.log(data);
		$scope.shuttleRoutes = data;
		
		
	});
});


editor.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/shuttleRoute", {
		templateUrl: "/editor/shuttleRoute", 
		controller: "ShuttleRouteController"
	});
}]);