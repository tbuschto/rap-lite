rap-lite
========

Experimenting with a lightweight rap client based on jquery and backbone.js

Currently supported are Shell, Composite, Label, Button and List, all very limited

I test it with RAP master/nightly build (11.04.2013), it may or may not work with the RAP 2.0 release.
It works best in Chrome. There will be no animations in IE. 
IE8 will not have gradients. IE7 is currently not supported.

After starting the launch config (RAP Lite.launch), the follwing URLs can be visited:
- http://127.0.0.1:8585/full
The demo application executed with the default WebClient
- http://127.0.0.1:8585/lite
The demo application executed with the RAP Lite client
- http://127.0.0.1:8585/lite?app=native
The demo application using native HTML buttons instead of div's. 
- http://127.0.0.1:8585/lite/website.html
The demo application embedded into a static html site. 
Notice how opening a new Shell ("Needs more Space"/"Say Hello") changes the text flow.

The demo application itself currently has some bugs, which is why there might be a error popup at times. 
Those are not bugs of the client.
