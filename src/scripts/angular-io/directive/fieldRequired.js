// <select ng-size="">
angular.module('app')
.directive('required', ['$compile', function($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller) {

			var button = $compile('<i class="forms-required">&nbsp;&nbsp;</i>')(scope);
			element.after(button);

		}
	};
}]);
