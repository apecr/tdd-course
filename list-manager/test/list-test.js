/**
 * http://usejsdoc.org/
 */
var assert = require('assert');
var sinon = require('sinon');
var jsonfile = require('jsonfile');
var List = require('../list.js');

suite('List', function(){
	this.listObject = null;
	this.mockJsonfile = null;
	const JSON_FILE = 'lists.json';
	setup(function(){
		this.mockJsonfile = sinon.mock(jsonfile);
		this.listObject = new List(jsonfile);
	});
	test('should get all lists', function(){
		//Arrange
		var listSalida = {};
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(listSalida);
		//Act
		var result = this.listObject.getLists();
		//Assert
		assert.equal(listSalida, result);
		this.mockJsonfile.verify();
	});
	test('should create a new list with name', function(){
		//Arrange
		var emptyList = {};
		var lists = {};
		var listName = 'ToDo';
		lists[listName] = [];
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(emptyList);
		this.mockJsonfile.expects('writeFileSync').once().withArgs(JSON_FILE, lists);
		//Act
		this.listObject.createList(listName);
		//Assert
		this.mockJsonfile.verify();
	});
});
