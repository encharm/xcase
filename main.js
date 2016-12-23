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
    let keys = Object.keys(obj);
    for(let idx = 0;idx < keys.length;++idx) {
      let key = keys[idx];
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

  let iface = {
    camelize: algorithms.camelize,
    decamelize(str, opts) {
      return algorithms.decamelize(str, (opts && opts.separator) || '');
    },
    pascalize: algorithms.pascalize,
    depascalize(str, opts) {
      return algorithms.depascalize(str, (opts && opts.separator) || '');
    },
    camelizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, iface.camelize, opts);
      return processKeys(obj, iface.camelize, opts);
    },
    decamelizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, iface.decamelize, opts);
      return processKeys(obj, iface.decamelize, opts);
    },
    pascalizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, iface.pascalize, opts);
      return processKeys(obj, iface.pascalize, opts);
    },
    depascalizeKeys(obj, opts) {
      opts = opts || {};
      if(!shouldProcessValue(obj)) return obj;
      if(opts.inPlace) return processKeysInPlace(obj, iface.depascalize, opts);
      return processKeys(obj, iface.depascalize, opts);
    }
  };
  return iface;
};
