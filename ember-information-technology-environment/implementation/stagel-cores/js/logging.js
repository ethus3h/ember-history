/* logging, provides:
    implDie
    implWarn
    implLog
    implDebug
    setDebugLevel
    FIXMEUnimplemented
*/

async function implDie(strMessage) {
    // Don't call await assertIsStr(strMessage); here since it can call implDie and cause a recursive loop

    await implError(strMessage);

    throw strMessage;
}

async function implError(strMessage) {
    if(typeof strMessage !== "string") {
        throw "Nonstring error message";
    }
    // Don't call await assertIsStr(strMessage); here since it can call implDie and cause a recursive loop — maybe??

    //await FIXMEUnimplemented("implError");
    await implWarn(strMessage);
}

async function implWarn(strMessage) {
    if(typeof strMessage !== "string") {
        throw "Nonstring error message";
    }
    await assertIsStr(strMessage);
    // Log the provided message

    await FIXMEUnimplemented("implWarn");

    await implLog(strMessage);
}

async function implLog(strMessage) {
    if(typeof strMessage !== "string") {
        throw "Nonstring error message";
    }
    await assertIsStr(strMessage);
    // Log the provided message
    await console.log(strMessage);
    // use getWindowOrSelf instead of getSharedState to avoid recursion
    let temp=getWindowOrSelf()['stagelDebugCallstack'];
    if(temp !== undefined) {
        if(await Object.keys(temp).length > 0) {
            await console.log("Previous message sent at: " + await internalDebugPrintStack());
        }
        else {
            // use getWindowOrSelf instead of getSharedState to avoid recursion
            if (2 <= getWindowOrSelf()['STAGEL_DEBUG']) {
                await console.log("(Previous message sent from non-StageL code.)");
            }
        }
    }
    else {
        console.log('Warning: implLog called before EITE finished setting up. Log message is: '+strMessage);
    }
}

async function implDebug(strMessage, intLevel) {
    if(typeof strMessage !== "string") {
        throw "Nonstring error message";
    }
    if ((! Number.isInteger(intLevel)) || typeof intLevel === "undefined" || intLevel === null || intLevel < -2147483648 || intLevel > 2147483647) {
        throw "Non-integer debug level";
    }
    await assertIsStr(strMessage); await assertIsInt(intLevel);
    // Log the provided message

    // use getWindowOrSelf instead of getSharedState to avoid recursion
    if (intLevel <= getWindowOrSelf()['STAGEL_DEBUG']) {
        await implLog(strMessage);
    }
}

async function setDebugLevel(intLevel) {
    await assertIsInt(intLevel);
    // Set the debug level to the level specified. Int from 0 to 2 inclusive. Default 0. 0 = no debug messages printed; 1 = normal debug messages printed; 2 = block entry printed; 3 = verbose printing

    await setSharedState('STAGEL_DEBUG', intLevel);
}

async function FIXMEUnimplemented(strLocation) {
    await assertIsStr(strLocation);

    await implLog("FIXME: Unimplemented in " + strLocation);
}

// Internal functions

async function internalDebugQuiet(strMessage, intLevel) {
    await assertIsStr(strMessage); await assertIsInt(intLevel);
    // Log the provided message, but don't print a trace for it

    if (intLevel <= getWindowOrSelf()['STAGEL_DEBUG']) {
        // await implLog(strMessage);
        console.log(strMessage);
    }
}

async function internalDebugCollect(strMessageFragment) {
    getWindowOrSelf()['stagelDebugCollection'] = getWindowOrSelf()['stagelDebugCollection'] + strMessageFragment;
}

async function internalDebugFlush() {
    /* console.log("Flushing debug message fragment collector, which contains: " + stagelDebugCollection); */
    let temp;
    temp = getWindowOrSelf()['stagelDebugCollection'];
    getWindowOrSelf()['stagelDebugCollection'] = "";
    return temp;
}

