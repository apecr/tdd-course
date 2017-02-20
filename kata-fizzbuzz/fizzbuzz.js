//write a program that prints numbers from 1 to 100. But for multiples of three prints "Fizz"
// instead of the number and for the multiples of five prints "Buzz". For numbers wich are multiples of both
// three and five prints "FizzBuzz"
//

module.exports = function FizzBuzz(database){
  this.database = database;
  this.print = function(number){
    var result = number;
    isNotIntegerThrowException(number);
    if (isMultipleOfThrre(number)){
      database.initConnection();
      result = database.getStringWhenThreeNumber();
    }
    return result;
  }
};

function isNotIntegerThrowException(argument){
  if (false === Number.isInteger(argument)){
    throw new Error('Number is not an Integer');
  }
}

function isMultipleOfThrre(number){
  return 0 === number % 3;
}
