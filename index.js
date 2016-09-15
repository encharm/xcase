'use strict';
let algorithms = {};

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
  if(isLower((char))) {
    return char - 0x20;
  }
  return char;
}

function toLower(char) {
  return char + 0x20;
}

algorithms.camelize = function(str) {
  let firstChar = str.charCodeAt(0);
  if(isDigit(firstChar) || firstChar == 0x2d /* '-' */) {
    return str;
  }
  let length = str.length;
  let changed = false;
  let out = [];
  for(let i = 0; i < length; ++i) {
    let c = str.charCodeAt(i);
    if(c === 0x5f /* '_' */ || c === 0x20 /* ' ' */ || c == 0x2d /* '-' */ ) {
      changed = true;
      c = str.charCodeAt(++i);
      if(isNaN(c)) {
        return str;
      }
      out.push(toUpperSafe(c))
    } else if(i === 0 && isUpper(c)) {
      changed = true;
      out.push(toLower(c));
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
};

algorithms.decamelize = function(str, separator) {
  let firstChar = str.charCodeAt(0);
  let separatorChar = (separator || '_').charCodeAt(0);
  if(!isLower(firstChar)) {
    return str;
  }
  let length = str.length;
  let changed = false;
  let out = [];
  for(let i = 0; i < length; ++i) {
    let c = str.charCodeAt(i);
    if(isUpper(c)) {
      out.push(separatorChar);
      out.push(toLower(c));
      changed = true;
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
}

algorithms.pascalize = function(str) {
  let firstChar = str.charCodeAt(0);
  if(isDigit(firstChar) || firstChar == 0x2d /* '-' */) {
    return str;
  }
  let length = str.length;
  let changed = false;
  let out = [];
  for(let i = 0; i < length; ++i) {
    let c = str.charCodeAt(i);
    if(c === 0x5f /* '_' */ || c === 0x20 /* ' ' */ || c == 0x2d /* '-' */ ) {
      changed = true;
      c = str.charCodeAt(++i);
      if(isNaN(c)) {
        return str;
      }
      out.push(toUpperSafe(c))
    } else if(i === 0 && isLower(c)) {
      changed = true;
      out.push(toUpper(c));
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
};

algorithms.depascalize = function(str, separator) {
  let firstChar = str.charCodeAt(0);
  let separatorChar = (separator||'_').charCodeAt(0);
  if(!isUpper(firstChar)) {
    return str;
  }
  let length = str.length;
  let changed = false;
  let out = [];
  for(let i = 0; i < length; ++i) {
    let c = str.charCodeAt(i);
    if(isUpper(c)) {
      if(i > 0) {
        out.push(separatorChar);
      }
      out.push(toLower(c));
      changed = true;
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
}

module.exports = require('./main')(algorithms);
