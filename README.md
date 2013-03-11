Adaptive for Angular
================

This module will dynamically include a view based on the width of the screen. You can set the breakpoints in the html like so:

    <div adapt="[ 540, 768 ]" view="partials/myView.html"></div>

and the view will be swapped out for width specific views (myView_540.html or myView_768.html depending on the width of the screen);

## Setup

Include the js script. Then add it into your angular application by injecting `adaptive` into your controller. For example:

    angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'adaptive'])

In your partials folder, you then need a view file for each breakpoint, plus the default. This module takes a mobile first approach, so the views are only activated when the window width is bigger than that breakpoint.

And that's it! The module supports as many breakpoints as you want to give it. Feel free to use, fork, and prosper.

