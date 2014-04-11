angular.module('adaptive.config', []).value('adaptive.config', {});

angular.module('adaptive', ['adaptive.config'])

  .directive('adapt', ['adaptive.config', '$window', function(adaptiveConfig, $window) {
      
      return {

	  replace: true,
	  transclude: true,
	  scope: { adapt: '@adapt', breakPoints: '@breakPoints' },
	  template: '<div><ng-include src=adapt></ng-include></div>', // containing div required to prevent multiple directives asking for transclusion on the same element
	  
	  link: function(scope, element, attrs) {

	      // get breakpoints from element attributes
	      var breakPoints = eval(attrs.breakPoints);

	      // if the breakpoints aren't defined in the attributes
	      if (typeof breakPoints === "undefined")
		  // copy the breakpoints from the global config
		  breakPoints = adaptiveConfig.breakPoints;

	      // sort from largest to smallest
	      breakPoints.sort(function(a,b){return b.width-a.width});

	      function setCurrentView() {
		  var viewName = attrs["adapt"];

		  // pull off the .html
		      viewName = viewName.substring(0, viewName.lastIndexOf('.'));

		      if (viewName.lastIndexOf('_') > viewName.lastIndexOf('/')) 
			  viewName = viewName.substring(0, viewName.lastIndexOf('_'));
		      
		      for (var x = 0; x < breakPoints.length; x++)
		      {
			  // if the window is wider than the break point, display that view
			  if ($window.innerWidth > breakPoints[x].width) {
			      attrs["adapt"] = viewName + "_" + breakPoints[x].postfix + ".html";
			      break;
			  }

			  // if the window is smaller than the smallest breakpoint
			  // display the default (mobile first) view
			  if ($window.innerWidth < breakPoints[breakPoints.length-1].width)
			      attrs["adapt"] = viewName + ".html";
		      }

		  // only change the scope variable if it needs to be updated
		  if (scope.adapt != attrs.adapt)
		      scope.adapt = attrs.adapt;;
	      }

	      setCurrentView();

	      // bind to the window width option
	      angular.element($window).bind('resize', function() {
		  scope.$apply(function() {
		      setCurrentView();
		  });
	      });
	  }
      }
}]);
