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
    this.forInListCollectionAndListEqualListNameExecuteFunction(
      listCollection,
      listName,
      'deleteListInCollectionAndWriteListCollectionJson',
      [listName, listCollection]);
  };

  this.throwErrorIfListExistWhenCreate = function(listCollection, listName){
    this.forInListCollectionAndListEqualListNameExecuteFunction(
      listCollection,
      listName,
      'throwErrorListExist',
      []);
  };

  this.forInListCollectionAndListEqualListNameExecuteFunction = function(listCollection, listName, functionName, params){
    for (var list in listCollection){
      if (list === listName){
          this[functionName].apply(this, params);
      }
    }
  }

  this.deleteListInCollectionAndWriteListCollectionJson = function(listName, listCollection){
    delete listCollection[listName];
    this.writeListCollectionInJson(listCollection);
  }

  this.throwErrorListExist = function(){
    throw new Error('List exists!');
  }
  this.writeListCollectionInJson =  function(listCollection){
    jsonfile.writeFileSync(JSON_FILENAME, listCollection);
  };
};
