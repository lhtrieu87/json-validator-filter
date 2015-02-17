'use strict';

var Validator = require('jsonschema').Validator;

var ValidatorFilter = function ValidatorFilter() {
  Validator.call(this);

  var validateProperties = this.attributes.properties;
  this.attributes.properties = function (instance, schema, options, ctx) {
    if(instance === undefined || !(instance instanceof Object)) return;

    var result = validateProperties.call(this, instance, schema, options, ctx);

    var properties = schema.properties || {};
    if(!result.errors || result.errors.length === 0) {
      for(var p in instance) {
        if(!properties[p])
          delete instance[p];
      }
    }

    return result;
  };
};

ValidatorFilter.prototype = Object.create(Validator.prototype);

module.exports = ValidatorFilter;
