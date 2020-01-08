async function fbSwitcher(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitcher:in'); await assertIsInt(intNum); let strReturn;

    if (await implEq(0, await implMod(intNum, 15))) {
        /* just a literal sequence of bytes. Everything should be binary safe. 0x could be used to return data, too. 0x = data, not numbers, in StageL. */

        strReturn = 'FizzBuzz'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }
    /* Comment */
    if (await implEq(0, await implMod(intNum, 5))) {
        /* Comment 2 */

        strReturn = 'Buzz'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
        /* Comment 3 */
    }
    if (/* Could also write it like this, with the condition on another line */

        await implEq(0, await implMod(intNum, 3))) {
        /* Comment 4 */

        strReturn = 'Fizz'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }
}
