let algorithms = require('./algorithms');

algorithms.decamelize = function(str, separator) {
  //return str.split(/(?=[A-Z])/).join(separator || '_').toLowerCase();
  separator = separator || '_';
  if(str.match(/^[A-Z]/)) {return str;}
  return str.replace(/[A-Z]/g, (str, str2) => separator + str.toLowerCase());
};

module.exports = require('./main')(algorithms);
