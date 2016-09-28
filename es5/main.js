'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function (algorithms) {
  function shouldProcessValue(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && !(value instanceof Date) && !(value instanceof Function);
  }

  function processKeys(obj, fun, opts) {
    var obj2 = void 0;
    if (obj instanceof Array) {
      obj2 = [];
    } else {
      if (typeof obj.prototype !== 'undefined') {
        // return non-plain object unchanged
        return obj;
      }
      obj2 = {};
    }
    for (var key in obj) {
      var value = obj[key];
      if (typeof key === 'string') key = fun(key, opts);
      if (shouldProcessValue(value)) {
        obj2[key] = processKeys(value, fun, opts);
      } else {
        obj2[key] = value;
      }
    }
    return obj2;
  }

  function processKeysInPlace(obj, fun, opts) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var value = obj[key];
        var newKey = fun(key, opts);
        if (newKey !== key) {
          delete obj[key];
        }
        if (shouldProcessValue(value)) {
          obj[newKey] = processKeys(value, fun, opts);
        } else {
          obj[newKey] = value;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return obj;
  }

  function decamelize(str, opts) {
    return algorithms.decamelize(str, opts && opts.separator || '');
  }
  function depascalize(str, opts) {
    return algorithms.depascalize(str, opts && opts.separator || '');
  }

  return {
    camelize: algorithms.camelize,
    decamelize: decamelize,
    pascalize: algorithms.pascalize,
    depascalize: depascalize,
    camelizeKeys: function camelizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, algorithms.camelize, opts);
      return processKeys(obj, algorithms.camelize, opts);
    },
    decamelizeKeys: function decamelizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, decamelize, opts);
      return processKeys(obj, decamelize, opts);
    },
    pascalizeKeys: function pascalizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, algorithms.pascalize, opts);
      return processKeys(obj, algorithms.pascalize, opts);
    },
    depascalizeKeys: function depascalizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, depascalize, opts);
      return processKeys(obj, depascalize, opts);
    }
  };
};