async function internalDebugStackEnter(strBlockName) {
    if (strBlockName === undefined) {
        await implDie("Block entry specified but no block name given");
    }

    let tempCounts;

    let tempNames = getWindowOrSelf()['stagelDebugCallNames'];
    if (tempNames.indexOf(strBlockName) < 0) {
        tempNames=getWindowOrSelf()['stagelDebugCallNames'];
        tempNames.push(strBlockName);
        getWindowOrSelf()['stagelDebugCallNames'] = tempNames;
        tempNames=getWindowOrSelf()['stagelDebugCallNames'];
        tempCounts=getWindowOrSelf()['stagelDebugCallCounts'];
        tempCounts[tempNames.indexOf(strBlockName)] = 0;
        getWindowOrSelf()['stagelDebugCallCounts'] = tempCounts;
    }

    let ind;
    tempNames=getWindowOrSelf()['stagelDebugCallNames'];
    ind = tempNames.indexOf(strBlockName);
    tempCounts=getWindowOrSelf()['stagelDebugCallCounts'];
    tempCounts[ind] = tempCounts[ind] + 1;
    getWindowOrSelf()['stagelDebugCallCounts'] = tempCounts;

    let temp;
    temp=getWindowOrSelf()['stagelDebugCallstack'];
    temp.push(strBlockName + " (" + await internalDebugFlush() + ")");
    getWindowOrSelf()['stagelDebugCallstack'] = temp;

    if (2 <= getWindowOrSelf()['STAGEL_DEBUG']) {
        let callstackLevel=stagelDebugCallstack.length;
        let callstackLevelStr='';
        let i=0;
        while (i<callstackLevel) {
            if (i%4 === 0) {
                callstackLevelStr=callstackLevelStr+'|';
            }
            else {
                callstackLevelStr=callstackLevelStr+':';
            }
            i=i+1;
        }
        //let callstackLevelStr=":".repeat(callstackLevel);
        await internalDebugQuiet(callstackLevelStr+"Entered block: " + (getWindowOrSelf()['stagelDebugCallstack']).slice(-1)[0], 2);
    }
}

async function internalDebugStackExit() {
    //alert("Dbgstackext");
    let tempStack;
    tempStack=getWindowOrSelf()['stagelDebugCallstack'];
    if (tempStack.slice(-1)[0] === undefined) {
        await implDie("Exited block, but no block on stack");
    }
    tempStack=getWindowOrSelf()['stagelDebugCallstack'];
    await internalDebugQuiet("Exited block: " + await tempStack.pop(), 3);
    getWindowOrSelf()['stagelDebugCallstack'] = tempStack;
}

async function internalDebugPrintHotspots() {
    let n = 0;
    n = getWindowOrSelf()['stagelDebugCallNames'].length;
    let i = 0;
    if (n === 0) {
        console.log('No routine calls have been logged.');
    }
    while (i < n){
        console.log(getWindowOrSelf()['stagelDebugCallNames'][i] + ' was called ' + getWindowOrSelf()['stagelDebugCallCounts'][i] + ' times.');
        i = i + 1;
    }
    let sum = 0;
    sum = getWindowOrSelf()['stagelDebugCallCounts'].reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    console.log('Total function calls: ' + sum);
}

async function internalDebugPrintStack() {
    let i;
    // use getWindowOrSelf instead of getSharedState to avoid recursion
    i = await Object.keys(getWindowOrSelf()['stagelDebugCallstack']).length - 1;
    let result="";
    let arrow=" < "
    while (i>=0) {
        /* FIXME: This could probably be optimized if it's problematically slow. */
        if (i==0) {
            arrow=""
        }
        result = result + getWindowOrSelf()['stagelDebugCallstack'].slice(i)[0] + arrow;
        i = i - 1;
    }
    return result;
}

async function internalDebugLogJSObject(obj) {
    if (1 <= await getWindowOrSelf()['STAGEL_DEBUG']) {
        console.log(obj);
    }
}
