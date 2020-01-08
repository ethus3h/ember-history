async function fbSwitcher(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitcher:in'); await assertIsInt(intNum); let strReturn;

    /* Test comment; semicolon */

    strReturn = ''; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}
