/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import './codemirror/import.js';
import './css/px-code-editor-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
Polymer({
  _template: html`
    <style include="px-code-editor-styles"></style>
    <div id="editorContainer"></div>
`,

  is: 'px-code-editor',

  properties: {
    /**
     * Set to the programming language the code editor `value` will be
     * written in. Choose from "javascript", "text/html", or "text/css".
     */
    mode: {
      type: String,
      observer: '_modeChanged'
    },
    /**
     * Set to update the code in the editor. Listen for updates to be
     * notified when the user changes the code in the editor.
     */
    value: {
      type: String,
      observer: '_valueChanged',
      notify: true
    },
    /**
     * Reference to the CodeMirror editor instance that is controlling
     * the code editor. See the [CodeMirror](http://codemirror.net/) site for
     * more information on the settings you can change on this instance.
     */
    editor: {
      type: Object,
      readOnly: true,
      notify: true
    }
  },

  _valueChanged(value) {
    if (typeof value === 'string') {
      if (!this.editor) {
        this._initializeEditor();
        return;
      }
      if (this.editor.getValue() !== value) {
        this.editor.setValue(value);
        this._refresh();
      }
    }
  },

  _modeChanged(mode) {
    if (typeof mode === 'string') {
      if (!this.editor) {
        this._initializeEditor();
      } else {
        this.editor.setOption('mode', mode);
      }
    }
  },

  _initializeEditor() {
    if (!this.editor && typeof this.value === 'string' && typeof this.mode === 'string') {
      this.scopeSubtree(this.$.editorContainer, true);
      let editor = CodeMirror(this.$.editorContainer, {
        mode: this.mode,
        value: this.value,
        theme: 'predix',
        lineWrapping: false,
        lineNumbers: false /* Line numbers sizing does not work in Shady DOM */
      });
      this._setEditor(editor);
      editor.on('changes', this._onEditorChanges.bind(this));
      this._refresh();
    }
  },

  _refresh() {
    // `refresh()` the CodeMirror instance after initial render to ensure
    // the text is visible. See issues #1 and #3.
    afterNextRender(this, () => {
      this.editor.refresh();
    });
  },

  _onEditorChanges(e) {
    this.debounce('handle-editor-changes', () => {
      const value = this.editor.getValue();
      this.fire('px-code-editor-updated', {value});
      this.value = value;
    }, 20);
  }
});
