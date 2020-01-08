async function fbSwitcher(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitcher:in'); await assertIsInt(intNum); let strReturn;

    if (await implEq(0, await implMod(intNum, 15))) {

        strReturn = 'Buzz'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }
}
