async function strFromByte(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('strFromByte:in'); await assertIsInt(intIn); let strReturn;

    let strArrayChars = [];
    strArrayChars = [ '', '', '', '', '', '', '' ];
    /* 0 through 6 */
    let strArrayTemp = [];
    strArrayTemp = [ 'd', 'b', 'l', 
    'c', 'b', 'a' ];
    await append(strArrayChars, strArrayTemp);
}
