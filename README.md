# px-code-editor

## Overview

`Px-code-ediot` is a Predix UI component which provides a rich, full-featured editor that can be embedded as a webcomponent and controlled through a simple attribute and event based API.

Use it to provide an embedded code editor to users for editing JavaScript, HTML, CSS or other common languages. The editor is a wrapper around the open-source Ace Editor project.

#### Usage

Pass code in to the editor by configuring how you want it to appear then setting
the `content` attribute (or data-binding on it) with the stringified code.

Example:

```
<px-code-editor
    language="javascript"
    content="var array = ['firstItem', 'secondItem'];">
</px-code-editor>
```

#### Watching for changes

The editor document will be populated by the `content` attribute, but changes to the document will not be data-bound out on the `content` attribute by default.

To listen for and handle changes to the editor content, add a listener to the `px-code-editor` instance (see documentation for the `px-code-editor-content-changed` in the component demo's API section).

Example:

```
<px-code-editor ...></px-code-editor>
<script type="text/javascript">
  var codeEditor = document.querySelector('px-code-editor');
  codeEditor.addEventListener('px-code-editor-content-changed', function(evt) {
    var newEditorContent = evt.detail.content;
    // ... handle the change here ...
  });
</script>
```

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-code-editor --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-code-editor/px-code-editor.html"/>
```

Finally, use the component in your application:

```
<px-code-editor
    language="javascript"
    enable-beautify
    content="var array = ['firstItem', 'secondItem'];">
</px-code-editor>
```

<br />
<hr />

## Documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-code-editor).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-code-editor/issues) to submit any bugs you might find.
