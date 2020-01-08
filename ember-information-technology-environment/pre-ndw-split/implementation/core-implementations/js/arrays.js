/* arrays, provides:
    append
    subset
    push
    pop
    shift
    hasIndex
    get
    getNext
    first
    last
    setElement
    count
*/

async function append(array1, array2) {
    await assertIsArray(array1); await assertIsGenericItem(array2); let arrayReturn;

    if (array1.constructor.name !== 'Uint8Array' && array2.constructor.name !== 'Uint8Array') {
        arrayReturn=array1.concat(array2);
    }
    else {
        if (array1.constructor.name !== 'Uint8Array') {
            arrayReturn=array1.concat(Array.from(array2));
        }
        else {
            if(array2.constructor.name !== 'Uint8Array') {
                arrayReturn=Array.from(array1).concat(array2);
            }
            else {
                arrayReturn=Array.from(array1).concat(Array.from(array2));
            }
        }
    }
    await assertIsArray(arrayReturn); return arrayReturn;
}

async function subset(array, start, end) {
    await assertIsArray(array); await assertIsInt(start); await assertIsInt(end); let arrayReturn;

    arrayReturn=array.slice(start, end);

    await assertIsArray(arrayReturn); return arrayReturn;
}

async function push(array1, array2) {
    // Not necessary since it just wraps append, which does this anyway: await assertIsArray(array1); await assertIsArray(array2);

    return await append(array1, array2);
}

async function pop(array) {
    return await subset(array, 0, -2);
}

async function shift(array) {
    return await subset(array, 1, -1);
}

async function hasIndex(array, index) {
    let len = await count(array);
    if (index > count - 1) {
        return false;
    }
    return true;
}

async function get(array, index) {
    await assertIsArray(array); await assertIsInt(index); let returnVal;

    await assertHasIndex(array, index);
    if (index < 0) {
        /* JavaScript arrays don't allow negative indices without doing it this way */
        returnVal = array.slice(index)[0];
    }
    else {
        returnVal=array[index];
    }

    await assertIsGeneric(returnVal); return returnVal;
}

async function getNext(array, index) {
    await assertIsArray(array); await assertIsInt(index); let returnVal;

    returnVal=array[index + 1];

    await assertIsGeneric(returnVal); return returnVal;
}

async function first(array) {
    await assertIsArray(array); let returnVal;

    returnVal=array[0];

    await assertIsGeneric(returnVal); return returnVal;
}

async function last(array) {
    await assertIsArray(array); let returnVal;

    returnVal=array.slice(-1)[0];

    await assertIsGeneric(returnVal); return returnVal;
}

async function setElement(array, index, value) {
    await assertIsArray(array); await assertIsInt(index); await assertIsGeneric(value);

    let len = await count(array);
    if (index > count) {
        await implDie("Cannot insert to a position greater than appending to the length of the array.");
    }
    if (index < 0) {
        index = len + index;
    }
    array[index] = value;

    await assertIsArray(array); return array;
}

async function setElem(array, index, value) {
    return await setElement(array, index, value);
}

async function count(array) {
    if (array.constructor.name === 'Uint8Array') {
        return array.byteLength;
    }
    await assertIsArray(array);
    return Object.keys(array).length;
}
