/**
 * http://usejsdoc.org/
 */
var assert = require('assert');
var sinon = require('sinon');
var jsonfile = require('jsonfile');
var List = require('../list.js');

suite('List', function(){
	this.listObject = null;
	var mockJsonfile = null;
	const JSON_FILE = 'lists.json';
	const TODO_LIST = 'ToDo';
	setup(function(){
		this.mockJsonfile = sinon.mock(jsonfile);
		this.listManager = createListManager(jsonfile);
	});
	test('should get all lists', function(){
		//Arrange
		var listSalida = {};
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(listSalida);
		//Act
		var result = this.listManager.getLists();
		//Assert
		assert.equal(listSalida, result);
		this.mockJsonfile.verify();
	});
	test('should create a new list with name', function(){
		//Arrange
		var emptyList = {};
		var lists = createToDoList();
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(emptyList);
		this.mockJsonfile.expects('writeFileSync').once().withArgs(JSON_FILE, lists);
		//Act
		this.listManager.createList(TODO_LIST);
		//Assert
		this.mockJsonfile.verify();
	});
	test('should throw an error when trying create a list with an existing name', function(){
		//Arrange
		var lists = createToDoList();
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(lists);
		this.mockJsonfile.expects('writeFileSync').never();
		//Act
		//Assert
		var self = this;
		assert.throws(function(){
			self.listManager.createList(TODO_LIST)
		}, /List exists!/);
		this.mockJsonfile.verify();
	});
	test('should remove a existing list', function(){
		//Arrange
		var lists = createToDoList();
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(lists);
		var emptyList = {};
		this.mockJsonfile.expects('writeFileSync').once().withArgs(JSON_FILE, emptyList);
		//Act
		this.listManager.removeList(TODO_LIST);
		//Assert
		this.mockJsonfile.verify();
	});

	test('should throw error when remove a list not exist', function(){
		//Arrange
		var listSalida = {};
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(listSalida);
		this.mockJsonfile.expects('writeFileSync').never();
		//Act
		//Assert
		self = this;
		assert.throws(function(){
			self.listManager.removeList(TODO_LIST)
		}, /List not exists!/);
		this.mockJsonfile.verify();
	});

	test('should add task in a list', function(){
		//Arrange
		var listCollection = createToDoList();
		this.mockJsonfile.expects('readFileSync').once().withArgs(JSON_FILE).returns(listCollection);
		var taskName = 'Add task in a list';
		listCollection[TODO_LIST].push(taskName);
		this.mockJsonfile.expects('writeFileSync').once().withArgs(JSON_FILE, listCollection);
		//Act
		this.listManager.createTaskInList(taskName, TODO_LIST);
		//Assert
		this.mockJsonfile.verify();
	});

	function createListManager(jsonfile){
		return new List(jsonfile);
	}

	function createToDoList(){
		var lists = {};
		lists[TODO_LIST] = [];
		return lists;
	}
});
