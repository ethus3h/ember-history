/* type-conversion, provides:
    intFromIntStr
    strFrom
    charFromByte
    byteFromChar
*/

async function intFromIntStr(str) {
    await assertStrContainsOnlyInt(str); let intReturn;

    intReturn = parseInt(str, 10); await assertIsInt(intReturn); return intReturn;
}

async function strFrom(input) {
    await assertIsGeneric(input); let strReturn;

    strReturn = String(input); await assertIsStr(strReturn); return strReturn;
}

async function charFromByte(intInput) {
    await assertIsInt(intInput); let strReturn;

    // Expects a decimal byte as input. Bear in mind that StageL doesn't attempt to support Unicode.

    strReturn = String.fromCharCode(intInput); await assertIsStr(strReturn); return strReturn;
}

async function byteFromChar(strInput) {
    await assertIsStr(strInput);
    // Bear in mind that StageL doesn't attempt to support Unicode.
    // We can't use assertIsChar here, because it depends on byteFromChar.
    let intReturn;
    intReturn = strInput.charCodeAt(0);

    await assertIsTrue(intReturn > 31);
    await assertIsTrue(intReturn < 127);

    await assertIsInt(intReturn); return intReturn;
}

async function utf8BytesFromDecimalChar(intInput) {
    // Returns a Uint8 array of bytes representing the UTF-8 encoding of the character, given decimal representation of the character as input. FIXME: Probably doesn't support unpaired surrogates or byte sequences outside of the range allowed by Unicode characters, but it probably should.
    let utf8encoder = new TextEncoder();
    return utf8encoder.encode(String.fromCodePoint(intInput));
}

async function firstCharOfUtf8String(intArrayInput) {
    // Returns a decimal representing the Unicode codepoint of the first character, given decimal representation of a UTF-8 string as input.
    let utf8decoder = new TextDecoder();
    return utf8decoder.decode(new Uint8Array(intArrayInput)).codePointAt(0);
}

async function lastCharOfUtf8String(intArrayInput) {
    // Returns a decimal representing the Unicode codepoint of the last character, given decimal representation of a UTF-8 string as input.
    await assertIsTrue(await arrNonempty(intArrayInput));
    let utf8decoder = new TextDecoder();
    // You have got to be kidding me. https://web.archive.org/web/20190318025116/https://stackoverflow.com/questions/46157867/how-to-get-the-nth-unicode-character-from-a-string-in-javascript
    let tempStrCharArray = [...utf8decoder.decode(new Uint8Array(intArrayInput))];
    return tempStrCharArray.slice(-1)[0].codePointAt(0);
}

async function internalIntBitArrayToBasenbString(intBase, intBitArrayInput) {
    let res;
    res=Base16b.encode(intBitArrayInput, intBase);
    if (res !== false) {
        return new TextEncoder().encode(res);
    }
    await implDie('Base16b.encode returned false');
}

async function internalIntBitArrayFromBasenbString(byteArrayInput, intRemainder) {
    let res;
    res=Base16b.decode(new TextDecoder().decode(new Uint8Array(byteArrayInput)), intRemainder);
    if (res !== false) {
        return res;
    }
    await implDie('Base16b.decode returned false');
}

async function intArrayToBase64(byteArrayInput) {
    await assertIsByteArray(byteArrayInput); let strRes;
    // based on https://stackoverflow.com/questions/6978156/get-base64-encode-file-data-from-input-form
    let uint8ToString = function uint8ToString(buf) {
        let i;
        let length;
        let out = '';
        for (i = 0, length = buf.length; i < length; i += 1) {
            out += String.fromCharCode(buf[i]);
        }
        return out;
    }
    if (byteArrayInput.constructor.name !== 'Uint8Array') {
        byteArrayInput = new Uint8Array(byteArrayInput);
    }
    return btoa(uint8ToString(byteArrayInput));
}
