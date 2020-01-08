
async function fbSwitcher(intNum) {
    await assertIsInt(intNum); let strReturn;

    if (await implEq(0, await implMod(intNum, 15))) {

        strReturn = 'Buzz'; await assertIsStr(strReturn); return strReturn;
    }
}
