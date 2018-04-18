var App = angular.module('App');

App.controller("linkLists", ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('linkListsController loaded....');
    $scope.isAdmin = true;
    $scope.getLinks = function(){
        $http.get('/api/airPlane').then(function(response){
            $scope.Links = response.data;
            console.log($scope.Links);
        });
    };
    
    $scope.hitCount = function(id){
        $http.get('/api/airPlane/'+id).then(function(response){
           	response.data.redirect = response.data.redirect + 1;
        	$http.put('/api/airPlane/'+id, response.data).then(function(response){
   				$scope.getLinks();
        	});
        });
    };

    $scope.deleteLink = function(id){
        $http.delete('/api/airPlane/'+id).then(function(){
            $scope.getLists(); 
        });
    };
}]);


App.controller("createLinkController", ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('createLinkController loaded....');
    $scope.createLink = function(){
        $http.post('/api/airPlane', $scope.link).then(function(response){
   			window.location.href = '#!/airplane';
        });
    };
}]);


App.controller("updateLinkController", ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('updateLinkController loaded....');

    $scope.getLink = function(){
    	var id = $routeParams.id;
    	$http.get('/api/airPlane/'+id).then(function(response){
    		$scope.link = response.data;
    		console.log($scope.link);
    	});
    };

    $scope.updateLink = function(){
    	var id = $routeParams.id;
        $http.put('/api/airPlane/'+id, $scope.link).then(function(response){
   			window.location.href = '#!/airplane';
        });
    };
}]);


App.controller("userController", ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('userController loaded....');
}]);


App.controller("settingsController", ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('settingsController loaded....');
}]);