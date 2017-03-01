/**
 * http://usejsdoc.org/
 */
module.exports = function List(jsonfile){
  const JSON_FILENAME = 'lists.json';
  this.jsonfile = jsonfile;

  this.getLists = function(){
    return jsonfile.readFileSync(JSON_FILENAME);
  };

  this.createList = function(listName){
    var listCollection = this.getLists();
    this.throwErrorIfListExistWhenCreate(listCollection, listName);
		listCollection[listName] = [];
    this.writeListCollectionInJson(listCollection);
  };

  this.removeList = function(listName){
    var listCollection = this.getLists();
    var errorMessage = 'List not exists!';
    this.throwErrorIfNotExistListCollectionWhenRemoveList(listCollection, listName, errorMessage);
    this.forInListCollectionAndListEqualListNameExecuteFunction(
      listCollection,
      listName,
      'deleteListInCollectionAndWriteListCollectionJson',
      [listName, listCollection]);
  };

  this.createTaskInList =function(taskName, listName){
    var listCollection = this.getLists();
    listCollection[listName].push(taskName);
    this.writeListCollectionInJson(listCollection);
  };

  this.throwErrorIfNotExistListCollectionWhenRemoveList = function(listCollection, listName, errorMessage){
    if (false === listCollection.hasOwnProperty(listName)){
      this.throwErrorListExist(errorMessage);
    }
  }

  this.throwErrorIfListExistWhenCreate = function(listCollection, listName){
    this.forInListCollectionAndListEqualListNameExecuteFunction(
      listCollection,
      listName,
      'throwErrorListExist',
      ['List exists!']);
  };

  this.forInListCollectionAndListEqualListNameExecuteFunction = function(listCollection, listName, functionName, params){
    if (true === listCollection.hasOwnProperty(listName)){
      this[functionName].apply(this, params);
    }
  }

  this.deleteListInCollectionAndWriteListCollectionJson = function(listName, listCollection){
    delete listCollection[listName];
    this.writeListCollectionInJson(listCollection);
  }

  this.throwErrorListExist = function(message){
    throw new Error(message);
  }
  this.writeListCollectionInJson =  function(listCollection){
    jsonfile.writeFileSync(JSON_FILENAME, listCollection);
  };
};
