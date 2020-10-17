const testObjects = require('./testObject');
const functions = require('./index');
const { checkIfInArray } = require('./index');
var _ = require('lodash');

function merge (obj, sources) {
    // console.log('merge')
    // console.log(obj)
    // console.log(sources)
    const keys = functions.returnKeys(obj);
    for (key in sources) {
        if (!checkIfInArray(key, keys)){
            if (!obj[key]) {
                obj[key] = sources[key];
            } else { 
                // console.log('TODO')
                // console.log(obj[key])
                // console.log(sources[key])
                merge(obj[key], sources[key])
            }
        }
    }
    // console.log('merged')
    // console.log(obj)
    return obj;
}

function omit (obj, paths) {
    // console.log('omit')
    let newObj = {};
    const keys = functions.returnKeys(obj);
    // console.log(keys)
    for (let i = 0; i < keys.length; i += 1) {
        if (!checkIfInArray(paths, keys[i])) {
            newObj[keys[i]] = obj[keys[i]]; 
        }
    }
    // console.log(newObj)
    return newObj;
}


function omitBy (obj, predicate) {
    console.log('omitBy')
    let newObject = {};
    const values = functions.returnValues(obj);
    // console.log(values)
    for (key in obj) {
        if (!predicate(obj[key])) {
            newObject[key] = obj [key];
        }
    }
    return newObject;
}

function pick (obj, paths) {
    let newObj = {};
    // console.log('pick')
    const keys = functions.returnKeys(obj);
    // console.log(keys)
    const values = functions.returnValues(obj);
    // console.log(values)
    // console.log(paths)
    for (let i = 0; i < paths.length; i += 1) {
            newObj[paths[i]] = obj[paths[i]]
    }
    // console.log(newObj)
    return newObj;
}

function pickBy (obj, predicate) {
    // console.log('pickBy')
    // console.log(obj)
    // console.log(predicate)
    let newObject = {};
    const values = functions.returnValues(obj);
    // console.log(values)
    for (key in obj) {
        if (predicate(obj[key])) {
            newObject[key] = obj [key];
        }
    }
    return newObject;
}


function toPairs (obj) {
    // console.log('toPairs')
    // console.log(obj)
    let newArr = [];
    // const keys = functions.returnKeys(obj);<---- NOT WORKING, also prototype properties
    // console.log(keys) 
    // const values = functions.returnValues(obj);
    // console.log(values)
    return Object.entries(obj)
}

module.exports =  {merge, omit, omitBy, pick, pickBy, toPairs};

