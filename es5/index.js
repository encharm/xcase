'use strict';

var algorithms = {};

function isLower(char) {
  return char >= 0x61 /* 'a' */ && char <= 0x7a /* 'z' */;
}

function isUpper(char) {
  return char >= 0x41 /* 'A' */ && char <= 0x5a /* 'Z' */;
}

function isDigit(char) {
  return char >= 0x30 /* '0' */ && char <= 0x39 /* '9' */;
}

function toUpper(char) {
  return char - 0x20;
}

function toUpperSafe(char) {
  if (isLower(char)) {
    return char - 0x20;
  }
  return char;
}

function toLower(char) {
  return char + 0x20;
}

algorithms.camelize = function (str) {
  var firstChar = str.charCodeAt(0);
  if (isDigit(firstChar) || firstChar == 0x2d /* '-' */) {
      return str;
    }
  var out = [];
  var changed = false;
  if (isUpper(firstChar)) {
    changed = true;
    out.push(toLower(firstChar));
  } else {
    out.push(firstChar);
  }

  var length = str.length;
  for (var i = 1; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (c === 0x5f /* '_' */ || c === 0x20 /* ' ' */ || c == 0x2d /* '-' */) {
        changed = true;
        c = str.charCodeAt(++i);
        if (isNaN(c)) {
          return str;
        }
        out.push(toUpperSafe(c));
      } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
};

algorithms.decamelize = function (str, separator) {
  var firstChar = str.charCodeAt(0);
  var separatorChar = (separator || '_').charCodeAt(0);
  if (!isLower(firstChar)) {
    return str;
  }
  var length = str.length;
  var changed = false;
  var out = [];
  for (var i = 0; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (isUpper(c)) {
      out.push(separatorChar);
      out.push(toLower(c));
      changed = true;
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
};

algorithms.pascalize = function (str) {
  var firstChar = str.charCodeAt(0);
  if (isDigit(firstChar) || firstChar == 0x2d /* '-' */) {
      return str;
    }
  var length = str.length;
  var changed = false;
  var out = [];
  for (var i = 0; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (c === 0x5f /* '_' */ || c === 0x20 /* ' ' */ || c == 0x2d /* '-' */) {
        changed = true;
        c = str.charCodeAt(++i);
        if (isNaN(c)) {
          return str;
        }
        out.push(toUpperSafe(c));
      } else if (i === 0 && isLower(c)) {
      changed = true;
      out.push(toUpper(c));
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
};

algorithms.depascalize = function (str, separator) {
  var firstChar = str.charCodeAt(0);
  var separatorChar = (separator || '_').charCodeAt(0);
  if (!isUpper(firstChar)) {
    return str;
  }
  var length = str.length;
  var changed = false;
  var out = [];
  for (var i = 0; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (isUpper(c)) {
      if (i > 0) {
        out.push(separatorChar);
      }
      out.push(toLower(c));
      changed = true;
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
};

module.exports = require('./main')(algorithms);