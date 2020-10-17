const functions = require('./index');
const testObjects = require('./testObject');

beforeEach(() => {
  jest.resetModules();
});

test('sum: adds 1 + 2 to equal 3', () => {
  expect(functions.sum(1, 2)).toEqual(3);
});
test('square: return square of number', () => {
  expect(functions.square(2)).toEqual(4);
});
test('checkIfInArray: returns true or false', () => {
  expect(functions.checkIfInArray([1,2,3], 8)).toEqual(false);
});
// test('returns keys', () => {
//   expect(functions.returnKeys(testObject)).toEqual(['a', 'b', 'c']);
// });
// test('returns values', () => {
//   expect(functions.returnValues(testObject)).toEqual(['1', '2', '3']);
// });
// test('shifts the first element', () => {
//   expect(functions.shiftWithoutReturn([1, 2])).toEqual([2]);
// });

test('chunk: chunks in 2 element array', () => {
  expect(functions.chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  expect(functions.chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'],['d']]);
  expect(functions.chunk(['a', 'b', 'c', 'd'], 4)).toEqual([['a', 'b', 'c','d']]);
});

test('compact: eliminates falsy values in an array', () => {
  expect(functions.compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  expect(functions.compact([0, true, 2, '', 3])).toEqual([true, 2, 3]);
  expect(functions.compact([0, 0, 0, '', 0])).toEqual([]);
});

test('drop: drops a number of elements in an array', () => {
  expect(functions.drop([1, 2, 3])).toEqual([2, 3]);
  expect(functions.drop([1, 2, 3], 2)).toEqual([3]);
  expect(functions.drop([1, 2, 3], 5)).toEqual([]);
  expect(functions.drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
});

test('dropWhile 1: creates a slice of array excluding elements dropped from the beginning', () => {
  expect(functions.dropWhile(testObjects.users, function(o) { return !o.active; })).toEqual([ { user: 'pebbles', active: true } ]);
});

test('dropWhile 2: creates a slice of array excluding elements dropped from the beginning', () => {
  expect(functions.dropWhile(testObjects.users, ['active', false])).toEqual([ { user: 'fred', active: false }, { user: 'pebbles', active: true } ]);
});

test('dropWhile 3: creates a slice of array excluding elements dropped from the beginning', () => {
  expect(functions.dropWhile(testObjects.users, { 'user': 'barney', 'active': false })).toEqual([ { user: 'pebbles', active: true } ]);
});

test('dropWhile 4: creates a slice of array excluding elements dropped from the beginning', () => {
  expect(functions.dropWhile(testObjects.users, 'active')).toEqual([
    { user: 'barney', active: false },
    { user: 'fred', active: false },
    { user: 'pebbles', active: true }
  ]);
});

test('take: creates a slice of array with n elements taken from the beginning', () => {
  expect(functions.take([1, 2, 3])).toEqual([1]);
  expect(functions.take([1, 2, 3], 2)).toEqual([1,2]);
  expect(functions.take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  expect(functions.take([1, 2, 3], 0)).toEqual([]);
});

test('filter: iterates over elements of collection, returning an array of all elements predicate returns truthy', () => {
  expect(functions.filter(testObjects.users, function(o) { return !o.active; })).toEqual({ 'user': 'fred',   'age': 40, 'active': false });
});

test('find 1: iterates over elements of collection, returning the first element predicate returns truthy for.', () => {
  var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];
  expect(functions.find(users, function(o) { return o.age < 40; })).toEqual([{ 'user': 'barney', 'age': 36, 'active': true }]);
});
test('find 2 : iterates over elements of collection, returning the first element predicate returns truthy for.', () => {
  var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];
  expect(functions.find(users, { 'age': 1, 'active': true })).toEqual([{ 'user': 'pebbles', 'age': 1,  'active': true }]);
});

test('includes: checks if value is in collection', () => {
  expect(functions.includes([1, 2, 3], 1)).toEqual(true);
});

test('includes: checks if value is in collection', () => {
  expect(functions.includes([1, 2, 3], 1, 2)).toEqual(false);
});

test('includes: checks if value is in collection', () => {
  expect(functions.includes({ 'a': 1, 'b': 2 }, 1)).toEqual(true);
});

test('includes: checks if value is in collection', () => {
  expect(functions.includes('abcd', 'bc')).toEqual(true);
});

test('map1: creates an array of values by running each element in collection thru iteratee', () => {
  expect(functions.map([4, 8], functions.square)).toEqual([16, 64]);
});

test('map2: creates an array of values by running each element in collection thru iteratee', () => {
  expect(functions.map({ 'a': 4, 'b': 8 }, functions.square)).toEqual([16, 64]);
});

test('map3: creates an array of values by running each element in collection thru iteratee', () => {
  expect(functions.map(testObjects.users2, 'user')).toEqual(['barney', 'fred']);
});

test('zip: creates an array of grouped elements', () => {
  expect(functions.zip(['a', 'b'], [1, 2], [true, false])).toEqual([['a', 1, true], ['b', 2, false]]);
});

test('zip: creates an array of grouped elements', () => {
  expect(functions.zip(['1', '2'], [1, 2])).toEqual([['1', 1], ['2', 2]]);
});

test('zip: creates an array of grouped elements', () => {
  expect(functions.zip(['1', '2'])).toEqual([['1'], ['2']]);
});

test('zip: creates an array of grouped elements', () => {
  expect(functions.zip(['', ''])).toEqual([[''], ['']]);
});

