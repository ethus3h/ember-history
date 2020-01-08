async function fbSwitcher(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitcher:in'); await assertIsInt(intNum); let strReturn;


    strReturn = 'Fizz'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function fbSwitchar(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitchar:in'); await assertIsInt(intNum); let strReturn;


    strReturn = 'Fazz'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}
