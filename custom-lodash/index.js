// const users = [
//     { 'user': 'barney',  'active': false },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': true }
//   ];
// const testObject = {"a": "1", "b": "2", "c": "3"};

function sum(a, b) {
    return a + b;
}

function identity (anything) {
    return anything;
}

function checkIfInArray (arr, item) {
    let itemExists = 0;
    for (let i = 0; i < arr.length; i += 1){
        if (arr[i] === item) {
            itemExists += 1;
        }
    }
    return (itemExists !== 0) 
}

function pushWithoutReturn(arr, item) {
    arr[arr.length] = item;
}

// function popWithoutReturn(arr) {
//     arr.length = arr.length -1;
// }

function shiftWithoutReturn(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        if (i !== 0) {
            pushWithoutReturn(newArr, arr[i]);
        }
    }
    arr.length = 0;
    for (let i = 0; i < newArr.length; i += 1) {
        pushWithoutReturn(arr, newArr[i]);
    }
    //return arr;
}

function returnKeys(obj) {
    let keys = [];
    for(let key in obj) {
        if (typeof obj[key] !== 'function') {
            pushWithoutReturn(keys, key);
        }
    }
    return keys;
    //not just its own properties!!!
}

function returnValues(obj) {
    let keys = returnKeys(obj);
    // console.log('keys: ' + keys)
    let values = [];
    for (let key in obj) {
        // if (Object.prototype.hasOwnProperty.call(obj, key)) {
        let value = obj[key];
        // console.log(value)
        pushWithoutReturn(values, value)
        //}
    }
    // console.log('values:')
    // console.log(values)
    return values;
    //not just its own!!!
}
// returnValues(testObject)

function chunk(arr, size) {
    const numberOfNewArrays = Math.ceil(arr.length / size)
    const lastArraySize = arr.length % size;
    //console.log(lastArraySize)
    const newArr = []; /*= [['a', 'b'], ['c', 'd']];*/
    newArr.length = numberOfNewArrays;
    //console.log(numberOfNewArrays);
    for (let i = 0; i < numberOfNewArrays; i += 1) {
        let arrChunk = [];
        for (let j = 0; j < size; j += 1) {
            if ((size * i + j) < arr.length){
                arrChunk[j] = arr[size * i + j];
            }
        }
        newArr[i] = arrChunk;
        //console.log(arrChunk)
    }
    //console.log(newArr)
    return newArr;
}

function compact(arr) {
    let newArr = [];/*[1, 2, 3]*/
    const falsy = [false, null, 0, "", undefined, NaN];
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i]){
            pushWithoutReturn(newArr, arr[i]);
        }
    }
    return newArr;
}

function drop(arr, itemsToDrop = 1) {
    if (itemsToDrop === 0) {
        return arr;
    }
    for (let i = 0; i < itemsToDrop; i += 1) {
        shiftWithoutReturn(arr);
    }
    return arr;
}
function dropWhile(arr, funcOrIdentity) {
    let newArr = [...arr];
    // console.log(`START. old arr length : ${arr.length}`)
    // console.log(arr)
    let dropIndex = 0; 
    if (typeof funcOrIdentity === 'function'){
        for (let i = 0; i < arr.length; i += 1) {
            if (!funcOrIdentity(arr[i]) === true) {
                break;
            } else {
                dropIndex += 1;
            }
        }
    } else if (typeof funcOrIdentity === 'string') {
        // console.log(`thats the string argument: ${funcOrIdentity}`);
        for (let i = 0; i < arr.length; i += 1) {
            // console.log(arr[i])
            const itemKeys = returnKeys(arr[i])
            // console.log(itemKeys)
            // console.log(checkIfInArray(itemKeys, funcOrIdentity))
            if (checkIfInArray(itemKeys, funcOrIdentity)) {
                break;
            } else {
                // console.log('was string')
                // dropIndex += 1
            }

        }
    } else { console.log('wasnt a function')
        for (let i = 0; i < arr.length; i += 1) {
            // console.log(arr[i])
            const itemKeys = returnKeys(arr[i])
            // console.log(itemKeys)
            // console.log('TODO dropWhile')
        }
    }

    drop(newArr, dropIndex)
    // console.log(`FINAL arr`);
    return newArr;
    
}

// console.log(dropWhile(users, function(o) { return !o.active; }))
// console.log(dropWhile(users, { 'user': 'barney', 'active': false }))
//  console.log(dropWhile(users, ['active', false]))
// console.log(dropWhile(users, 'active'))

function take(arr, size = 1) {
    if (size > arr.length) {
        return arr;
    } else {
        arr.length = size;
        return arr;
    }
}

function filter(arrayOrObject, func) {
    let newArrOrObject = [];
    return newArrOrObject;
}

function find(arrayOrObject, func = identity, startingIndex = 0) {
    let matchedElement = [];
    const keys = returnKeys(arrayOrObject);
    // console.log(keys)
    const values = returnValues(arrayOrObject);
    // console.log(values)
    if (typeof func === 'function'){
        for (let i = 0; i < keys.length; i += 1) {
            if (func(arrayOrObject[i])) {
                pushWithoutReturn(matchedElement, arrayOrObject[i]);
                break;
            }
        }
    } else {
        console.log ('TODO if not function')
    }
    return matchedElement;
}
var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];
// console.log(find(users, function(o) { return o.age < 40; }))
console.log(find(users, { 'age': 1, 'active': true }))

function includes(arrayOrObjectOrString, value, startingIndex = 0) {
    if (typeof arrayOrObjectOrString === "string") {
        return arrayOrObjectOrString.includes(value, startingIndex);
    } else if (arrayOrObjectOrString[0]) {
        let newArr = [...arrayOrObjectOrString];
        drop(newArr, startingIndex);
        return checkIfInArray(newArr, value);
    } else {
        const givenValues = returnValues(arrayOrObjectOrString);
        return checkIfInArray(givenValues, value);
    }
}

function map(arrayOrObject, funcOrIdentity) {
    let newArr = [];
    // console.log(arrayOrObject)
    const givenKeys = returnKeys(arrayOrObject);
    // console.log('keys: ' + givenKeys)
    if (typeof funcOrIdentity === 'function'){
        const givenValues = returnValues(arrayOrObject);
        for (let i = 0; i < givenKeys.length; i += 1) {
            let newItem = funcOrIdentity(givenValues[i]);
            pushWithoutReturn(newArr, newItem);
        }
    } else {
        for (let i = 0; i < givenKeys.length; i += 1) {
                let propertyName = returnKeys(arrayOrObject[i]);
                if (funcOrIdentity === propertyName[0]) {
                    let newItem = returnValues(arrayOrObject[i]);
                    pushWithoutReturn(newArr, newItem[0]);
                }
        }
    }
    // console.log(newArr)
    return newArr;
}
//console.log(map(users, 'user'))

function zip(...arraysPairs) {
    const numberOfPairs = arraysPairs.length;
    let firsts = [];
    let seconds = [];
    for (let i = 0; i < numberOfPairs; i += 1) {
        pushWithoutReturn(firsts, arraysPairs[i][0]);
        pushWithoutReturn(seconds, arraysPairs[i][1]);
    }
    let zippedArr = [firsts, seconds];
    return zippedArr;
}

function square(n) {
    return n * n;
}

module.exports =  {checkIfInArray, sum, chunk, compact, drop, dropWhile, take, filter, find, 
    includes, map, zip, square, returnKeys, returnValues, identity};

