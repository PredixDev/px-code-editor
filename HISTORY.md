v3.0.0
==================
* Removes dynamic loading of beautify
* Removes HTML beautify, only beautifies JavaScript
* Removes `enableBeautify` property, beautify is loaded when its needed

v2.0.1
==================
* unique demo name and runtime theming

v2.0.0
==================
* updated dependencies for design refresh

v1.1.5
==================
* Fix JavaScript formatting and IIFE formatting bugs that throw exceptions in IE11

v1.1.4
==================
* Inject styles loaded by ace library into the shadow root to ensure they take effect in Shadow DOM
* Load beautify extensions with script tags that check for existence on the window to avoid conflicts/wasted effort. Initialize beautify by listening for an event on the window. This is necessary because they were previously loaded with link tags which do not work inside a Shadow DOM shadow root.

v1.1.3
==================
* Add a `flex-to-size` option for resizing to fit parent

v1.1.2
==================
* Add max number of retries for checking parent container size to avoid an infinite loop

v1.1.1
==================
* Remove errant text from template

v1.1.0
==================
* Add HTML beautify option

v1.0.2
==================
* Change default `Save` and `Cancel` button text

v1.0.1
==================
* Retry loading beautify to ensure it succeeds

v1.0.0
==================
* Initial release with editor features
