/**
 * http://usejsdoc.org/
 */
var assert = require('assert');
var sinon = require('sinon');
var jsonfile = require('jsonfile');
var List = require('../list.js');

suite('List', function(){
	setup(function(){});
	test('should get all lists', function(){
		//Arrange
		var mockJsonfile = sinon.mock(jsonfile);
		var filename = 'lists.json';
		var listSalida = {};
		mockJsonfile.expects('readFileSync').once().withArgs(filename).returns(listSalida);
		var listObject = new List();
		//Act
		var result = listObject.getLists(jsonfile);
		//Assert
		assert.equal(listSalida, result);
		mockJsonfile.verify();
	});
	test('should create a new list with name', function(){
		//Arrange
		var mockJsonfile = sinon.mock(jsonfile);
		//Act
		listObject.createList(listName);
		//Assert
	});
});
