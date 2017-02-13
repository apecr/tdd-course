//String calculator
//Sum string numbers separates with ',' Ex: '1,2,3'

exports.add = function(string){
  var result = 0;
  if (isNotEmptyString(string)) {
    var arrayStringNumbers = string.split(',');
    result = arrayStringNumbers.reduce(calculateSum, 0);
  }
  return result;
};

function isNotEmptyString(string){
  return (string) ? true : false;
}

function calculateSum(accumulatedValue, nextString){
  return parseInt(accumulatedValue) + parseInt(nextString);
}
