/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function wordRegexp(words) {
    return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
  };

  var keywordArray = [
    "package", "message", "import", "syntax",
    "required", "optional", "repeated", "reserved", "default", "extensions", "packed",
    "bool", "bytes", "double", "enum", "float", "string",
    "int32", "int64", "uint32", "uint64", "sint32", "sint64", "fixed32", "fixed64", "sfixed32", "sfixed64",
    "option", "service", "rpc", "returns"
  ];
  var keywords = wordRegexp(keywordArray);

  CodeMirror.registerHelper("hintWords", "protobuf", keywordArray);

  var identifiers = new RegExp("^[_A-Za-z\xa1-\uffff][_A-Za-z0-9\xa1-\uffff]*");

  function tokenBase(stream) {
    // whitespaces
    if (stream.eatSpace()) return null;

    // Handle one line Comments
    if (stream.match("//")) {
      stream.skipToEnd();
      return "comment";
    }

    // Handle Number Literals
    if (stream.match(/^[0-9\.+-]/, false)) {
      if (stream.match(/^[+-]?0x[0-9a-fA-F]+/))
        return "number";
      if (stream.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/))
        return "number";
      if (stream.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))
        return "number";
    }

    // Handle Strings
    if (stream.match(/^"([^"]|(""))*"/)) { return "string"; }
    if (stream.match(/^'([^']|(''))*'/)) { return "string"; }

    // Handle words
    if (stream.match(keywords)) { return "keyword"; }
    if (stream.match(identifiers)) { return "variable"; } ;

    // Handle non-detected items
    stream.next();
    return null;
  };

  CodeMirror.defineMode("protobuf", function() {
    return {token: tokenBase};
  });

  CodeMirror.defineMIME("text/x-protobuf", "protobuf");
});
