var assert = require('assert');
var sinon = require('sinon');

var FizzBuzz = require('../fizzbuzz.js');

suite('Print', function(){
  var fizzBuzz = null;
  var database = null;
  setup( function(){
    this.database = {
      initConnection : function(){},
      getStringWhenThreeNumber : function(){}
    }
    this.fizzBuzz = new FizzBuzz(this.database);
  });
  test('return 1 when print number one', function(){
    //Arrange
    //Act
    var result = this.fizzBuzz.print(1);
    //assert
    assert.ok(this.database.initConnection.called);
    assert.equal('1', result);
  });
  test('return 2 when print number two', function(){
    //Arrange
    //Act
    var result = this.fizzBuzz.print(2);
    //assert
    assert.ok(this.database.initConnection.called);
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
  test('return Fizz when print number 3. We are calling to the database', function(){
    //Arrange
    sinon.spy(this.database, 'initConnection');
    sinon.stub(this.database, 'getStringWhenThreeNumber').returns('Fizz');
    //Act
    var result = this.fizzBuzz.print(3);
    //assert
    assert.ok(this.database.initConnection.called);
    assert.equal('Fizz', result);
  });
});
