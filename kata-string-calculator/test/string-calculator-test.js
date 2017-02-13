var assert = require('assert');
var converter = require('../string-calculator.js');

suite('Add', function(){
  test('should return 0 when string is empty', function(){
    assert.equal(0, converter.add(''));
  });
  test('should return 0 when string is 0', function(){
    assert.equal(0, converter.add('0'));
  });
  test('should return 1 when string is 1', function(){
    assert.equal(1, converter.add('1'));
  });
  test('should return 3 when string is 1,2', function(){
    assert.equal(3, converter.add('1,2'));
  });
  test('should return 6 when string is 1,2,3', function(){
    assert.equal(6, converter.add('1,2,3'));
  });
});
