async function fbSwitcher(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitcher:in'); await assertIsInt(intNum); let strReturn;

    if (await implEq(0, 0)) {

        strReturn = 'a'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }
}
/* */
