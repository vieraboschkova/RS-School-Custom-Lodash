//test objects

const users = [
{ 'user': 'barney',  'active': false },
{ 'user': 'fred',    'active': false },
{ 'user': 'pebbles', 'active': true }
];

const users2 = [
{ 'user': 'barney' },
{ 'user': 'fred' }
];
const testObject = {"a": "1", "b": "2", "c": "3"};

var object = {
    'a': [{ 'b': 2 }, { 'd': 4 }]
  };
   
  var other = {
    'a': [{ 'c': 3 }, { 'e': 5 }]
  };

module.exports = {users, users2, testObject, object, other};