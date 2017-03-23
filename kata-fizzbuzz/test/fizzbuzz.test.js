var assert = require('assert');
var sinon = require('sinon');

var FizzBuzz = require('../fizzbuzz.js');

describe('Print', function(){
  var fizzBuzz = null;
  var mockDatabase = null;
  beforeEach( function(){
    var database = {
      initConnection : function(){},
      getStringWhenThreeNumber : function(){},
      getStringWhenFiveNumber : function(){}
    }
    this.mockDatabase = sinon.mock(database);
    this.fizzBuzz = new FizzBuzz(database);
  });
  it('Another test', function(){
    assert.ok(true,'Test OK');
  });
  it('return 1 when print number one', function(){
    //Arrange
    expectInitConnectionNever(this.mockDatabase);
    //Act
    var result = this.fizzBuzz.print(1);
    //assert
    this.mockDatabase.verify();
    assert.equal('1', result);
  });
  it('return 2 when print number two', function(){
    //Arrange
    expectInitConnectionNever(this.mockDatabase);
    //Act
    var result = this.fizzBuzz.print(2);
    //assert
    this.mockDatabase.verify();
    assert.equal('2', result);
  });
  it('Throw exception when argument is string', function(){
    //Arrange
    expectInitConnectionNever(this.mockDatabase);
    //Act
    //assert
    var self = this;
    assert.throws(function(){
      self.fizzBuzz.print('two')
    }, /Number is not an Integer/);
    this.mockDatabase.verify();
  });
  it('return Fizz when print number three', function(){
    //Arrange
    expectInitConnectionOnce(this.mockDatabase);
    this.mockDatabase.expects('getStringWhenThreeNumber').once().returns('Fizz');
    //Act
    var result = this.fizzBuzz.print(3);
    //assert
    this.mockDatabase.verify();
    assert.equal('Fizz', result);
  });
  it('return Buzz when print number five', function(){
    //Arrange
    expectInitConnectionOnce(this.mockDatabase);
    this.mockDatabase.expects('getStringWhenFiveNumber').once().returns('Buzz');
    //Act
    var result = this.fizzBuzz.print(5);
    //assert
    this.mockDatabase.verify();
    assert.equal('Buzz', result);
  });
  it('return FizzBuzz when print number fifteen', function(){
    //Arrange
    expectInitConnectionOnce(this.mockDatabase);
    this.mockDatabase.expects('getStringWhenThreeNumber').once().returns('Fizz');
    this.mockDatabase.expects('getStringWhenFiveNumber').once().returns('Buzz');
    //Act
    var result = this.fizzBuzz.print(15);
    //assert
    this.mockDatabase.verify();
    assert.equal('FizzBuzz', result);
  });
  it('return Fizz when print number six', function(){
    //Arrange
    expectInitConnectionOnce(this.mockDatabase);
    this.mockDatabase.expects('getStringWhenThreeNumber').once().returns('Fizz');
    //Act
    var result = this.fizzBuzz.print(6);
    //assert
    this.mockDatabase.verify();
    assert.equal('Fizz', result);
  });
  it('return Buzz when print number ten', function(){
    //Arrange
    expectInitConnectionOnce(this.mockDatabase);
    this.mockDatabase.expects('getStringWhenFiveNumber').once().returns('Buzz');
    //Act
    var result = this.fizzBuzz.print(10);
    //assert
    this.mockDatabase.verify();
    assert.equal('Buzz', result);
  });
  it('return FizzBuzz when print number fourtyfive', function(){
    //Arrange
    expectInitConnectionOnce(this.mockDatabase);
    this.mockDatabase.expects('getStringWhenThreeNumber').once().returns('Fizz');
    this.mockDatabase.expects('getStringWhenFiveNumber').once().returns('Buzz');
    //Act
    var result = this.fizzBuzz.print(45);
    //assert
    this.mockDatabase.verify();
    assert.equal('FizzBuzz', result);
  });
});

function expectInitConnectionOnce(mockDatabase){
  mockDatabase.expects('initConnection').once();
}

function expectInitConnectionNever(mockDatabase){
  mockDatabase.expects('initConnection').never();
}
