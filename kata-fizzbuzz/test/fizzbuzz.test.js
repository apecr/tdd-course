var assert = require('assert');
var sinon = require('sinon');

var FizzBuzz = require('../fizzbuzz.js');

suite('Print', function(){
  var fizzBuzz = null;
  var mockDatabase = null;
  setup( function(){
    var database = {
      initConnection : function(){},
      getStringWhenThreeNumber : function(){}
    }
    this.mockDatabase = sinon.mock(database);
    this.fizzBuzz = new FizzBuzz(database);
  });
  test('return 1 when print number one', function(){
    //Arrange
    this.mockDatabase.expects('initConnection').never();
    //Act
    var result = this.fizzBuzz.print(1);
    //assert
    this.mockDatabase.verify();
    assert.equal('1', result);
  });
  test('return 2 when print number two', function(){
    //Arrange
    this.mockDatabase.expects('initConnection').never();
    //Act
    var result = this.fizzBuzz.print(2);
    //assert
    this.mockDatabase.verify();
    assert.equal('2', result);
  });
  test('Throw exception when argument is string', function(){
    //Arrange
    this.mockDatabase.expects('initConnection').never();
    //Act
    //assert
    var self = this;
    assert.throws(function(){
      self.fizzBuzz.print('two')
    }, /Number is not an Integer/);
    this.mockDatabase.verify();
  });
  test('return Fizz when print number 3. We are calling to the database', function(){
    //Arrange
    this.mockDatabase.expects('initConnection').once();
    this.mockDatabase.expects('getStringWhenThreeNumber').once().returns('Fizz');
    //Act
    var result = this.fizzBuzz.print(3);
    //assert
    this.mockDatabase.verify();
    assert.equal('Fizz', result);
  });
});
