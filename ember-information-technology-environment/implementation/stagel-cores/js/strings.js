/* strings, provides:
    implCat
    substring
    len
*/

async function implCat(strA, strB) {
    await assertIsStr(strA); await assertIsStr(strB); let strReturn;

    return strA + "" + strB;
}

async function substring(str, intStart, intLength) {
    await assertIsStr(str); await assertIsInt(intStart); await assertIsInt(intLength); let strReturn;

    if (intLength < 0) {
        intLength = str.length + 1 + intLength;
    }

    return str.substring(intStart, intStart + intLength);
}

async function len(str) {
    await assertIsStr(str); let intReturn;

    return str.length;
}

async function strReplace(str, find, replace) {
    await assertIsStr(str); await assertIsStr(find); await assertIsStr(replace);

    return str.replace(find+'', replace+''.replace('$', '$$'));
}
