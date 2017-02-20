//write a program that prints numbers from 1 to 100. But for multiples of three prints "Fizz"
// instead of the number and for the multiples of five prints "Buzz". For numbers wich are multiples of both
// three and five prints "FizzBuzz"
//
const THREE = 3;
const FIVE = 5;

module.exports = function FizzBuzz(database){
  this.database = database;
  this.connection = false;
  this.print = function(number){
    var result = '';
    isNotIntegerThrowException(number);
    [result, this.connection] = getStringDependingIfMultipleNumber(
      number,
      THREE,
      database,
      'getStringWhenThreeNumber',
      result,
      this.connection
    );
    [result, this.connection] = getStringDependingIfMultipleNumber(
      number,
      FIVE,
      database,
      'getStringWhenFiveNumber',
      result,
      this.connection
    );
    return (result || number);
  }
};

function getStringDependingIfMultipleNumber(number, multipleOf, database, funct, result, connection){
  if (isMultipleOfNumber(number, multipleOf)){
    connection = databaseInitConnection(database, connection);
    result += database[funct]();
  }
  return [result, connection];
}

function isNotIntegerThrowException(argument){
  if (false === Number.isInteger(argument)){
    throw new Error('Number is not an Integer');
  }
}

function databaseInitConnection(database, connection){
  if (!connection){
    database.initConnection();
    connection = true;
  }
  return connection;
}

function isMultipleOfNumber(number, multipleOf){
  return 0 === number % multipleOf;
}
