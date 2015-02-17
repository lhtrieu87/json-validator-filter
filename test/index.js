var should = require('chai').should(),
  Validator = require('../index');

describe('filters', function () {
  it('filters out those data not specified in the schema', function () {
    var schema = {
      'id': '/Item',
      'type': 'object',
      'properties': {
        'name': {
          'title': 'Item\'s name',
          'type': 'string',
          'required': true
        },
        'description': {
          'title': 'Item\'s description',
          'type': 'string'
        }
      }
    };

    var instance = {
      name: 'A name',
      description: 'Some description',
      junkData: 'Junk data must be filtered out from the instance!!!'
    };

    var v = new Validator();
    var report = v.validate(instance, schema);

    should.not.exist(report.instance.junkData);
  });
});
