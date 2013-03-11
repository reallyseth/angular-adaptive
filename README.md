Adaptive for Angular
================

This module will dynamically include a view based on the width of the screen. You can set the breakpoints in the html.

Add it into your angular application by injecting `adaptive` into your controller. Then write your html like so:

    <div adapt="[ 540, 768 ]" view="partials/myView.html"></div>

In your partials folder, you then need files titled myView.html, myView_540.html, and myView_768.html. This will be swapped out dynamically depending on the width of the window. 