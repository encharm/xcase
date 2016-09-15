'use strict';
module.exports = function(algorithms) {
  function shouldProcessValue(value) {
    return value && typeof value == 'object' &&
        !(value instanceof Date) && !(value instanceof Function);
  }

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
      if(typeof key === 'string')
        key = fun(key, opts);
      if(shouldProcessValue(value)) {
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
      if(shouldProcessValue(value)) {
        obj[newKey] = processKeys(value, fun, opts);
      } else {
        obj[newKey] = value;
      }
    }
    return obj;
  }

  function decamelize(str, opts) {
    return algorithms.decamelize(str, (opts && opts.separator) || '');
  }
  function depascalize(str, opts) {
    return algorithms.depascalize(str, (opts && opts.separator) || '');
  }

  return {
    camelize: algorithms.camelize,
    decamelize: decamelize,
    pascalize: algorithms.pascalize,
    depascalize: depascalize,
    camelizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, algorithms.camelize, opts);
      return processKeys(obj, algorithms.camelize, opts);
    },
    decamelizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, decamelize, opts);
      return processKeys(obj, decamelize, opts);
    },
    pascalizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, algorithms.pascalize, opts);
      return processKeys(obj, algorithms.pascalize, opts);
    },
    depascalizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, depascalize, opts);
      return processKeys(obj, depascalize, opts);
    }
  };
};
