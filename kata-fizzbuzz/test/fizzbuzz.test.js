var assert = require('assert');
var FizzBuzz = require('../fizzbuzz.js');

suite('Print', function(){
  var fizzBuzz = null;
  setup( function(){
    this.fizzBuzz = new FizzBuzz();
  });
  test('return 1 when print number one', function(){
    //Arrange
    //Act
    var result = this.fizzBuzz.print(1);
    //assert
    assert.equal('1', result);
  });
  test('return 2 when print number two', function(){
    //Arrange
    //Act
    var result = this.fizzBuzz.print(2);
    //assert
    assert.equal('2', result);
  });
  test('Throw exception when argument is string', function(){
    //Arrange
    //Act
    //assert
    var self = this;
    assert.throws(function(){
      self.fizzBuzz.print('two')
    }, /Number is not an Integer/);
  });
});
