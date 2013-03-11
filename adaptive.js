angular.module('adaptive', [])

  .directive('adapt', function($window) {
      
      return {

	  replace: true,
	  transclude: true,
	  scope: { view: '@view' },
	  template: '<ng-include src=view></ng-include>',

	  link: function(scope, element, attrs) {

	      // get an array of break points
	      breakPoints = eval(attrs["adapt"]);

	      // sort from largest to smallest
	      breakPoints.sort(function(a,b){return b-a});	     
	      
	      function setCurrentView() {
		  var viewName = attrs["view"];

		  // pull off the .html
		      viewName = viewName.substring(0, viewName.lastIndexOf('.'));

		      if (viewName.lastIndexOf('_') > viewName.lastIndexOf('/')) 
			  viewName = viewName.substring(0, viewName.lastIndexOf('_'));
		      
		      for (var x = 0; x < breakPoints.length; x++)
		      {
			  // if the window is wider than the break point, display that view
			  if ($window.innerWidth > breakPoints[x]) {
			      attrs["view"] = viewName + "_" + breakPoints[x] + ".html";
			      break;
			  }

			  // if the window is smaller than the smallest breakpoint
			  // display the default (mobile first) view
			  if ($window.innerWidth < breakPoints[breakPoints.length-1])
			      attrs["view"] = viewName + ".html";
		      }
		  
		  scope.view = attrs["view"];
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
});
