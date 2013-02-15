//angular.module('io.controller.onboard', [])
//.controller('OnboardCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
OnboardCtrl.$inject = ['$scope', '$cookies', '$http', '$routeParams'];
function OnboardCtrl($scope, $cookies, $http, $routeParams) {
	console.log('OnboardCtrl ('+$scope.$id+') page:'+$routeParams.page);
	$scope.errors = {};

	if (!$routeParams.page || $routeParams.page == 'start') $scope.href('#/onboard/'+$rootScope.settings.onboard.start);
	$scope.page_url = 'view/onboard/'+encodeURIComponent($routeParams.page)+'.html';

	$scope.BuildProgressTracker = function(page, action) {
		console.log('BuildProgressTracker('+page+', '+action+')');
		var elements = dom$('#progress_tracker').getElementsByTagName("a");
		var uri = $scope.uri();

		var after = false;	// apple after class
		for (var i = 0, l = elements.length; i < l; i++ ) {
			elements[ i ].className = '';
			elements[ i ].firstChild.innerHTML = i;	// badge value

		    if (elements[ i ].href.indexOf('#/onboard/'+page) !== -1) {	// current page
		    	if (action === 'skip') {	// go to next page
			    	if (i+1 < l) $scope.href(elements[ i+1 ].href);
			    	else {	// onboard complete - update user_level if not done after subscribe
			    		$http.get('user/onboard_done')
			    			.success(function(data) {
			    				console.log('BuildProgressTracker.get.success');
			    				$rootScope.updateSession(function(){
			    					$scope.href('#/'+($cookies.redirect ? $cookies.redirect : $rootScope.settings.dashboard));
			    				});
			    			})
							.error(function() {
								console.log('BuildProgressTracker.get.error');
								$rootScope.http_error();
							});
			    	}
		    	}
			    elements[ i ].className = 'current';
			    after = true;
		    } else if (after) {
		    	elements[ i ].href = null;
		    	elements[ i ].className = 'after';
		    }
		}
	}


	//-- Buttons --//
	$scope.button = {};
	$scope.button.skip = function() { $scope.href($scope.uri()+'/skip'); };
	//-- End Buttons --//

	$scope.require_signin(function() {
		$scope.BuildProgressTracker($routeParams.page, $routeParams.action);
	});
}
//}]);
