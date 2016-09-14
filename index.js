'use strict';
let xcase = require('./build/Release/xcase');

function processKeys(obj, fun, opts) {
  let obj2;
  if(obj instanceof Array) {
    obj2 = [];
  } else {
    if(typeof obj.prototype !== 'undefined') {
      // return non-plain object unchanged
      return obj;
    }
    obj2 = {};
  }
  for(let key in obj) {
    let value = obj[key];
    key = fun(key, opts);  
    if(value && typeof value == 'object') {
      obj2[key] = processKeys(value, fun, opts);
    } else {
      obj2[key] = value;
    }
  }
  return obj2;
}

function processKeysInPlace(obj, fun, opts) {
  for(let key of Object.keys(obj)) {
    let value = obj[key];
    let newKey = fun(key, opts);
    if(newKey !== key) {
      delete obj[key];
    }
    if(value && typeof value == 'object') {
      obj[newKey] = processKeys(value, fun, opts);
    } else {
      obj[newKey] = value;
    }
  }
  return obj;
}

module.exports = {
  camelize: xcase.camelize,
  decamelize: xcase.decamelize,
  pascalize: xcase.pascalize,
  depascalize: xcase.depascalize,
  camelizeKeys(obj, opts) {
    opts = opts || {};
    if(opts.inPlace) return processKeysInPlace(obj, xcase.camelize, opts);
    return processKeys(obj, xcase.camelize, opts);
  },
  decamelizeKeys(obj, opts) {
    opts = opts || {};
    if(opts.inPlace) return processKeysInPlace(obj, xcase.decamelize, opts);
    return processKeys(obj, xcase.decamelize, opts);
  },
  pascalizeKeys(obj, opts) {
    opts = opts || {};
    if(opts.inPlace) return processKeysInPlace(obj, xcase.pascalize, opts);
    return processKeys(obj, xcase.pascalize, opts);
  },
  depascalizeKeys(obj, opts) {
    opts = opts || {};
    if(opts.inPlace) return processKeysInPlace(obj, xcase.depascalize, opts);
    return processKeys(obj, xcase.depascalize, opts);
  }
};
