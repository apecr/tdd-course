module.exports = function DatabaseFake(){
  this.initConnection = function(){};
  this.getStringWhenThreeNumber = function(){
    return 'Fizz';
  }
}
