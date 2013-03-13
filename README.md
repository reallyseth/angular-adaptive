Adaptive for Angular
================

This module will dynamically include a view based on the width of the screen. You can set the breakpoints in the html like so:

    <div adapt="partials/myView.html" break-points='[{ "postfix": "m", "width": 540}, { "postfix": "d", "width": 768}]'></div>

and the view will be swapped out for width specific views (myView_m.html or myView_d.html depending on the width of the screen);

## Setup

Include the js script. Then add it into your angular application by injecting `adaptive` into your controller. For example:

    angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'adaptive'])

In your partials folder, you then need a view file for each breakpoint, plus the default. This module takes a mobile first approach, so the views are only activated when the window width is bigger than that breakpoint.

You can also configure breakpoints at a global level and leave out the `break-points` attribute on the item. Configuration looks like this:

    var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'adaptive']);
    myApp.value('adaptive.config', {
        breakPoints: [{ "postfix": "m", "width": 540}, { "postfix": "d", "width": 768}]
    });

And that's it! The module supports as many breakpoints as you want to give it. Feel free to use, fork, and prosper.

