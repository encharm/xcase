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
        key = fun(key, opts && opts.separator);
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
      let newKey = fun(key, opts && opts.separator);
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
    camelize(str, separator) {
      return algorithms.camelize(str, (separator && separator.charCodeAt(0)) || 0x5f /* _ */);
    },
    decamelize(str, separator) {
      return algorithms.decamelize(str, (separator && separator.charCodeAt(0)) || 0x5f /* _ */);
    },
    pascalize(str, separator) {
      return algorithms.pascalize(str, (separator && separator.charCodeAt(0)) || 0x5f /* _ */);
    },
    depascalize(str, separator) {
      return algorithms.depascalize(str, (separator && separator.charCodeAt(0)) || 0x5f /* _ */);
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
