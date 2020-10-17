const objects = require('./objects');
const testObjects = require('./testObject');
var _ = require('lodash');

test('merge: it recursively merges own and inherited enumerable string keyed properties of source objects into the destination object', () => {
    expect(objects.merge(testObjects.object, testObjects.other)).toEqual({ 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] });
});

test('omit: creates an object composed of the own and inherited enumerable property paths of object that are not omitted', () => {
    var obj = { 'a': 1, 'b': '2', 'c': 3 };
    expect(objects.omit(obj, ['a', 'c'])).toEqual({ 'b': '2' });
});

test('omitBy: creates an object composed of the own and inherited enumerable string keyed properties of object that predicate doesnt return truthy for', () => {
    var obj = { 'a': 1, 'b': '2', 'c': 3 };
    expect(objects.omitBy(obj, _.isNumber)).toEqual({ 'b': '2' });
});

test('pick: Creates an object composed of the picked object properties.', () => {
    var obj = { 'a': 1, 'b': '2', 'c': 3 };
    expect(objects.pick(obj, ['a', 'c'])).toEqual({ 'a': 1, 'c': 3 });
});
test('pick: Creates an object composed of the picked object properties.', () => {
    var obj = { 'a': 1, 'b': '2', 'c': 3 };
    expect(objects.pick(obj, 'a')).toEqual({ 'a': 1});
});

test('pickBy: Creates an object composed of the object properties predicate returns truthy for', () => {
    var obj = { 'a': 1, 'b': '2', 'c': 3 };
    expect(objects.pickBy(obj, _.isNumber)).toEqual({ 'a': 1, 'c': 3 });
});

test('toPairs: Creates an array of own enumerable string keyed-value pairs for object', () => {
    function Foo() {
        this.a = 1;
        this.b = 2;
      }
       
      Foo.prototype.c = 3;
       
    expect(objects.toPairs(new Foo)).toEqual([['a', 1], ['b', 2]]);
});
