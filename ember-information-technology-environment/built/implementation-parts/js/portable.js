// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

async function dcaFromFormat(strInFormat, intArrayContentBytes) {
    await internalDebugCollect('str InFormat = ' + strInFormat + '; '); await internalDebugCollect('intArray ContentBytes = ' + intArrayContentBytes + '; '); await internalDebugStackEnter('dcaFromFormat:formats'); await assertIsStr(strInFormat); await assertIsIntArray(intArrayContentBytes); let intArrayReturn;

    await assertIsSupportedInputFormat(strInFormat);
    await assertIsByteArray(intArrayContentBytes);
    let intArrayRes = [];
    if (await implEq(strInFormat, 'sems')) {
        intArrayRes = await dcaFromSems(intArrayContentBytes);
    }
    else if (await implEq(strInFormat, 'integerList')) {
        intArrayRes = await dcaFromIntegerList(intArrayContentBytes);
    }
    else if (await implEq(strInFormat, 'ascii')) {
        intArrayRes = await dcaFromAscii(intArrayContentBytes);
    }
    else if (await implEq(strInFormat, 'asciiSafeSubset')) {
        intArrayRes = await dcaFromAsciiSafeSubset(intArrayContentBytes);
    }
    else if (await implEq(strInFormat, 'utf8')) {
        intArrayRes = await dcaFromUtf8(intArrayContentBytes);
    }
    else {
        await implError(await implCat('Unimplemented document parsing format: ', strInFormat));
    }
    await assertIsDcArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToFormat(strOutFormat, intArrayDcArrayIn) {
    await internalDebugCollect('str OutFormat = ' + strOutFormat + '; '); await internalDebugCollect('intArray DcArrayIn = ' + intArrayDcArrayIn + '; '); await internalDebugStackEnter('dcaToFormat:formats'); await assertIsStr(strOutFormat); await assertIsIntArray(intArrayDcArrayIn); let intArrayReturn;

    await assertIsSupportedOutputFormat(strOutFormat);
    await assertIsDcArray(intArrayDcArrayIn);
    let intArrayRes = [];
    if (await implEq(strOutFormat, 'integerList')) {
        intArrayRes = await dcaToIntegerList(intArrayDcArrayIn);
    }
    else if (await implEq(strOutFormat, 'ascii')) {
        intArrayRes = await dcaToAscii(intArrayDcArrayIn);
    }
    else if (await implEq(strOutFormat, 'asciiSafeSubset')) {
        intArrayRes = await dcaToAsciiSafeSubset(intArrayDcArrayIn);
    }
    else if (await implEq(strOutFormat, 'colorcoded')) {
        intArrayRes = await dcaToColorcoded(intArrayDcArrayIn);
    }
    else if (await implEq(strOutFormat, 'utf8')) {
        intArrayRes = await dcaToUtf8(intArrayDcArrayIn);
    }
    else if (await implEq(strOutFormat, 'html')) {
        intArrayRes = await dcaToHtml(intArrayDcArrayIn);
    }
    else if (await implEq(strOutFormat, 'htmlFragment')) {
        intArrayRes = await dcaToHtmlFragment(intArrayDcArrayIn);
    }
    else {
        await implDie(await implCat('Unimplemented document render output format: ', strOutFormat));
    }
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function convertFormats(strInFormat, strOutFormat, intArrayIn) {
    await internalDebugCollect('str InFormat = ' + strInFormat + '; '); await internalDebugCollect('str OutFormat = ' + strOutFormat + '; '); await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('convertFormats:formats'); await assertIsStr(strInFormat); await assertIsStr(strOutFormat); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsSupportedInputFormat(strInFormat);
    await assertIsSupportedOutputFormat(strOutFormat);
    await assertIsByteArray(intArrayIn);
    let intArrayOut = [];
    intArrayOut = await dcaToFormat(strOutFormat, await dcaFromFormat(strInFormat, intArrayIn));
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function getExportExtension(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getExportExtension:formats'); await assertIsStr(strFormat); let strReturn;

    /* Produces the actual file extension to be used for a file exported in the given format, with the current configured format options. */
    let strRes = '';
    if (await isSupportedCharEncoding(strFormat)) {
        strRes = await implCat(await getFormatExtension(strFormat), '.txt');

        strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }
    strRes = await getFormatExtension(strFormat);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcToFormat(strOutFormat, intDc) {
    await internalDebugCollect('str OutFormat = ' + strOutFormat + '; '); await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcToFormat:formats'); await assertIsStr(strOutFormat); await assertIsInt(intDc); let intArrayReturn;

    /* Output byte array for a single dc, or an empty array if no output is available. Only operates on one Dc at a time. Some formats may not need this; calling with them is an error and should cause an assertion failure. */
    await assertIsSupportedOutputFormat(strOutFormat);
    await assertIsDc(intDc);
    let intArrayRes = [];
    let strTemp = '';
    if (await implEq(strOutFormat, 'utf8')) {
        let strLookup = '';
        strLookup = await dcDataLookupById('mappings/to/unicode', intDc, 1);
        if (await excOrEmpty(strLookup)) {
            strLookup = await dcDataLookupByValue('mappings/from/unicode', 1, intDc, 0);
        }
        if (await notExcep(strLookup)) {
            intArrayRes = await utf8BytesFromDecimalChar(await hexToDec(strLookup));
        }
    }
    else if (await implEq(strOutFormat, 'colorcoded')) {
        intArrayRes = await dcToColorcoded(intDc);
    }
    else if (await implEq(strOutFormat, 'html')) {
        strTemp = await dcDataLookupById('mappings/to/html', intDc, 1);
        if (await strNonempty(strTemp)) {
            intArrayRes = await strToByteArray(strTemp);
        }
        else {
            strTemp = await dcDataLookupByValue('mappings/from/unicode', 1, intDc, 0);
            if (await isBaseStr(strTemp, 16)) {
                intArrayRes = await append(intArrayRes, await utf8BytesFromDecimalChar(await hexToDec(strTemp)));
            }
        }
    }
    else {
        await implDie(await implCat('Unimplemented character output format: ', strOutFormat));
    }
    /* Returns an empty array if the Dc isn't printable. I don't think it should be an error to call this for a nonprintable Dc. */
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcFromFormat(strInFormat, intArrayContent) {
    await internalDebugCollect('str InFormat = ' + strInFormat + '; '); await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcFromFormat:formats'); await assertIsStr(strInFormat); await assertIsIntArray(intArrayContent); let intArrayReturn;

    /* Retrieve dc (as a one-element array) corresponding to the input data (input data for some formats may be expected as byte arrays, but not for others), or an empty array if no match. Only operates on one Dc at a time. Some formats (e.g. sems) don't need this; calling with them is an error and should cause an assertion failure. */
    await assertIsTrue(await isSupportedInternalFormat(strInFormat));
    let intArrayRes = [];
    let intDc = 0;
    let strTemp = '';
    if (await or(await implEq(strInFormat, 'ascii'), await implEq(strInFormat, 'unicode'))) {
        let intC = 0;
        intC = await get(intArrayContent, 0);
        if (await implEq(strInFormat, 'ascii')) {
            if (await implNot(await isAsciiByte(intC))) {
                await implDie(await implCat('The character number ', await implCat(await strFrom(intC), ' is not a 7-bit ASCII character.')));
            }
        }
        await assertIsNonnegative(intC);
        strTemp = await dcDataLookupByValue('mappings/from/unicode', 0, await decToHex(intC), 1);
        if (await excep(strTemp)) {
            await implWarn(await implCat('FIXME: save unmapped unicode char ', await strFrom(intC)));

            intArrayReturn = [  ]; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
        }
        intDc = await intFromIntStr(strTemp);
    }
    else {
        await implDie(await implCat('Unimplemented character source format: ', strInFormat));
    }
    intArrayRes = await setElement(intArrayRes, 0, intDc);
    await assertIsDcArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function importWarning(intIndex, strProblem) {
    await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugCollect('str Problem = ' + strProblem + '; '); await internalDebugStackEnter('importWarning:formats'); await assertIsInt(intIndex); await assertIsStr(strProblem);

    let strWarning = '';
    strWarning = await implCat('A problem was encountered while importing at character ', await implCat(await strFrom(intIndex), await implCat(': ', strProblem)));
    strArrayImportWarnings = await push(strArrayImportWarnings, strWarning);
    await implWarn(strWarning);

    await internalDebugStackExit();
}

async function exportWarning(intIndex, strProblem) {
    await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugCollect('str Problem = ' + strProblem + '; '); await internalDebugStackEnter('exportWarning:formats'); await assertIsInt(intIndex); await assertIsStr(strProblem);

    let strWarning = '';
    strWarning = await implCat('A problem was encountered while exporting at character ', await implCat(await strFrom(intIndex), await implCat(': ', strProblem)));
    strArrayExportWarnings = await push(strArrayExportWarnings, strWarning);
    await implWarn(strWarning);

    await internalDebugStackExit();
}

async function getImportWarnings() {
    await internalDebugStackEnter('getImportWarnings:formats'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = strArrayImportWarnings;
    strArrayImportWarnings = [  ];

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getExportWarnings() {
    await internalDebugStackEnter('getExportWarnings:formats'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = strArrayExportWarnings;
    strArrayExportWarnings = [  ];

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function exportWarningUnmappable(intIndex, intProblemDc) {
    await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugCollect('int ProblemDc = ' + intProblemDc + '; '); await internalDebugStackEnter('exportWarningUnmappable:formats'); await assertIsInt(intIndex); await assertIsInt(intProblemDc);

    await exportWarning(intIndex, await implCat('The character ', await implCat(await strFrom(intProblemDc), ' could not be represented in the chosen export format.')));

    await internalDebugStackExit();
}

async function runTestsFormatDc(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatDc:format-dc-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatDc');
    await runTest(boolV, await dcIsPrintable(21));
    await runTest(boolV, await implNot(await dcIsPrintable(231)));
    await runTest(boolV, await dcIsNewline(120));

    await internalDebugStackExit();
}

async function runTestsPack32(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsPack32:pack32-tests'); await assertIsBool(boolV);

    await testing(boolV, 'pack32');
    await runTest(boolV, await implEq(0, await unpack32(await pack32(0))));
    await runTest(boolV, await implEq(10, await unpack32(await pack32(10))));
    await runTest(boolV, await implEq(100, await unpack32(await pack32(100))));
    await runTest(boolV, await implEq(1000, await unpack32(await pack32(1000))));
    await runTest(boolV, await implEq(10000, await unpack32(await pack32(10000))));

    await internalDebugStackExit();
}

async function isDc(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('isDc:format-dc'); await assertIsGeneric(genericIn); let boolReturn;

    if (await implNot(await isInt(genericIn))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intNum = 0;
    intNum = genericIn;
    let boolRes = false;
    boolRes = await isNonnegative(intNum);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isKnownDc(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('isKnownDc:format-dc'); await assertIsGeneric(genericIn); let boolReturn;

    if (await implNot(await isDc(genericIn))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    if (await implGt(genericIn, await maximumKnownDc())) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function maximumKnownDc() {
    await internalDebugStackEnter('maximumKnownDc:format-dc'); let intReturn;

    let strRes = '';
    strRes = await dcDatasetLength('DcData');

    intReturn = strRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function dcIsNewline(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcIsNewline:format-dc'); await assertIsInt(intDc); let boolReturn;

    await assertIsDc(intDc);
    /* This function returns whether a character should be treated as a newline, in general. Individual characters may have more complex or ambiguous meanings (see details in DcData.csv), but this is useful as a general guide. */
    /* We can't just use: */
    /*if eq 'B' dcGetBidiClass n/dc */
    /*    return true */
    /* because that means "Paragraph_Separator" bidi class, and includes some things that really shouldn't be considered newlines from what I can tell (information separator two through four), and does not include some things that are (U+2028 Line Separator). */
    if (await contains([ 119, 120, 121, 240, 294, 295 ], intDc)) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dcIsSpace(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcIsSpace:format-dc'); await assertIsInt(intDc); let boolReturn;

    await assertIsDc(intDc);
    if (await implEq('Zs', await dcGetType(intDc))) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dcIsPrintable(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcIsPrintable:format-dc'); await assertIsInt(intDc); let boolReturn;

    await assertIsDc(intDc);
    let strType = '';
    strType = await dcGetType(intDc);
    let strGeneralType = '';
    strGeneralType = await strChar(strType, 0);
    if (await or(await implEq('Zl', strType), await implEq('Zp', strType))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    if (await or(await implEq('!', strGeneralType), await implEq('C', strGeneralType))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dcIsELCode(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcIsELCode:format-dc'); await assertIsInt(intDc); let boolReturn;

    await assertIsDc(intDc);
    let boolRes = false;
    boolRes = await implEq('EL ', await substr(await dcGetScript(intDc), 0, 3));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dcGetELClass(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetELClass:format-dc'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await substr(await dcGetScript(intDc), 3, -1);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function listDcDatasets() {
    await internalDebugStackEnter('listDcDatasets:dc-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = [ 'DcData', 'formats', 'mappings/from/ascii', 'mappings/from/unicode', 'mappings/to/html', 'mappings/to/lang_en', 'mappings/to/unicode' ];

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function dcGetColumn(strDataset, intColumn) {
    await internalDebugCollect('str Dataset = ' + strDataset + '; '); await internalDebugCollect('int Column = ' + intColumn + '; '); await internalDebugStackEnter('dcGetColumn:dc-data'); await assertIsStr(strDataset); await assertIsInt(intColumn); let strArrayReturn;

    let strArrayRes = [];
    let intCount = 0;
    intCount = await dcDatasetLength(strDataset);
    let intI = 0;
    while (await implLt(intI, intCount)) {
        strArrayRes = await push(strArrayRes, await dcDataLookupById(strDataset, intI, intColumn));
        intI = await implAdd(intI, 1);
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getDcCount() {
    await internalDebugStackEnter('getDcCount:dc-data'); let intReturn;

    let intRes = 0;
    intRes = await dcDatasetLength('DcData');
}

async function isDcDataset(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isDcDataset:dc-data'); await assertIsStr(strIn); let boolReturn;

    let boolRes = false;
    boolRes = await contains(await listDcDatasets(), strIn);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dcGetField(intDc, intFieldNumber) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugCollect('int FieldNumber = ' + intFieldNumber + '; '); await internalDebugStackEnter('dcGetField:dc-data'); await assertIsInt(intDc); await assertIsInt(intFieldNumber); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcDataLookupById('DcData', intDc, intFieldNumber);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetName(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetName:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 1);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetCombiningClass(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetCombiningClass:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 2);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetBidiClass(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetBidiClass:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 3);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetCasing(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetCasing:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 4);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetType(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetType:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 5);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetScript(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetScript:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 6);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetComplexTraits(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetComplexTraits:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 7);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetDescription(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcGetDescription:dc-data'); await assertIsInt(intDc); let strReturn;

    await assertIsDc(intDc);
    let strRes = '';
    strRes = await dcGetField(intDc, 8);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

/* Note that the Basenb formats provided here are different from the Base16b formats in the specification, due to what appears to be a bug in the specification (requiring the remainder length to be stored to decode the remainder correctly when it starts with a 0 bit and is not 16 bits long). */

async function byteToIntBitArray(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('byteToIntBitArray:basenb-utf8'); await assertIsInt(intIn); let intArrayReturn;

    await assertIsByte(intIn);
    let intArrayRes = [];
    let strTemp = '';
    strTemp = await intToBaseStr(intIn, 2);
    let intLen = 0;
    let intI = 0;
    intLen = await len(strTemp);
    let intArrayZero = [];
    intArrayZero = [ 0 ];
    while (await implLt(intI, intLen)) {
        intArrayRes = await push(intArrayRes, await intFromIntStr(await strChar(strTemp, intI)));
        intI = await implAdd(intI, 1);
    }
    while (await implGt(8, await count(intArrayRes))) {
        intArrayRes = await push(intArrayZero, intArrayRes);
    }
    await assertIsIntBitArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function byteFromIntBitArray(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteFromIntBitArray:basenb-utf8'); await assertIsIntArray(intArrayIn); let intReturn;

    await assertIsIntBitArray(intArrayIn);
    let intRes = 0;
    let strTemp = '';
    let intLen = 0;
    let intI = 0;
    intLen = await count(intArrayIn);
    while (await implLt(intI, intLen)) {
        strTemp = await implCat(strTemp, await strFrom(await get(intArrayIn, intI)));
        intI = await implAdd(intI, 1);
    }
    intRes = await intFromBaseStr(strTemp, 2);
    await assertIsByte(intRes);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function byteArrayToIntBitArray(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayToIntBitArray:basenb-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsByteArray(intArrayIn);
    let intArrayRes = [];
    let intLen = 0;
    let intI = 0;
    intLen = await count(intArrayIn);
    while (await implLt(intI, intLen)) {
        intArrayRes = await push(intArrayRes, await byteToIntBitArray(await get(intArrayIn, intI)));
        intI = await implAdd(intI, 1);
    }
    await assertIsIntBitArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function byteArrayFromIntBitArray(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayFromIntBitArray:basenb-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsIntBitArray(intArrayIn);
    let intArrayRes = [];
    let intLen = 0;
    let intI = 0;
    intLen = await count(intArrayIn);
    let intArrayTemp = [];
    while (await le(intI, intLen)) {
        if (await implAnd(await implEq(0, await implMod(intI, 8), ), await implNot(await implEq(0, await count(intArrayTemp))))) {
            intArrayRes = await push(intArrayRes, await byteFromIntBitArray(intArrayTemp));
            intArrayTemp = [  ];
        }
        if (await implLt(intI, intLen)) {
            intArrayTemp = await push(intArrayTemp, await get(intArrayIn, intI));
        }
        intI = await implAdd(intI, 1);
    }
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function isBasenbBase(intBase) {
    await internalDebugCollect('int Base = ' + intBase + '; '); await internalDebugStackEnter('isBasenbBase:basenb-utf8'); await assertIsInt(intBase); let boolReturn;

    let boolRes = false;
    boolRes = await intIsBetween(intBase, 7, 17);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isBasenbChar(intArrayUtf8Char) {
    await internalDebugCollect('intArray Utf8Char = ' + intArrayUtf8Char + '; '); await internalDebugStackEnter('isBasenbChar:basenb-utf8'); await assertIsIntArray(intArrayUtf8Char); let boolReturn;

    let boolRes = false;
    boolRes = false;
    if (await implNot(await isPack32Char(intArrayUtf8Char))) {

        boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intCodepoint = 0;
    intCodepoint = await unpack32(intArrayUtf8Char);
    if (await intIsBetween(intCodepoint, 983040, 1048573)) {
        boolRes = true;
    }
    else if (await intIsBetween(intCodepoint, 1048576, 1114109)) {
        boolRes = true;
    }
    else if (await intIsBetween(intCodepoint, 63481, 63501)) {
        boolRes = true;
    }

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isBasenbDistinctRemainderChar(intArrayUtf8Char) {
    await internalDebugCollect('intArray Utf8Char = ' + intArrayUtf8Char + '; '); await internalDebugStackEnter('isBasenbDistinctRemainderChar:basenb-utf8'); await assertIsIntArray(intArrayUtf8Char); let boolReturn;

    let boolRes = false;
    boolRes = false;
    if (await implNot(await isPack32Char(intArrayUtf8Char))) {

        boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intCodepoint = 0;
    intCodepoint = await unpack32(intArrayUtf8Char);
    if (await intIsBetween(intCodepoint, 63481, 63497)) {
        boolRes = true;
    }

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function byteArrayToBasenbUtf8(intBase, intArrayIn) {
    await internalDebugCollect('int Base = ' + intBase + '; '); await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayToBasenbUtf8:basenb-utf8'); await assertIsInt(intBase); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsTrue(await isBasenbBase(intBase));
    await assertIsByteArray(intArrayIn);
    let intArrayInputIntBitArray = [];
    intArrayInputIntBitArray = await byteArrayToIntBitArray(intArrayIn);
    let intArrayRes = [];
    intArrayRes = await internalIntBitArrayToBasenbString(intBase, intArrayInputIntBitArray);
    /* The remainder length also needs to be stored, to be able to decode successfully. We'll calculate, encode, and append it. It's always 4 bytes, 1 UTF-8 character, and 2 UTF-16 characters long, after encoding (it has 2 added to it to make it always be the same byte length and UTF-16 length; this must be subtracted before passing it to the Base16b.decode function). */
    /* Previous version, which doesn't provide clear end-of-character markers: */
    /* new an/remainder */
    /* set an/remainder push an/remainder add 2 mod count an/inputIntBitArray } 17 */
    /* set an/res push an/res internalIntBitArrayToBasenbString 17 byteArrayToIntBitArray an/remainder */
    intArrayRes = await push(intArrayRes, await pack32(await implSub(63497, await implMod(await count(intArrayInputIntBitArray), 17))));
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function byteArrayFromBasenbUtf8(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayFromBasenbUtf8:basenb-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsByteArray(intArrayIn);
    let intArrayRes = [];
    /* Extract remainder length */
    let intRemainder = 0;
    let intArrayRemainderArr = [];
    /* last 3 bytes (1 character), which represent the remainder */
    intArrayRemainderArr = await anSubset(intArrayIn, -3, -1);
    if (await implNot(await isBasenbDistinctRemainderChar(intArrayRemainderArr))) {
        /* last 4 bytes (1 character), which represent the remainder */
        intArrayRemainderArr = await anSubset(intArrayIn, -4, -1);
        let intArrayRemainderDecodedArr = [];
        intArrayRemainderDecodedArr = await byteArrayFromIntBitArray(await internalIntBitArrayFromBasenbString(intArrayRemainderArr, 8));
        intRemainder = await implAdd(-2, await get(intArrayRemainderDecodedArr, 0));
    }
    else {
        intRemainder = await implSub(63497, await unpack32(intArrayRemainderArr));
    }
    if (await ngt(await count(intArrayIn), await count(intArrayRemainderArr))) {
        /* All we have is a remainder, or a chunk of a character without a remainder, so return an exception UUID to represent the error (3362daa3-1705-40ec-9a97-59d052fd4037) */
        intArrayRes = [ 51, 98, 218, 163, 23, 5, 64, 236, 154, 151, 89, 208, 82, 253, 64, 55 ];

        intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
    }
    intArrayRes = await byteArrayFromIntBitArray(await internalIntBitArrayFromBasenbString(await anSubset(intArrayIn, 0, await implAdd(-1, await implMul(-1, await count(intArrayRemainderArr), ), ), ), intRemainder));
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function byteArrayToBase17bUtf8(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayToBase17bUtf8:basenb-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    /* Convenience wrapper */
    let intArrayRes = [];
    intArrayRes = await byteArrayToBasenbUtf8(17, intArrayIn);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function byteArrayFromBase17bUtf8(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayFromBase17bUtf8:basenb-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    /* Convenience wrapper */
    let intArrayRes = [];
    intArrayRes = await byteArrayFromBasenbUtf8(intArrayIn);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function getArmoredUtf8EmbeddedStartUuid() {
    await internalDebugStackEnter('getArmoredUtf8EmbeddedStartUuid:basenb-utf8'); let intArrayReturn;

    /* start UUID=e82eef60-19bc-4a00-a44a-763a3445c16f */
    /*new an/startUuid */
    /*set an/startUuid ( 232 46 239 96 25 188 74 0 164 74 118 58 52 69 193 111 ) */
    /* byteArrayToIntBitArray([ 232, 46, 239, 96, 25, 188, 74, 0, 164, 74, 118, 58, 52, 69, 193, 111 ]).then(function(v){return new TextEncoder().encode(Base16b.encode(v, 17));}).then(function(v){console.log(v.toString());}) */
    /* UTF8 in binary: 1,1,1,1,0,1,0,0,1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,1,0,1,1,1,1,1,0,1,0,0,1,0,0,0,1,0,1,1,1,0,1,1,0,1,1,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,0,1,0,1,1,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,1,1,1,0,0,1,1,1,0,1,1,1,0,0,0,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,1,1,1,1,0,1,0,0,1,0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,0,0,1,1,0,1,1,1,1,1,0,0,1,1,1,0,1,1,0,0,1,0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,0,1,0,0,0,0 */
    /* Note that the remainder length for the encoded UUID is 9. */
    let intArrayStartUuidUtf8 = [];
    intArrayStartUuidUtf8 = [ 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144 ];

    intArrayReturn = intArrayStartUuidUtf8; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function getArmoredUtf8EmbeddedEndUuid() {
    await internalDebugStackEnter('getArmoredUtf8EmbeddedEndUuid:basenb-utf8'); let intArrayReturn;

    /* end UUID=60bc936b-f10f-4f50-ab65-3778084060e2 */
    /*new an/endUuid */
    /*set an/endUuid ( 96 188 147 107 241 15 79 80 171 101 55 120 8 64 96 226 ) */
    /* byteArrayToIntBitArray([ 96, 188, 147, 107, 241, 15, 79, 80, 171, 101, 55, 120, 8, 64, 96, 226 ]).then(function(v){return new TextEncoder().encode(Base16b.encode(v, 17));}).then(function(v){console.log(v.toString());}) */
    let intArrayEndUuidUtf8 = [];
    intArrayEndUuidUtf8 = [ 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157 ];

    intArrayReturn = intArrayEndUuidUtf8; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}
/*r/an/byteArrayToArmoredBase17bUtf8 an/in */
/*    assertIsByteArray an/in */
/*    new an/res */
/*    set an/res getArmoredBase17bUtf8StartUuid */
/*    set an/res append an/res eiteHostCall 'internalIntBitArrayToBase17bString' byteArrayToIntBitArray an/in */
/*    assertIsByteArray an/res */
/*    set an/res append an/res getArmoredBase17bUtf8EndUuid */
/*    return an/res */
/*r/an/byteArrayFromArmoredBase17bUtf8 an/in */
/*    assertIsByteArray an/in */
/*    new an/temp */
/*    set an/temp getArmoredBase17bUtf8StartUuid */
/*    assertIsTrue eq an/temp anSubset an/in 0 count an/temp */
/*    set an/temp getArmoredBase17bUtf8EndUuid */
/*    assertIsTrue eq an/temp anSubset an/in -1 sub -1 count an/temp */
/*    new an/res */
/*    set an/res eiteHostCall 'internalIntBitArrayFromBase17bString' an/in */
/*    assertIsByteArray an/res */
/*    return an/res */

/* This is an attempt at packing arbitrary 32-bit unsigned? ints losslessly in a manner similar to UTF-8. For now, it is simply a wrapper around WTF-8 (UTF-8 but allowing unpaired surrogates). Consequently, it only supports a chunk of the 32 bit numbers. Later it can be extended to support all. Note that these functions take *signed* ints as input at least for the moment. */

async function pack32(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('pack32:pack32'); await assertIsInt(intIn); let intArrayReturn;

    let intArrayRes = [];
    intArrayRes = await intArrayPackWtf8(intIn);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function unpack32(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('unpack32:pack32'); await assertIsIntArray(intArrayIn); let intReturn;

    let intRes = 0;
    intRes = await intUnpackWtf8(intArrayIn);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function isPack32Char(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('isPack32Char:pack32'); await assertIsIntArray(intArrayIn); let boolReturn;

    let boolRes = false;
    boolRes = await boolIsUnpackableWtf8(intArrayIn);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function runTestsDcData(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsDcData:dc-data-tests'); await assertIsBool(boolV);

    await testing(boolV, 'dcData');
    await runTest(boolV, await implEq('B', await dcGetBidiClass(120)));

    await internalDebugStackExit();
}

async function getSettingForFormat(strFormat, strDirection, strSettingKey) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugCollect('str SettingKey = ' + strSettingKey + '; '); await internalDebugStackEnter('getSettingForFormat:formats-settings'); await assertIsStr(strFormat); await assertIsStr(strDirection); await assertIsStr(strSettingKey); let strReturn;

    /* s/direction can be "in" for import settings or "out" for export settings. */
    let strArrayTemp = [];
    strArrayTemp = await getSettingsForFormat(strFormat, strDirection);
    let strRes = '';
    if (await contains(strArrayTemp, strSettingKey)) {
        strRes = await getNext(strArrayTemp, await indexOf(strArrayTemp, strSettingKey));
    }
    else {
        strRes = '';
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getSettingsForFormat(strFormat, strDirection) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugStackEnter('getSettingsForFormat:formats-settings'); await assertIsStr(strFormat); await assertIsStr(strDirection); let strArrayReturn;

    /* Returns an array of setting key/value pairs. A format setting string looks like, which should be fairly parseable (keys and vals follow StageL ident naming rules): key1:val1,key2:val2, */
    let intFormatId = 0;
    intFormatId = await getFormatId(strFormat);
    let strArrayRes = [];
    if (await implEq(strDirection, 'in')) {
        strArrayRes = await settingStringToArray(await getImportSettings(intFormatId));
    }
    else {
        strArrayRes = await settingStringToArray(await getExportSettings(intFormatId));
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getEnabledVariantsForFormat(strFormat, strDirection) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugStackEnter('getEnabledVariantsForFormat:formats-settings'); await assertIsStr(strFormat); await assertIsStr(strDirection); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await strSplit(await getSettingForFormat(strFormat, strDirection, 'variants'), ' ');

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getPreferredLanguageForFormat(strFormat, strDirection) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugStackEnter('getPreferredLanguageForFormat:formats-settings'); await assertIsStr(strFormat); await assertIsStr(strDirection); let strReturn;

    let strRes = '';
    strRes = await getEnvLanguage();
    let strArrayTemp = [];
    strArrayTemp = await getEnabledVariantsForFormat(strFormat, strDirection);
    let intC = 0;
    intC = 0;
    let intL = 0;
    intL = await count(strArrayTemp);
    let boolContinue = false;
    boolContinue = true;
    let intItem = 0;
    while (boolContinue) {
        if (await implNot(await implLt(intC, await implAdd(-1, intL)))) {
            boolContinue = false;
        }
        strItem = await get(strArrayTemp, intC);
        if (await implEq('lang_', await substr(strItem, 0, 5))) {
            strRes = strItem;
            boolContinue = false;
        }
        intC = await inc(intC);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getPreferredCodeLanguageForFormat(strFormat, strDirection) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugStackEnter('getPreferredCodeLanguageForFormat:formats-settings'); await assertIsStr(strFormat); await assertIsStr(strDirection); let strReturn;

    let strRes = '';
    strRes = await getEnvCodeLanguage();
    let strArrayTemp = [];
    strArrayTemp = await getEnabledVariantsForFormat(strFormat, strDirection);
    let intC = 0;
    intC = 0;
    let intL = 0;
    intL = await count(strArrayTemp);
    let boolContinue = false;
    boolContinue = true;
    let intItem = 0;
    while (boolContinue) {
        if (await implNot(await implLt(intC, await implAdd(-1, intL)))) {
            boolContinue = false;
        }
        strItem = await get(strArrayTemp, intC);
        if (await implEq('pl_', await substr(strItem, 0, 3))) {
            strRes = await substr(strItem, 3, -1);
            boolContinue = false;
        }
        intC = await inc(intC);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}
/* setImportSettings/setExportSettings are platform implementation in environment */

async function getImportSettings(intFormatId) {
    await internalDebugCollect('int FormatId = ' + intFormatId + '; '); await internalDebugStackEnter('getImportSettings:formats-settings'); await assertIsInt(intFormatId); let strReturn;

    let strRes = '';
    if (await implLt(intFormatId, await count(await getImportSettingsArr()))) {
        strRes = await get(await getImportSettingsArr(), intFormatId);
    }
    else {
        strRes = '';
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getExportSettings(intFormatId) {
    await internalDebugCollect('int FormatId = ' + intFormatId + '; '); await internalDebugStackEnter('getExportSettings:formats-settings'); await assertIsInt(intFormatId); let strReturn;

    let strRes = '';
    if (await implLt(intFormatId, await count(await getExportSettingsArr()))) {
        strRes = await get(await getExportSettingsArr(), intFormatId);
    }
    else {
        strRes = '';
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function pushImportSettings(intFormatId, strNewSettingString) {
    await internalDebugCollect('int FormatId = ' + intFormatId + '; '); await internalDebugCollect('str NewSettingString = ' + strNewSettingString + '; '); await internalDebugStackEnter('pushImportSettings:formats-settings'); await assertIsInt(intFormatId); await assertIsStr(strNewSettingString);

    /* Note that all import settings must be popped in the reverse of the order they were pushed (all formats' import settings share the same stack). */
    await setSharedState('strArrayImportDeferredSettingsStack', await push(await getSharedState('strArrayImportDeferredSettingsStack'), await getImportSettings(intFormatId)));
    await setImportSettings(intFormatId, strNewSettingString);

    await internalDebugStackExit();
}

async function pushExportSettings(intFormatId, strNewSettingString) {
    await internalDebugCollect('int FormatId = ' + intFormatId + '; '); await internalDebugCollect('str NewSettingString = ' + strNewSettingString + '; '); await internalDebugStackEnter('pushExportSettings:formats-settings'); await assertIsInt(intFormatId); await assertIsStr(strNewSettingString);

    /* Note that all export settings must be popped in the reverse of the order they were pushed (all formats' export settings share the same stack). */
    await setSharedState('strArrayExportDeferredSettingsStack', await push(await getSharedState('strArrayExportDeferredSettingsStack'), await getExportSettings(intFormatId)));
    await setExportSettings(intFormatId, strNewSettingString);

    await internalDebugStackExit();
}

async function popImportSettings(intFormatId) {
    await internalDebugCollect('int FormatId = ' + intFormatId + '; '); await internalDebugStackEnter('popImportSettings:formats-settings'); await assertIsInt(intFormatId);

    await setImportSettings(intFormatId, await get(await getSharedState('strArrayImportDeferredSettingsStack'), -1));
    await setSharedState('strArrayImportDeferredSettingsStack', await asSubset(await getSharedState('strArrayImportDeferredSettingsStack'), 0, -2));

    await internalDebugStackExit();
}

async function popExportSettings(intFormatId) {
    await internalDebugCollect('int FormatId = ' + intFormatId + '; '); await internalDebugStackEnter('popExportSettings:formats-settings'); await assertIsInt(intFormatId);

    await setExportSettings(intFormatId, await get(await getSharedState('strArrayExportDeferredSettingsStack'), -1));
    await setSharedState('strArrayExportDeferredSettingsStack', await asSubset(await getSharedState('strArrayExportDeferredSettingsStack'), 0, -2));

    await internalDebugStackExit();
}

async function settingStringToArray(strSettings) {
    await internalDebugCollect('str Settings = ' + strSettings + '; '); await internalDebugStackEnter('settingStringToArray:formats-settings'); await assertIsStr(strSettings); let strArrayReturn;

    let strArrayRes = [];
    intCount = await len(strSettings);
    let intCounter = 0;
    intCounter = 0;
    let strElem = '';
    let strState = '';
    strState = 'key';
    let strChar = '';
    while (await implLt(intCounter, intCount)) {
        strChar = await charAt(strSettings, intCounter);
        if (await implEq(strState, 'key')) {
            if (await implEq(strChar, ':')) {
                strArrayRes = await push(strArrayRes, strElem);
                strElem = '';
                strState = 'val';
            }
            else {
                strElem = await implCat(strElem, strChar);
            }
        }
        else {
            if (await implEq(strChar, ',')) {
                strArrayRes = await push(strArrayRes, strElem);
                strElem = '';
                strState = 'key';
            }
            else {
                strElem = await implCat(strElem, strChar);
            }
        }
        intCounter = await implAdd(intCounter, 1);
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function settingArrayToString(strArraySettings) {
    await internalDebugCollect('strArray Settings = ' + strArraySettings + '; '); await internalDebugStackEnter('settingArrayToString:formats-settings'); await assertIsStrArray(strArraySettings); let strReturn;

    let strRes = '';
    intCount = await count(strArraySettings);
    let intCounter = 0;
    intCounter = 0;
    let strElem = '';
    while (await implLt(intCounter, intCount)) {
        strElem = await get(strArraySettings, intCounter);
        await assertIsTrue(await isValidIdent(strElem));
        if (await implEq(0, await implMod(intCounter, 2))) {
            strRes = await implCat(strRes, await implCat(strElem, ','));
        }
        else {
            strRes = await implCat(strRes, await implCat(strElem, ':'));
        }
        intCounter = await implAdd(intCounter, 1);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function listFormats() {
    await internalDebugStackEnter('listFormats:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcGetColumn('formats', 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function isFormat(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('isFormat:formats-data'); await assertIsStr(strFormat); let boolReturn;

    let boolRes = false;
    boolRes = await implIn(strFormat, await listFormats());

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function listInputFormats() {
    await internalDebugStackEnter('listInputFormats:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValueGreater('formats', 3, 0, 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function isSupportedInputFormat(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isSupportedInputFormat:formats-data'); await assertIsStr(strIn); let boolReturn;

    let boolRes = false;
    boolRes = await contains(await listInputFormats(), strIn);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function listInternalFormats() {
    await internalDebugStackEnter('listInternalFormats:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValue('formats', 6, 'internal', 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function isSupportedInternalFormat(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isSupportedInternalFormat:formats-data'); await assertIsStr(strIn); let boolReturn;

    let boolRes = false;
    boolRes = await or(await contains(await listInputFormats(), strIn), await contains(await listInternalFormats(), strIn));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function listOutputFormats() {
    await internalDebugStackEnter('listOutputFormats:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValueGreater('formats', 4, 0, 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function isSupportedOutputFormat(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isSupportedOutputFormat:formats-data'); await assertIsStr(strIn); let boolReturn;

    let boolRes = false;
    boolRes = await contains(await listOutputFormats(), strIn);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function listCharEncodings() {
    await internalDebugStackEnter('listCharEncodings:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValue('formats', 6, 'encoding', 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function isSupportedCharEncoding(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isSupportedCharEncoding:formats-data'); await assertIsStr(strIn); let boolReturn;

    /* Specifically, is it a supported character encoding for the output environment. */
    let boolRes = false;
    boolRes = await implAnd(await contains(await listCharEncodings(), strIn), await isSupportedOutputFormat(strIn));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function listTerminalTypes() {
    await internalDebugStackEnter('listTerminalTypes:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValue('formats', 6, 'terminal', 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function isSupportedTerminalType(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isSupportedTerminalType:formats-data'); await assertIsStr(strIn); let boolReturn;

    /* Specifically, is it a supported terminal type for the output environment. */
    let boolRes = false;
    boolRes = await implAnd(await contains(await listTerminalTypes(), strIn), await isSupportedOutputFormat(strIn));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function listDocumentTransformations() {
    await internalDebugStackEnter('listDocumentTransformations:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValue('formats', 6, 'transformation', 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function listDataTypes() {
    await internalDebugStackEnter('listDataTypes:formats-data'); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await dcDataFilterByValue('formats', 6, 'data', 1);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function listVariantsForFormat(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('listVariantsForFormat:formats-data'); await assertIsStr(strFormat); let strArrayReturn;

    await assertIsFormat(strFormat);
    let strNormalizedFmt = '';
    strNormalizedFmt = await normalizeFormat(strFormat);
    let strArrayFormats = [];
    strArrayFormats = await listFormats();
    let intCount = 0;
    let intI = 0;
    intCount = await count(strArrayFormats);
    intI = 0;
    let strCandidateFmt = '';
    let strNormalizedVar = '';
    let strArrayRes = [];
    while (await implLt(intI, intCount)) {
        strCandidateFmtType = await dcDataLookupById('formats', intI, 6);
        if (await implEq('v:', await substr(strCandidateFmtType, 0, 2))) {
            strCandidateFmtType = await substr(strCandidateFmtType, 3, -1);
            if (await implIn(strCandidateFmtType, [ 'unicodePua' ])) {
                strCandidateFmtType = 'unicode';
            }
            if (await implEq(strNormalizedFmt, strCandidateFmtType)) {
                strArrayRes = await push(strArrayRes, await dcDataLookupById('formats', intI, 1));
            }
        }
        intI = await implAdd(intI, 1);
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getFormatId(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatId:formats-data'); await assertIsStr(strFormat); let intReturn;

    await assertIsFormat(strFormat);
    let intRes = 0;
    intRes = await intFromIntStr(await dcDataLookupByValue('formats', 1, strFormat, 0));

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function normalizeFormat(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('normalizeFormat:formats-data'); await assertIsStr(strFormat); let strReturn;

    await assertIsFormat(strFormat);
    if (await implEq(strFormat, 'utf8')) {

        strReturn = 'unicode'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }

    strReturn = strFormat; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatName(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatName:formats-data'); await assertIsStr(strFormat); let strReturn;

    let strRes = '';
    strRes = await dcDataLookupById('formats', await getFormatId(strFormat), 1);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatExtension(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatExtension:formats-data'); await assertIsStr(strFormat); let strReturn;

    let strRes = '';
    strRes = await dcDataLookupById('formats', await getFormatId(strFormat), 2);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatImportSupport(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatImportSupport:formats-data'); await assertIsStr(strFormat); let intReturn;

    let intRes = 0;
    intRes = await intFromIntStr(await dcDataLookupById('formats', await getFormatId(strFormat), 3));

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function getFormatExportSupport(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatExportSupport:formats-data'); await assertIsStr(strFormat); let intReturn;

    let intRes = 0;
    intRes = await intFromIntStr(await dcDataLookupById('formats', await getFormatId(strFormat), 4));

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function getFormatTestsStatus(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatTestsStatus:formats-data'); await assertIsStr(strFormat); let intReturn;

    let intRes = 0;
    intRes = await intFromIntStr(await dcDataLookupById('formats', await getFormatId(strFormat), 5));

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function getFormatType(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatType:formats-data'); await assertIsStr(strFormat); let strReturn;

    let strRes = '';
    strRes = await dcDataLookupById('formats', await getFormatId(strFormat), 6);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatLabel(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatLabel:formats-data'); await assertIsStr(strFormat); let strReturn;

    let strRes = '';
    strRes = await dcDataLookupById('formats', await getFormatId(strFormat), 7);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatVariantTypes(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatVariantTypes:formats-data'); await assertIsStr(strFormat); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await strSplit(await dcDataLookupById('formats', await getFormatId(strFormat), 8), ',');

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getFormatComments(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatComments:formats-data'); await assertIsStr(strFormat); let strReturn;

    let strRes = '';
    strRes = await dcDataLookupById('formats', await getFormatId(strFormat), 9);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function formatIsVariant(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('formatIsVariant:formats-data'); await assertIsStr(strFormat); let boolReturn;

    /* Return true if the format is a variant of another format, rather than its own format. */
    await assertIsFormat(strFormat);
    let boolRes = false;
    boolRes = await implEq('v:', await substr(await getFormatType(strFormat), 0, 2));

    boolReturn = strRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isVariantType(strVariantType) {
    await internalDebugCollect('str VariantType = ' + strVariantType + '; '); await internalDebugStackEnter('isVariantType:formats-data'); await assertIsStr(strVariantType); let strReturn;

    let boolRes = false;
    boolRes = await implIn(strVariantType, [ 'encoding', 'unicodePua' ]);

    strReturn = boolRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function formatGetVariantType(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('formatGetVariantType:formats-data'); await assertIsStr(strFormat); let strReturn;

    /* Return the string indicating the type of format variant this is. */
    await assertIsTrue(await formatIsVariant(strFormat));
    let strRes = '';
    strRes = await substr(await getFormatType(strFormat), 2, -1);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function formatSupportsVariantType(strFormat, strVariantType) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str VariantType = ' + strVariantType + '; '); await internalDebugStackEnter('formatSupportsVariantType:formats-data'); await assertIsStr(strFormat); await assertIsStr(strVariantType); let boolReturn;

    await assertIsFormat(strFormat);
    let boolRes = false;
    boolRes = await implIn(strVariantType, await getFormatVariantTypes(strFormat));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function formatSupportsVariant(strFormat, strVariant) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Variant = ' + strVariant + '; '); await internalDebugStackEnter('formatSupportsVariant:formats-data'); await assertIsStr(strFormat); await assertIsStr(strVariant); let boolReturn;

    await assertIsFormat(strFormat);
    let boolRes = false;
    boolRes = await formatSupportsVariantType(strFormat, await formatGetVariantType(strVariant));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function getFormatMetricsType(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatMetricsType:formats-data'); await assertIsStr(strFormat); let strReturn;

    await assertIsFormat(strFormat);
    let strRes = '';
    let strType = '';
    strType = await getFormatType(strFormat);
    strRes = await implCat('complex-', strFormat);
    if (await or(await implEq('text', strType), await implIn(strType, [ 'encoding', 'terminal' ]))) {
        strRes = 'character';
    }
    else if (await implIn(strType, [  ])) {
        strRes = 'pixel';
    }
    else if (await implIn(strType, [ 'internal' ])) {
        strRes = await implCat('internal-', strFormat);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function dcGetMappingToFormat(intDc, strFormat) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('dcGetMappingToFormat:formats-data'); await assertIsInt(intDc); await assertIsStr(strFormat); let strReturn;

    await assertIsDc(intDc);
    await assertIsSupportedOutputFormat(strFormat);
    let strRes = '';
    strRes = await dcDataLookupById(await implCat('mappings/to/', strFormat), intDc, 1);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function runTestsFormatSems(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatSems:format-sems-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatSems');
    /* No trailing space, will fail in strict mode. */
    await runTest(boolV, await arrEq([ 1, 2 ], await dcaFromSems([ 49, 32, 50 ])));
    /* Should fail but I don't have a way to test to ensure failure yet: runTest b/v arrEq ( 1 2 ) dcaFromSems ( 49 32 32 50 ) */
    await runTest(boolV, await arrEq([ 49, 32, 50, 32, 13, 10 ], await dcaToSems([ 1, 2 ])));
    /* Comment preservation */
    await runTest(boolV, await arrEq([ 1, 2, 246, 50, 248 ], await dcaFromSems([ 49, 32, 50, 35, 65 ])));
    await runTest(boolV, await arrEq([ 49, 32, 50, 32, 35, 65, 13, 10 ], await dcaToSems([ 1, 2, 246, 50, 248 ])));
    /* Currently doesn't output the 65 in the desired result (FIXME not implemented) */
    /* UTF-8 comments */
    await runTest(boolV, await arrEq([ 256, 258, 260, 262, 264, 263, 57, 86, 93, 93, 96, 30, 18, 286, 72, 96, 99, 93, 85, 287, 19, 18, 284, 261, 259, 246, 18, 100, 82, 106, 18, 20, 57, 86, 93, 93, 96, 30, 18, 33, 72, 96, 99, 93, 85, 33, 19, 18, 281, 20, 248, 1, 2, 246, 18, 281, 248 ], await dcaFromSems([ 50, 53, 54, 32, 50, 53, 56, 32, 50, 54, 48, 32, 50, 54, 50, 32, 50, 54, 52, 32, 50, 54, 51, 32, 53, 55, 32, 56, 54, 32, 57, 51, 32, 57, 51, 32, 57, 54, 32, 51, 48, 32, 49, 56, 32, 50, 56, 54, 32, 55, 50, 32, 57, 54, 32, 57, 57, 32, 57, 51, 32, 56, 53, 32, 50, 56, 55, 32, 49, 57, 32, 49, 56, 32, 50, 56, 52, 32, 50, 54, 49, 32, 50, 53, 57, 32, 35, 32, 115, 97, 121, 32, 34, 72, 101, 108, 108, 111, 44, 32, 47, 87, 111, 114, 108, 100, 47, 33, 32, 226, 154, 189, 34, 10, 49, 32, 50, 32, 35, 32, 226, 154, 189, 10 ])));

    await internalDebugStackExit();
}

async function runTestsFormatAsciiSafeSubset(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatAsciiSafeSubset:format-asciiSafeSubset-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatAsciiSafeSubset');
    await runTest(boolV, await arrEq([ 121, 120, 21, 26 ], await dcaFromAsciiSafeSubset([ 13, 10, 35, 40 ])));
    await runTest(boolV, await arrEq([ 13, 10, 35, 13, 10, 40 ], await dcaToAsciiSafeSubset([ 0, 212, 120, 216, 291, 221, 226, 231, 21, 121, 120, 26 ])));

    await internalDebugStackExit();
}

async function dcaToHtml(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToHtml:format-html'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    let intArrayOut = [];
    intArrayOut = await strToByteArray('<!DOCTYPE html><html><head><title></title></head><body>');
    intArrayOut = await append(intArrayOut, await dcaToHtmlFragment(intArrayDcIn));
    intArrayOut = await append(intArrayOut, await strToByteArray('</body></html>'));
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaFromSems(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dcaFromSems:format-sems'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsByteArray(intArrayIn);
    let intArrayRes = [];
    /* Accepts an array of bytes of a SEMS format document. Returns an array of Dcs. */
    let intArrayContent = [];
    intArrayContent = await utf8CharArrayFromByteArray(intArrayIn);
    let strParserState = '';
    strParserState = 'dc';
    let strCurrentDc = '';
    strCurrentDc = '';
    let intContentLength = 0;
    intContentLength = await count(intArrayContent);
    let intCharOffset = 0;
    let intCurrentChar = 0;
    let boolStrict = false;
    boolStrict = await implEq('true', await getSettingForFormat('sems', 'in', 'strict'));
    while (await implLt(intCharOffset, intContentLength)) {
        /* do something with each char in the array. an/content[n/byteOffset], which is copied to n/currentChar, holds the decimal value of the given char. These are Dcs encoded as ASCII text bytes, rather than an array of Dcs. */
        intCurrentChar = await get(intArrayContent, intCharOffset);
        if (await implEq(strParserState, 'dc')) {
            if (await asciiIsDigit(intCurrentChar)) {
                strCurrentDc = await implCat(strCurrentDc, await charFromByte(intCurrentChar));
            }
            else if (await implIn(intCurrentChar, [ 10, 13, 32 ])) {
                intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentDc));
                strCurrentDc = '';
            }
            else if (await implEq(35, intCurrentChar)) {
                /* pound sign: start comment */
                if (await ne(0, await len(strCurrentDc))) {
                    /* Comment was not preceded by a space */
                    await warnOrDie(boolStrict, 'No trailing space before comment present in sems format while importing. This is not allowed in strict mode.');
                    intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentDc));
                    strCurrentDc = '';
                }
                intArrayRes = await push(intArrayRes, 246);
                strParserState = 'comment';
            }
            else {
                await implDie('Unexpected parser state in SEMS document.');
            }
        }
        else if (await implEq(strParserState, 'comment')) {
            if (await asciiIsNewline(intCurrentChar)) {
                intArrayRes = await push(intArrayRes, 248);
                strParserState = 'dc';
            }
            else {
                intArrayRes = await append(intArrayRes, await dcaFromUnicodeChar(intCurrentChar));
            }
        }
        else {
            await implDie('Internal error: unexpected parser state while parsing SEMS document');
        }
        intCharOffset = await implAdd(intCharOffset, 1);
    }
    if (await implEq(strParserState, 'comment')) {
        /* Document ended with a comment and no newline at the end */
        if (await ne(0, await len(strCurrentDc))) {
            await implDie(await implCat('Internal error while parsing sems document: Unconsumed characters were left over when the end of the document was found: ', await implCat(strCurrentDc, '.')));
        }
        intArrayRes = await push(intArrayRes, 248);
    }
    else if (await ne(0, await len(strCurrentDc))) {
        await warnOrDie(boolStrict, 'No trailing space present in sems format while importing. This is not allowed in strict mode.');
        /* Ended without a trailing space */
        intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentDc));
    }
    await assertIsDcArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToSems(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToSems:format-sems'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    /* TODO: Support SEMS comment roundtripping */
    let intArrayOut = [];
    let intLen = 0;
    intLen = await count(intArrayDcIn);
    let intInputIndex = 0;
    intInputIndex = 0;
    let intCurrentDc = 0;
    let boolInComment = false;
    boolInComment = false;
    let intArrayCurrentComment = [];
    intArrayCurrentComment = [  ];
    let boolAtCommentEnd = false;
    boolAtCommentEnd = false;
    while (await implLt(intInputIndex, intLen)) {
        intCurrentDc = await get(intArrayDcIn, intInputIndex);
        if (boolAtCommentEnd) {
            boolAtCommentEnd = false;
        }
        if (await implEq(246, intCurrentDc)) {
            boolInComment = true;
            intArrayOut = await append(intArrayOut, await strToByteArray('#'));
        }
        else if (await implEq(248, intCurrentDc)) {
            boolInComment = false;
            boolAtCommentEnd = true;
            intArrayOut = await append(intArrayOut, await dcaToDcbnbUtf8(intArrayCurrentComment));
            intArrayCurrentComment = [  ];
            intArrayOut = await append(intArrayOut, await crlf());
        }
        else {
            if (boolInComment) {
                intArrayCurrentComment = await push(intArrayCurrentComment, intCurrentDc);
            }
            else {
                intArrayOut = await append(intArrayOut, await strToByteArray(await implCat(await strFrom(intCurrentDc), ' ')));
            }
        }
        intInputIndex = await implAdd(intInputIndex, 1);
    }
    if (await implNot(boolAtCommentEnd)) {
        intArrayOut = await append(intArrayOut, await crlf());
    }
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToUtf8(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaToUtf8:format-utf8'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    await assertIsDcArray(intArrayContent);
    let intArrayRes = [];
    let intArrayToOutput = [];
    intArrayToOutput = intArrayContent;
    let intArrayTemp = [];
    let intDcAtIndex = 0;
    let intArrayUnmappables = [];
    let intUnmappablesCount = 0;
    let intUnmappablesCounter = 0;
    let intArrayUnmappablesIntermediatePacked = [];
    let boolFoundAnyUnmappables = false;
    boolFoundAnyUnmappables = false;
    let strArrayVariantSettings = [];
    strArrayVariantSettings = await utf8VariantSettings('out');
    let boolDcBasenbEnabled = false;
    boolDcBasenbEnabled = await contains(strArrayVariantSettings, 'dcBasenb');
    let boolDcBasenbFragmentEnabled = false;
    boolDcBasenbFragmentEnabled = await contains(strArrayVariantSettings, 'dcBasenbFragment');
    intArrayToOutput = await dcPreprocessForFormat(intArrayToOutput, 'utf8', 'out');
    let intL = 0;
    intL = await count(intArrayToOutput);
    let intC = 0;
    intC = 0;
    while (await le(intC, intL)) {
        /* Start by getting the character's UTF8 equivalent and putting it in an/temp. This might be empty, if the character can't be mapped to UTF8. */
        if (await implLt(intC, intL)) {
            intDcAtIndex = await get(intArrayToOutput, intC);
            intArrayTemp = await dcToFormat('utf8', intDcAtIndex);
        }
        /* Could the character be mapped? If not, stick it in the unmappables array or warn as appropriate. */
        if (await implEq(0, await count(intArrayTemp))) {
            if (await implLt(intC, intL)) {
                if (boolDcBasenbEnabled) {
                    intArrayUnmappables = await push(intArrayUnmappables, intDcAtIndex);
                }
                else {
                    await exportWarningUnmappable(intC, intDcAtIndex);
                }
            }
        }
        /* If we've reached the end of the input string or the last character was mappable, convert the an/unmappables array to PUA characters and append that result to the output string */
        if (boolDcBasenbEnabled) {
            if (await or(await implEq(intC, intL), await ne(0, await count(intArrayTemp)))) {
                intUnmappablesCount = await count(intArrayUnmappables);
                if (await ne(0, intUnmappablesCount)) {
                    if (await implNot(boolFoundAnyUnmappables)) {
                        if (await implNot(boolDcBasenbFragmentEnabled)) {
                            intArrayRes = await append(intArrayRes, await getArmoredUtf8EmbeddedStartUuid());
                        }
                    }
                    boolFoundAnyUnmappables = true;
                    /* We've gotten to the end of a string of unmappable characters, so convert them to PUA characters */
                    intUnmappablesCounter = 0;
                    while (await implLt(intUnmappablesCounter, intUnmappablesCount)) {
                        /* The packing method for this works basically like UTF8, where each character is mapped to a series of bytes. So, first get the bytearray for the character we're on. Each character should be packed separately, to make it easy to spot where one character ends and the next begins. */
                        intArrayUnmappablesIntermediatePacked = await append(intArrayUnmappablesIntermediatePacked, await pack32(await get(intArrayUnmappables, intUnmappablesCounter)));
                        intUnmappablesCounter = await implAdd(intUnmappablesCounter, 1);
                        intArrayRes = await append(intArrayRes, await byteArrayToBase17bUtf8(intArrayUnmappablesIntermediatePacked));
                        intArrayUnmappablesIntermediatePacked = [  ];
                    }
                    intArrayUnmappables = [  ];
                    intArrayUnmappablesIntermediatePacked = [  ];
                }
            }
        }
        /* Stick the current character onto the result array */
        if (await implLt(intC, intL)) {
            intArrayRes = await append(intArrayRes, intArrayTemp);
        }
        /* and finally increment the loop counter */
        intC = await implAdd(intC, 1);
    }
    if (await implAnd(boolDcBasenbEnabled, boolFoundAnyUnmappables)) {
        if (await implNot(boolDcBasenbFragmentEnabled)) {
            intArrayRes = await append(intArrayRes, await getArmoredUtf8EmbeddedEndUuid());
        }
    }
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaFromUtf8(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaFromUtf8:format-utf8'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    let intArrayRes = [];
    let intArrayRemaining = [];
    intArrayRemaining = intArrayContent;
    let intArrayTemp = [];
    let intArrayLatestChar = [];
    let intDcBasenbUuidMonitorState = 0;
    intDcBasenbUuidMonitorState = 0;
    let intDcBasenbUuidMonitorReprocessNeededCount = 0;
    intDcBasenbUuidMonitorReprocessNeededCount = 0;
    let strArrayVariantSettings = [];
    strArrayVariantSettings = await utf8VariantSettings('in');
    let boolDcBasenbEnabled = false;
    boolDcBasenbEnabled = await contains(strArrayVariantSettings, 'dcBasenb');
    let boolInDcBasenbSection = false;
    boolInDcBasenbSection = false;
    if (boolDcBasenbEnabled) {
        boolInDcBasenbSection = await contains(strArrayVariantSettings, 'dcBasenbFragment');
    }
    let intSkipThisChar = 0;
    intSkipThisChar = 0;
    let intArrayCollectedDcBasenbChars = [];
    let intCollectedDcBasenbCharsCount = 0;
    let intCollectedDcBasenbCharsCounter = 0;
    let intArrayCurrentUnmappableChar = [];
    let intTempArrayCount = 0;
    while (await implNot(await implEq(0, await count(intArrayRemaining)))) {
        intArrayTemp = [  ];
        intArrayLatestChar = await pack32(await firstCharOfUtf8String(intArrayRemaining));
        if (boolDcBasenbEnabled) {
            /* Dcbasenb is enabled, so process characters accordingly. */
            if (await implNot(boolInDcBasenbSection)) {
                /* Not in a dcbasenb section, so look out for the UUID in case we run into one */
                /* All this code down to "(End of code section)" is only looking for UUIDs, and can mostly be disregarded for purposes of understanding the decoder logic. */
                /* 8 characters for uuid. Probably a better way to do this but oh well. Got them with new TextEncoder().encode('[char]'); etc. */
                if (await ne(0, intDcBasenbUuidMonitorReprocessNeededCount)) {
                    /* We're reprocessing potential UUID chars that didn't match a UUID after all, so don't check them for being a UUID. FIXME: Non-UUID char being reprocessed followed by 244 141 129 157 etc. (a potential UUID) would NOT be checked to be a UUID here. It should handle correctly the situation where there's potential but not a UUID, followed by potential and is a UUID, overlapping, like that. */
                    intDcBasenbUuidMonitorReprocessNeededCount = await implSub(intDcBasenbUuidMonitorReprocessNeededCount, 1);
                }
                else {
                    /* Check for a UUID. */
                    if (await implEq(intDcBasenbUuidMonitorState, 0)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 141, 129, 157 ])) {
                            intDcBasenbUuidMonitorState = 1;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 1)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 139, 182, 128 ])) {
                            intDcBasenbUuidMonitorState = 2;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 2)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 188, 183, 162 ])) {
                            intDcBasenbUuidMonitorState = 3;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 3)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 186, 128, 138 ])) {
                            intDcBasenbUuidMonitorState = 4;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 4)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 184, 165, 142 ])) {
                            intDcBasenbUuidMonitorState = 5;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 5)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 136, 186, 141 ])) {
                            intDcBasenbUuidMonitorState = 6;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 6)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 178, 139, 160 ])) {
                            intDcBasenbUuidMonitorState = 7;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 7)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 143, 186, 144 ])) {
                            intDcBasenbUuidMonitorState = 0;
                            intArrayLatestChar = [  ];
                            boolInDcBasenbSection = true;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    if (await ne(0, intDcBasenbUuidMonitorReprocessNeededCount)) {
                        /* It's necessary to reprocess the number of bytes that were consumed while checking for a UUID */
                        intTempArrayCount = await implSub(await count(intArrayContent), await count(intArrayRemaining));
                        intArrayRemaining = await anSubset(intArrayContent, intTempArrayCount, await implAdd(intTempArrayCount, await implMul(4, intDcBasenbUuidMonitorReprocessNeededCount)));
                    }
                }
            }
            else {
                /* Dcbasenb support is enabled, and we're inside a dcbasenb region. Process chars accordingly. */
                if (await ne(0, intDcBasenbUuidMonitorReprocessNeededCount)) {
                    /* Reprocessing non-UUID chars that could have been a UUID. Again, FIXME same as for the start UUID reprocessing bug mentioned in the earlier FIXME. */
                    intDcBasenbUuidMonitorReprocessNeededCount = await implSub(intDcBasenbUuidMonitorReprocessNeededCount, 1);
                }
                else {
                    /* Look for a dcbasenb region end UUID. */
                    if (await implEq(intDcBasenbUuidMonitorState, 0)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 188, 133, 185 ])) {
                            intDcBasenbUuidMonitorState = 1;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 1)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 180, 182, 175 ])) {
                            intDcBasenbUuidMonitorState = 2;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 2)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 136, 161, 186 ])) {
                            intDcBasenbUuidMonitorState = 3;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 3)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 191, 148, 138 ])) {
                            intDcBasenbUuidMonitorState = 4;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 4)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 134, 178, 166 ])) {
                            intDcBasenbUuidMonitorState = 5;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 5)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 141, 184, 130 ])) {
                            intDcBasenbUuidMonitorState = 6;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 6)) {
                        if (await arrEq(intArrayLatestChar, [ 243, 178, 128, 176 ])) {
                            intDcBasenbUuidMonitorState = 7;
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    else if (await implEq(intDcBasenbUuidMonitorState, 7)) {
                        if (await arrEq(intArrayLatestChar, [ 244, 143, 188, 157 ])) {
                            intDcBasenbUuidMonitorState = 0;
                            intArrayLatestChar = [  ];
                            boolInDcBasenbSection = false;
                            /* Handle any remaining collected DcBasenb characters */
                            if (await ne(0, await count(intArrayCollectedDcBasenbChars))) {
                                intArrayCollectedDcBasenbChars = await byteArrayFromBase17bUtf8(intArrayCollectedDcBasenbChars);
                                if (await excepArr(intArrayCollectedDcBasenbChars)) {
                                    await importWarning(await implSub(await count(intArrayContent), await count(intArrayRemaining), ), 'An invalid base17b UTF8 input was encountered. Probably it was incorrectly truncated.');
                                    intArrayCollectedDcBasenbChars = [  ];
                                }
                                intCollectedDcBasenbCharsCount = await count(intArrayCollectedDcBasenbChars);
                                intCollectedDcBasenbCharsCounter = 0;
                                while (await implLt(intCollectedDcBasenbCharsCounter, intCollectedDcBasenbCharsCount)) {
                                    intArrayCurrentUnmappableChar = await utf8BytesFromDecimalChar(await firstCharOfUtf8String(intArrayCollectedDcBasenbChars));
                                    intArrayRes = await append(intArrayRes, await unpack32(intArrayCurrentUnmappableChar));
                                    intCollectedDcBasenbCharsCounter = await implAdd(intCollectedDcBasenbCharsCounter, await count(intArrayCurrentUnmappableChar));
                                }
                                intArrayCollectedDcBasenbChars = [  ];
                            }
                        }
                        else {
                            intDcBasenbUuidMonitorReprocessNeededCount = intDcBasenbUuidMonitorState;
                            intDcBasenbUuidMonitorState = 0;
                        }
                    }
                    if (await ne(0, intDcBasenbUuidMonitorReprocessNeededCount)) {
                        /* It's necessary to reprocess the number of bytes that were consumed while checking for a UUID */
                        intTempArrayCount = await count(intArrayRemaining);
                        intArrayRemaining = await anSubset(intArrayContent, intTempArrayCount, await implAdd(intTempArrayCount, await implMul(4, intDcBasenbUuidMonitorReprocessNeededCount)));
                    }
                }
                /* (End of code section) (see explanation above) */
            }
            if (await implEq(0, intDcBasenbUuidMonitorState)) {
                /* Process the current character: if we're in a dcbasenb section, check if it is a dcbasenb character and collect it for decoding. Otherwise, decode the preceding run of dcbasenb chars as a chunk and append that to the result. */
                if (await ne(0, await count(intArrayLatestChar))) {
                    /* There is a latest char (latestChar has more than 0 elems), so work on it */
                    if (await implAnd(boolInDcBasenbSection, await implAnd(await isBasenbChar(intArrayLatestChar), await implNot(await isBasenbDistinctRemainderChar(intArrayLatestChar))))) {
                        /* The character is a dcbasenb char and we're in a dcbasenb section, so collect the character for decoding. */
                        /* Should decode each character as a single batch with the end of the run denoted by isBasenbDistinctRemainderChar, so don't match those here. */
                        intArrayCollectedDcBasenbChars = await append(intArrayCollectedDcBasenbChars, intArrayLatestChar);
                        intSkipThisChar = await count(intArrayLatestChar);
                    }
                    else {
                        /* Not a basenb char (or not in a dcbasenb section), so decode the ones we've collected, if there are any */
                        if (await ne(0, await count(intArrayCollectedDcBasenbChars))) {
                            if (await isBasenbDistinctRemainderChar(intArrayLatestChar)) {
                                intArrayCollectedDcBasenbChars = await push(intArrayCollectedDcBasenbChars, intArrayLatestChar);
                            }
                            intArrayCollectedDcBasenbChars = await byteArrayFromBase17bUtf8(intArrayCollectedDcBasenbChars);
                            if (await excepArr(intArrayCollectedDcBasenbChars)) {
                                await importWarning(await implSub(await count(intArrayContent), await count(intArrayRemaining), ), 'An invalid base17b UTF8 input was encountered. Probably it was incorrectly truncated.');
                                intArrayCollectedDcBasenbChars = [  ];
                            }
                            intCollectedDcBasenbCharsCount = await count(intArrayCollectedDcBasenbChars);
                            intCollectedDcBasenbCharsCounter = 0;
                            while (await implLt(intCollectedDcBasenbCharsCounter, intCollectedDcBasenbCharsCount)) {
                                intArrayCurrentUnmappableChar = await utf8BytesFromDecimalChar(await firstCharOfUtf8String(intArrayCollectedDcBasenbChars));
                                intArrayRes = await append(intArrayRes, await unpack32(intArrayCurrentUnmappableChar));
                                intCollectedDcBasenbCharsCounter = await implAdd(intCollectedDcBasenbCharsCounter, await count(intArrayCurrentUnmappableChar));
                            }
                            intArrayCollectedDcBasenbChars = [  ];
                        }
                    }
                }
                else {
                    /* The latest char was the last char of a confirmed UUID. */
                    intSkipThisChar = 4;
                }
            }
        }
        intTempArrayCount = await count(intArrayLatestChar);
        if (await implEq(0, intDcBasenbUuidMonitorState)) {
            /* (We're not trying to spot a UUID right now: either the current char couldn't be one, or we confirmed it's not part of one and are re-processing this char.) */
            if (await ne(0, intSkipThisChar)) {
                /* The current character was a dcbasenb character, so it was stuck onto the collectedDcBasenbChars array and so we defer working on it until later. (Or, it was the last character of a confirmed UUID; either way, it doesn't get processed now.) */
                intTempArrayCount = intSkipThisChar;
                intSkipThisChar = 0;
            }
            else {
                /* Not skipping the current char, so decode it from Unicode normally. */
                intArrayTemp = intArrayLatestChar;
                let intArrayTempFromUnicode = [];
                intArrayTempFromUnicode = await dcFromFormat('unicode', intArrayTemp);
                if (await le(1, await count(intArrayTempFromUnicode))) {
                    if (await ne(-1, await get(intArrayTempFromUnicode, 0))) {
                        intArrayRes = await append(intArrayRes, intArrayTempFromUnicode);
                    }
                }
            }
        }
        /* Place in an/remaining the substring of input that has not been processed yet. */
        intArrayRemaining = await anSubset(intArrayRemaining, intTempArrayCount, -1);
    }
    if (boolDcBasenbEnabled) {
        /* Handle any remaining collected DcBasenb characters */
        if (await ne(0, await count(intArrayCollectedDcBasenbChars))) {
            intArrayCollectedDcBasenbChars = await byteArrayFromBase17bUtf8(intArrayCollectedDcBasenbChars);
            if (await excepArr(intArrayCollectedDcBasenbChars)) {
                await importWarning(await implSub(await count(intArrayContent), await count(intArrayRemaining), ), 'An invalid base17b UTF8 input was encountered. Probably it was incorrectly truncated.');
                intArrayCollectedDcBasenbChars = [  ];
            }
            intCollectedDcBasenbCharsCount = await count(intArrayCollectedDcBasenbChars);
            intCollectedDcBasenbCharsCounter = 0;
            while (await implLt(intCollectedDcBasenbCharsCounter, intCollectedDcBasenbCharsCount)) {
                intArrayCurrentUnmappableChar = await utf8BytesFromDecimalChar(await firstCharOfUtf8String(intArrayCollectedDcBasenbChars));
                intArrayRes = await append(intArrayRes, await unpack32(intArrayCurrentUnmappableChar));
                intCollectedDcBasenbCharsCounter = await implAdd(intCollectedDcBasenbCharsCounter, await count(intArrayCurrentUnmappableChar));
            }
        }
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function utf8VariantSettings(strDirection) {
    await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugStackEnter('utf8VariantSettings:format-utf8'); await assertIsStr(strDirection); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await getEnabledVariantsForFormat('utf8', strDirection);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function dcaFromUnicodeChar(intChar) {
    await internalDebugCollect('int Char = ' + intChar + '; '); await internalDebugStackEnter('dcaFromUnicodeChar:format-utf8'); await assertIsInt(intChar); let intArrayReturn;

    /* Takes a character number, not a byte array. */
    let intArrayRes = [];
    let intArrayTemp = [];
    intArrayTemp = await dcFromFormat('unicode', await anFromN(intChar));
    if (await ne(0, await count(intArrayTemp))) {
        intArrayRes = await push(intArrayRes, await get(intArrayTemp, 0));
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcToUnicodeCharArray(intDc) {
    await internalDebugCollect('int Dc = ' + intDc + '; '); await internalDebugStackEnter('dcToUnicodeCharArray:format-utf8'); await assertIsInt(intDc); let intArrayReturn;

    /* Returns a character number, not a byte array. */
    let intArrayRes = [];
    let intArrayTemp = [];
    intArrayTemp = await dcToFormat('unicode', intDc);
    if (await ne(0, await count(intArrayTemp))) {
        intArrayRes = await push(intArrayRes, await firstCharOfUtf8String(intArrayTemp));
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToDcbnbUtf8(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaToDcbnbUtf8:format-utf8'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    /* convenience wrapper */
    let intArrayRes = [];
    await pushExportSettings(await getFormatId('utf8'), 'variants:dcBasenb,');
    intArrayRes = await dcaToUtf8(intArrayContent);
    await popExportSettings(await getFormatId('utf8'));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaFromDcbnbUtf8(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaFromDcbnbUtf8:format-utf8'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    /* convenience wrapper */
    let intArrayRes = [];
    await pushImportSettings(await getFormatId('utf8'), 'variants:dcBasenb,');
    intArrayRes = await dcaFromUtf8(intArrayContent);
    await popImportSettings(await getFormatId('utf8'));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToDcbnbFragmentUtf8(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaToDcbnbFragmentUtf8:format-utf8'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    /* convenience wrapper */
    let intArrayRes = [];
    await pushExportSettings(await getFormatId('utf8'), 'variants:dcBasenb dcBasenbFragment,skip_prefilter_semantic:,skip_prefilter_code:,');
    intArrayRes = await dcaToUtf8(intArrayContent);
    await popExportSettings(await getFormatId('utf8'));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaFromDcbnbFragmentUtf8(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaFromDcbnbFragmentUtf8:format-utf8'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    /* convenience wrapper */
    let intArrayRes = [];
    await pushImportSettings(await getFormatId('utf8'), 'variants:dcBasenb dcBasenbFragment,');
    intArrayRes = await dcaFromUtf8(intArrayContent);
    await popImportSettings(await getFormatId('utf8'));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function utf8CharArrayFromByteArray(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('utf8CharArrayFromByteArray:format-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    let intArrayRes = [];
    let intArrayRemaining = [];
    intArrayRemaining = intArrayIn;
    let intTemp = 0;
    while (await implLt(0, await count(intArrayRemaining))) {
        intTemp = await firstCharOfUtf8String(intArrayRemaining);
        intArrayRes = await push(intArrayRes, intTemp);
        intArrayRemaining = await anSubset(intArrayRemaining, await count(await utf8BytesFromDecimalChar(intTemp), ), -1);
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function byteArrayFromUtf8CharArray(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('byteArrayFromUtf8CharArray:format-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    let intArrayRes = [];
    let intCount = 0;
    let intI = 0;
    intCount = await count(intArrayIn);
    intI = 0;
    while (await implLt(intI, intCount)) {
        intArrayRes = await append(intArrayRes, await utf8BytesFromDecimalChar(await get(intArrayIn, intI)));
        intI = await implAdd(1, intI);
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcbnbGetFirstChar(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dcbnbGetFirstChar:format-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    /* Return the first character of a dcbnb string (doesn't do any conversion; returns dcbnb) */
    let intArrayRes = [];
    if (await implEq(0, await count(intArrayIn))) {

        intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
    }
    let boolContinue = false;
    boolContinue = true;
    let intArrayNextUtf8 = [];
    let intArrayRemaining = [];
    intArrayRemaining = intArrayIn;
    let intTempArrayCount = 0;
    while (boolContinue) {
        intArrayNextUtf8 = await pack32(await firstCharOfUtf8String(intArrayRemaining));
        if (await implNot(await isBasenbChar(intArrayNextUtf8))) {
            if (await implEq(0, await count(intArrayRes))) {
                intArrayRes = intArrayNextUtf8;
            }
            boolContinue = false;
        }
        else {
            intArrayRes = await append(intArrayRes, intArrayNextUtf8);
            if (await isBasenbDistinctRemainderChar(intArrayNextUtf8)) {
                boolContinue = false;
            }
            else {
                intTempArrayCount = await count(intArrayNextUtf8);
                intArrayRemaining = await anSubset(intArrayRemaining, intTempArrayCount, -1);
            }
        }
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcbnbGetLastChar(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dcbnbGetLastChar:format-utf8'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    /* Return the last character of a dcbnb string (doesn't do any conversion; returns dcbnb) */
    let intArrayRes = [];
    if (await implEq(0, await count(intArrayIn))) {

        intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
    }
    let boolContinue = false;
    boolContinue = true;
    let intArrayNextUtf8 = [];
    let intArrayRemaining = [];
    intArrayRemaining = intArrayIn;
    let intTempArrayCount = 0;
    intTempArrayCount = 0;
    let boolPastFirstBasenbRemainderChar = false;
    boolPastFirstBasenbRemainderChar = false;
    while (boolContinue) {
        if (await ne(0, await count(intArrayRemaining))) {
            intArrayNextUtf8 = await pack32(await lastCharOfUtf8String(intArrayRemaining));
        }
        else {
            intArrayNextUtf8 = [  ];
        }
        if (await implNot(await isBasenbChar(intArrayNextUtf8))) {
            if (await implEq(0, await count(intArrayRes))) {
                intArrayRes = intArrayNextUtf8;
            }
            boolContinue = false;
        }
        else {
            if (await isBasenbDistinctRemainderChar(intArrayNextUtf8)) {
                if (boolPastFirstBasenbRemainderChar) {
                    boolContinue = false;
                }
                else {
                    intArrayRes = await append(intArrayNextUtf8, intArrayRes);
                    intTempArrayCount = await count(intArrayNextUtf8);
                    intArrayRemaining = await anSubset(intArrayRemaining, 0, await implAdd(-1, await implMul(-1, intTempArrayCount)));
                    boolPastFirstBasenbRemainderChar = true;
                }
            }
            else {
                intArrayRes = await append(intArrayNextUtf8, intArrayRes);
                intTempArrayCount = await count(intArrayNextUtf8);
                intArrayRemaining = await anSubset(intArrayRemaining, 0, await implAdd(-1, await implMul(-1, intTempArrayCount)));
            }
        }
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToColorcoded(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToColorcoded:format-colorcoded'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    let intArrayOut = [];
    intArrayOut = await strToByteArray('<!DOCTYPE html><html><head><title></title></head><body><p>Key: <span style="color:black">Letter</span> <span style="color:gray">Control</span> <span style="color:blue">Semantic</span> <span style="color:salmon">Mathematics</span> <span style="color:rebeccapurple">Symbols</span> <span style="color:red">Programming</span> <span style="color:green">Financial</span> <span style="color:orange">Punctuation</span> <span style="color:purple">Emoji</span> <span style="color:maroon">Styling</span> <span style="color:brown">Other</span></p>');
    intArrayOut = await append(intArrayOut, await dcaToColorcodedFragment(intArrayDcIn));
    intArrayOut = await append(intArrayOut, await strToByteArray('</body></html>'));
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToColorcodedFragment(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToColorcodedFragment:format-colorcoded'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    let intArrayOut = [];
    intArrayOut = await append(intArrayOut, await strToByteArray('<div style="white-space:pre-wrap">'));
    let intLen = 0;
    intLen = await count(intArrayDcIn);
    let intInputIndex = 0;
    intInputIndex = 0;
    let intDcAtIndex = 0;
    while (await implLt(intInputIndex, intLen)) {
        intDcAtIndex = await get(intArrayDcIn, intInputIndex);
        intArrayOut = await append(intArrayOut, await dcToFormat('colorcoded', intDcAtIndex));
        intInputIndex = await implAdd(intInputIndex, 1);
    }
    intArrayOut = await append(intArrayOut, await strToByteArray('</div>'));
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcToColorcoded(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('dcToColorcoded:format-colorcoded'); await assertIsInt(intIn); let intArrayReturn;

    await assertIsDc(intIn);
    let intArrayOut = [];
    intArrayOut = await append(intArrayOut, await strToByteArray('<span style="color:'));
    let strType = '';
    strType = await dcGetType(intIn);
    let strScript = '';
    strScript = await dcGetScript(intIn);
    let strColor = '';
    if (await implEq('L', await strChar(strType, 0))) {
        /* Letter */
        strColor = 'black';
    }
    else if (await implEq('Controls', strScript)) {
        /* Control */
        strColor = 'gray';
    }
    else if (await implEq('Semantic', strScript)) {
        /* Semantic */
        strColor = 'blue';
    }
    else if (await implEq('Mathematics', strScript)) {
        /* Mathematics */
        strColor = 'salmon';
    }
    else if (await implEq('Symbols', strScript)) {
        /* Symbols */
        strColor = 'rebeccapurple';
    }
    else if (await implEq('EL ', await substr(strScript, 0, 3))) {
        /* Programming */
        strColor = 'red';
    }
    else if (await implEq('Financial', strScript)) {
        /* Financial */
        strColor = 'green';
    }
    else if (await implEq('Punctuation', strScript)) {
        /* Punctuation */
        strColor = 'orange';
    }
    else if (await implEq('Emoji', strScript)) {
        /* Emoji */
        strColor = 'purple';
    }
    else if (await implEq('Colors', strScript)) {
        /* Styling */
        strColor = 'maroon';
    }
    else {
        /* Other */
        strColor = 'brown';
    }
    intArrayOut = await append(intArrayOut, await strToByteArray(strColor));
    intArrayOut = await append(intArrayOut, await strToByteArray('">'));
    intArrayOut = await append(intArrayOut, await strToByteArray(await strFrom(intIn)));
    intArrayOut = await append(intArrayOut, await strToByteArray('</span> '));

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaFromAscii(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaFromAscii:format-ascii'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    await assertIsByteArray(intArrayContent);
    let intArrayRes = [];
    let intL = 0;
    intL = await count(intArrayContent);
    let intC = 0;
    intC = 0;
    while (await implLt(intC, intL)) {
        intArrayRes = await append(intArrayRes, await dcFromFormat('ascii', await anFromN(await get(intArrayContent, intC))));
        intC = await implAdd(intC, 1);
    }
    await assertIsDcArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToAscii(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaToAscii:format-ascii'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    await assertIsDcArray(intArrayContent);
    let intArrayRes = [];
    let intL = 0;
    intL = await count(intArrayContent);
    let intC = 0;
    intC = 0;
    let intArrayTemp = [];
    let intDcAtIndex = 0;
    while (await implLt(intC, intL)) {
        intDcAtIndex = await get(intArrayContent, intC);
        intArrayTemp = await dcToFormat('utf8', intDcAtIndex);
        if (await arrNonempty(intArrayTemp)) {
            if (await isAsciiByte(await get(intArrayTemp, 0))) {
                intArrayRes = await append(intArrayRes, intArrayTemp);
            }
            else {
                await exportWarningUnmappable(intC, intDcAtIndex);
            }
        }
        else {
            await exportWarningUnmappable(intC, intDcAtIndex);
        }
        intC = await implAdd(intC, 1);
    }
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function isAsciiByte(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('isAsciiByte:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await intIsBetween(intN, 0, 127);

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsDigit(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsDigit:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await intIsBetween(intN, 48, 57);

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsPrintable(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsPrintable:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await intIsBetween(intN, 32, 126);

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsSpace(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsSpace:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await implEq(intN, 32);

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsNewline(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsNewline:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolT1 = false;
    boolT1 = await implEq(intN, 10);
    let boolT2 = false;
    boolT2 = await or(boolT1, await implEq(intN, 13));

    boolReturn = boolT2; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsLetterUpper(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsLetterUpper:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await intIsBetween(intN, 65, 90);

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsLetterLower(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsLetterLower:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await intIsBetween(intN, 97, 122);

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsLetter(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsLetter:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await asciiIsLetterLower(intN);
    boolTemp = await or(boolTemp, await asciiIsLetterUpper(intN));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function asciiIsAlphanum(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('asciiIsAlphanum:format-ascii'); await assertIsInt(intN); let boolReturn;

    let boolTemp = false;
    boolTemp = await asciiIsLetter(intN);
    boolTemp = await or(boolTemp, await asciiIsDigit(intN));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function crlf() {
    await internalDebugStackEnter('crlf:format-ascii'); let intArrayReturn;

    let intArrayTemp = [];
    intArrayTemp = [ 13, 10 ];

    intArrayReturn = intArrayTemp; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}
/* 0  NUL    16 DLE    32 SP   48 0    64 @    80 P    96  `    112 p */
/* 1  SOH    17 DC1    33 !    49 1    65 A    81 Q    97  a    113 q */
/* 2  STX    18 DC2    34 "    50 2    66 B    82 R    98  b    114 r */
/* 3  ETX    19 DC3    35 #    51 3    67 C    83 S    99  c    115 s */
/* 4  EOT    20 DC4    36 $    52 4    68 D    84 T    100 d    116 t */
/* 5  ENQ    21 NAK    37 %    53 5    69 E    85 U    101 e    117 u */
/* 6  ACK    22 SYN    38 &    54 6    70 F    86 V    102 f    118 v */
/* 7  BEL    23 ETB    39 '    55 7    71 G    87 W    103 g    119 w */
/* 8  BS     24 CAN    40 (    56 8    72 H    88 X    104 h    120 x */
/* 9  HT     25 EM     41 )    57 9    73 I    89 Y    105 i    121 y */
/* 10 LF     26 SUB    42 *    58 :    74 J    90 Z    106 j    122 z */
/* 11 VT     27 ESC    43 +    59 ;    75 K    91 [    107 k    123 { */
/* 12 FF     28 FS     44 ,    60 <    76 L    92 \    108 l    124 | */
/* 13 CR     29 GS     45 -    61 =    77 M    93 ]    109 m    125 } */
/* 14 SO     30 RS     46 .    62 >    78 N    94 ^    110 n    126 ~ */
/* 15 SI     31 US     47 /    63 ?    79 O    95 _    111 o    127 DEL */

async function runTestsFormatIntegerList(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatIntegerList:format-integerlist-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatIntegerList');
    await runTest(boolV, await arrEq([ 1, 2 ], await dcaFromIntegerList([ 49, 32, 50 ])));
    await runTest(boolV, await arrEq([ 49, 32, 50, 32 ], await dcaToIntegerList([ 1, 2 ])));

    await internalDebugStackExit();
}

async function runTestsFormatHtml(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatHtml:format-html-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatHtml');
    await runTest(boolV, await arrEq(await strToByteArray('<!DOCTYPE html><html><head><title></title></head><body><div style="white-space:pre-wrap">5&lt;6</div></body></html>'), await dcaToHtml([ 39, 46, 40 ])));

    await internalDebugStackExit();
}

async function dcaToHtmlFragment(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToHtmlFragment:format-htmlFragment'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    let intArrayOut = [];
    intArrayOut = await append(intArrayOut, await strToByteArray('<div style="white-space:pre-wrap">'));
    let intLen = 0;
    intLen = await count(intArrayDcIn);
    let intInputIndex = 0;
    intInputIndex = 0;
    let intDcAtIndex = 0;
    while (await implLt(intInputIndex, intLen)) {
        intDcAtIndex = await get(intArrayDcIn, intInputIndex);
        intArrayOut = await append(intArrayOut, await dcToFormat('html', intDcAtIndex));
        intInputIndex = await implAdd(intInputIndex, 1);
    }
    intArrayOut = await append(intArrayOut, await strToByteArray('</div>'));
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function runTestsFormatAscii(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatAscii:format-ascii-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatAscii');
    await runTest(boolV, await arrEq([ 0, 212, 120, 216, 221, 226, 231, 21, 26 ], await dcaFromAscii([ 0, 5, 10, 15, 20, 25, 30, 35, 40 ])));
    await runTest(boolV, await arrEq([ 0, 5, 10, 15, 20, 25, 30, 35, 40 ], await dcaToAscii([ 0, 212, 120, 216, 291, 221, 226, 231, 21, 26 ])));

    await internalDebugStackExit();
}

async function dcaFromElad(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dcaFromElad:format-elad'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    await assertIsByteArray(intArrayIn);
    let intArrayRes = [];
    /* FIXME: actually implement; make sure it doesn't recurse since elad parsing is needed to load language translation tables; presumably refactor logic into a separate routine and provide a separate routine for FromElad and FromEladWithoutLangSupport (if language support ever even ends up in the "From" parsers, where it makes little sense as it would only be guessing)... */
    intArrayRes = await dcaFromAscii(intArrayIn);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToElad(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dcaToElad:format-elad'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    let intArrayRes = [];
    /* FIXME: Implement */
    await assertIsByteArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function runTestsFormatUtf8(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatUtf8:format-utf8-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatUtf8');
    /* FIXME: Update tests for new remainder character format. */
    await runTest(boolV, await arrEq([ 35, 18, 36 ], await dcaFromUtf8([ 49, 32, 50 ])));
    await runTest(boolV, await arrEq([ 49, 32, 50 ], await dcaToUtf8([ 35, 18, 36 ])));
    /* Test for converting to UTF8+dcbnb with only one unmappable char at the end */
    await runTest(boolV, await arrEq(await append([ 49, 32, 50 ], await append(await getArmoredUtf8EmbeddedStartUuid(), await append([ 244, 131, 173, 156, 239, 159, 185 ], await getArmoredUtf8EmbeddedEndUuid(), ), ), ), await dcaToDcbnbUtf8([ 35, 18, 36, 291 ])));
    /* Test for converting to UTF8+dcbnb with intermixed mappable and nonmappable */
    await runTest(boolV, await arrEq(await append([ 49, 32, 50 ], await append(await getArmoredUtf8EmbeddedStartUuid(), await append([ 244, 131, 173, 156, 239, 159, 185, 50 ], await getArmoredUtf8EmbeddedEndUuid(), ), ), ), await dcaToDcbnbUtf8([ 35, 18, 36, 291, 36 ])));
    /* Tests for converting from UTF8+dcbnb */
    await runTest(boolV, await arrEq([ 35, 18, 36, 291, 36 ], await dcaFromDcbnbUtf8(await append([ 49, 32, 50 ], await append(await getArmoredUtf8EmbeddedStartUuid(), await append([ 244, 131, 173, 156, 244, 143, 191, 173, 50 ], await getArmoredUtf8EmbeddedEndUuid()))))));
    await runTest(boolV, await arrEq([ 35, 18, 36, 291 ], await dcaFromDcbnbUtf8(await append([ 49, 32, 50 ], await append(await getArmoredUtf8EmbeddedStartUuid(), await append([ 244, 131, 173, 156, 244, 143, 191, 173 ], await getArmoredUtf8EmbeddedEndUuid()))))));
    /* Make sure the dcbnb region gets output at the right place relative to the other chars (there's a bug where it outputs 18 18 11 instead of 18 11 18) */
    await runTest(boolV, await arrEq([ 18, 11, 18 ], await dcaFromDcbnbUtf8(await append([ 32 ], await append(await getArmoredUtf8EmbeddedStartUuid(), await append([ 244, 143, 191, 180, 244, 143, 191, 181 ], await append(await getArmoredUtf8EmbeddedEndUuid(), [ 32 ])))))));
    /* Same as the previous test, but with the spaces inside the start and end UUIDs. Works even though the previous one failed. */
    await runTest(boolV, await arrEq([ 18, 11, 18 ], await dcaFromDcbnbUtf8(await append(await getArmoredUtf8EmbeddedStartUuid(), await append([ 32, 244, 143, 191, 180, 244, 143, 191, 181, 32 ], await getArmoredUtf8EmbeddedEndUuid())))));
    /* Like the test after next but with only the first region */
    await runTest(boolV, await arrEq([ 89, 7 ], await dcaFromDcbnbUtf8([ 104, 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 184, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157 ])));
    /* Second half of the subsequent test */
    await runTest(boolV, await arrEq([ 11 ], await dcaFromDcbnbUtf8([ 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 180, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157 ])));
    /* Two dcbnb regions: The two halves work separately, but fail when together */
    await runTest(boolV, await arrEq([ 89, 7, 11 ], await dcaFromDcbnbUtf8([ 104, 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 184, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157, 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 180, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157 ])));
    /* It fails without the leading h as well. The issue is that the ( 7 11 ) mysteriously becomes ( 65533 65533 ) when they are together. */
    await runTest(boolV, await arrEq([ 7, 11 ], await dcaFromDcbnbUtf8([ 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 184, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157, 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 180, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157 ])));
    /* With the h in the middle separating the two dcbnb regions */
    await runTest(boolV, await arrEq([ 7, 89, 11 ], await dcaFromDcbnbUtf8([ 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 184, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157, 104, 244, 141, 129, 157, 244, 139, 182, 128, 243, 188, 183, 162, 243, 186, 128, 138, 243, 184, 165, 142, 244, 136, 186, 141, 243, 178, 139, 160, 244, 143, 186, 144, 244, 143, 191, 180, 244, 143, 191, 181, 243, 188, 133, 185, 243, 180, 182, 175, 244, 136, 161, 186, 243, 191, 148, 138, 244, 134, 178, 166, 244, 141, 184, 130, 243, 178, 128, 176, 244, 143, 188, 157 ])));
    /* "h\u{10d05d}\u{10bd80}\u{fcde2}\u{fa00a}\u{f894e}\u{108e8d}\u{f22e0}\u{10fe90}\u{10fff8}\u{10fff5}\u{fc179}\u{f4daf}\u{10887a}\u{ff50a}\u{106ca6}\u{10de02}\u{f2030}\u{10ff1d}\u{10d05d}\u{10bd80}\u{fcde2}\u{fa00a}\u{f894e}\u{108e8d}\u{f22e0}\u{10fe90}\u{10fff4}\u{10fff5}\u{fc179}\u{f4daf}\u{10887a}\u{ff50a}\u{106ca6}\u{10de02}\u{f2030}\u{10ff1d}" "244,141,129,157,244,139,182,128,243,188,183,162,243,186,128,138,243,184,165,142,244,136,186,141,243,178,139,160,244,143,186,144,244,143,191,184,244,143,191,181,243,188,133,185,243,180,182,175,244,136,161,186,243,191,148,138,244,134,178,166,244,141,184,130,243,178,128,176,244,143,188,157" "244,141,129,157,244,139,182,128,243,188,183,162,243,186,128,138,243,184,165,142,244,136,186,141,243,178,139,160,244,143,186,144,244,143,191,180,244,143,191,181,243,188,133,185,243,180,182,175,244,136,161,186,243,191,148,138,244,134,178,166,244,141,184,130,243,178,128,176,244,143,188,157" */
    /* Test for a bug that results in the output being 16 uppercase letter Bs */
    await runTest(boolV, await arrEq([ 6 ], await dcaFromDcbnbFragmentUtf8([ 244, 143, 191, 185, 239, 160, 129 ])));
    /* A simple one with new format remainder character */
    await runTest(boolV, await arrEq([ 82, 86, 5 ], await dcaFromDcbnbFragmentUtf8([ 97, 101, 244, 143, 191, 186, 239, 160, 129 ])));
    /* Tests for dcbnbGetLastChar */
    /* 82 86 5 */
    await runTest(boolV, await arrEq([ 244, 143, 191, 186, 239, 160, 129 ], await dcbnbGetLastChar([ 97, 101, 244, 143, 191, 186, 239, 160, 129 ])));
    /* invalid */
    await runTest(boolV, await arrEq([  ], await dcbnbGetLastChar([ 239, 160, 129 ])));
    /* invalid */
    await runTest(boolV, await arrEq([  ], await dcbnbGetLastChar([ 97, 101, 244, 143, 191, 186 ])));
    /* invalid 82 */
    await runTest(boolV, await arrEq([ 82 ], await dcbnbGetLastChar([ 244, 143, 191, 186, 97 ])));
    /* Tests for dcbnbGetFirstChar */
    /* 5 82 86 */
    await runTest(boolV, await arrEq([ 244, 143, 191, 186, 239, 160, 129 ], await dcbnbGetFirstChar([ 244, 143, 191, 186, 239, 160, 129, 97, 101 ])));
    /* invalid */
    await runTest(boolV, await arrEq([  ], await dcbnbGetFirstChar([ 239, 160, 129 ])));
    /* invalid 82 86 */
    await runTest(boolV, await arrEq([  ], await dcbnbGetFirstChar([ 239, 160, 129, 97, 101 ])));
    /* invalid 82 86 */
    await runTest(boolV, await arrEq([  ], await dcbnbGetFirstChar([ 244, 143, 191, 186, 97, 101 ])));
    /* 86 invalid */
    await runTest(boolV, await arrEq([ 86 ], await dcbnbGetFirstChar([ 101, 244, 143, 191, 186 ])));
    /* Tests for utf8CharArrayFromByteArray and vice versa */
    await runTest(boolV, await arrEq([ 50, 53, 54, 32, 50, 53, 56, 32, 50, 54, 48, 32, 50, 54, 50, 32, 50, 54, 52, 32, 50, 54, 51, 32, 53, 55, 32, 56, 54, 32, 57, 51, 32, 57, 51, 32, 57, 54, 32, 51, 48, 32, 49, 56, 32, 50, 56, 54, 32, 55, 50, 32, 57, 54, 32, 57, 57, 32, 57, 51, 32, 56, 53, 32, 50, 56, 55, 32, 49, 57, 32, 49, 56, 32, 50, 56, 52, 32, 50, 54, 49, 32, 50, 53, 57, 32, 35, 32, 115, 97, 121, 32, 34, 72, 101, 108, 108, 111, 44, 32, 47, 87, 111, 114, 108, 100, 47, 33, 32, 9917, 34, 10, 49, 32, 50, 32, 35, 32, 9917, 10 ], await utf8CharArrayFromByteArray([ 50, 53, 54, 32, 50, 53, 56, 32, 50, 54, 48, 32, 50, 54, 50, 32, 50, 54, 52, 32, 50, 54, 51, 32, 53, 55, 32, 56, 54, 32, 57, 51, 32, 57, 51, 32, 57, 54, 32, 51, 48, 32, 49, 56, 32, 50, 56, 54, 32, 55, 50, 32, 57, 54, 32, 57, 57, 32, 57, 51, 32, 56, 53, 32, 50, 56, 55, 32, 49, 57, 32, 49, 56, 32, 50, 56, 52, 32, 50, 54, 49, 32, 50, 53, 57, 32, 35, 32, 115, 97, 121, 32, 34, 72, 101, 108, 108, 111, 44, 32, 47, 87, 111, 114, 108, 100, 47, 33, 32, 226, 154, 189, 34, 10, 49, 32, 50, 32, 35, 32, 226, 154, 189, 10 ])));
    await runTest(boolV, await arrEq([ 50, 53, 54, 32, 50, 53, 56, 32, 50, 54, 48, 32, 50, 54, 50, 32, 50, 54, 52, 32, 50, 54, 51, 32, 53, 55, 32, 56, 54, 32, 57, 51, 32, 57, 51, 32, 57, 54, 32, 51, 48, 32, 49, 56, 32, 50, 56, 54, 32, 55, 50, 32, 57, 54, 32, 57, 57, 32, 57, 51, 32, 56, 53, 32, 50, 56, 55, 32, 49, 57, 32, 49, 56, 32, 50, 56, 52, 32, 50, 54, 49, 32, 50, 53, 57, 32, 35, 32, 115, 97, 121, 32, 34, 72, 101, 108, 108, 111, 44, 32, 47, 87, 111, 114, 108, 100, 47, 33, 32, 226, 154, 189, 34, 10, 49, 32, 50, 32, 35, 32, 226, 154, 189, 10 ], await byteArrayFromUtf8CharArray([ 50, 53, 54, 32, 50, 53, 56, 32, 50, 54, 48, 32, 50, 54, 50, 32, 50, 54, 52, 32, 50, 54, 51, 32, 53, 55, 32, 56, 54, 32, 57, 51, 32, 57, 51, 32, 57, 54, 32, 51, 48, 32, 49, 56, 32, 50, 56, 54, 32, 55, 50, 32, 57, 54, 32, 57, 57, 32, 57, 51, 32, 56, 53, 32, 50, 56, 55, 32, 49, 57, 32, 49, 56, 32, 50, 56, 52, 32, 50, 54, 49, 32, 50, 53, 57, 32, 35, 32, 115, 97, 121, 32, 34, 72, 101, 108, 108, 111, 44, 32, 47, 87, 111, 114, 108, 100, 47, 33, 32, 9917, 34, 10, 49, 32, 50, 32, 35, 32, 9917, 10 ])));

    await internalDebugStackExit();
}

async function dcaFromAsciiSafeSubset(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaFromAsciiSafeSubset:format-asciiSafeSubset'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    let intLen = 0;
    intLen = await count(intArrayContent);
    let intCounter = 0;
    intCounter = 0;
    let strState = '';
    strState = 'normal';
    let intArrayPrefilter = [];
    let intCurrentChar = 0;
    let boolStrict = false;
    boolStrict = false;
    if (await implEq('true', await getSettingForFormat('asciiSafeSubset', 'in', 'strict'))) {
        boolStrict = true;
    }
    while (await implLt(intCounter, intLen)) {
        intCurrentChar = await get(intArrayContent, intCounter);
        await assertIsTrue(await isAsciiSafeSubsetChar(intCurrentChar));
        if (await implAnd(boolStrict, await implAnd(await implEq(strState, 'normal'), await implEq(intCurrentChar, 10)))) {
            await implDie('LF without preceding CR not allowed in asciiSafeSubset strict mode.');
        }
        if (await implAnd(await implEq(strState, 'normal'), await implEq(intCurrentChar, 13))) {
            /* Wait to see if there's a lf after this cr. If so, treat them as a unit. */
            strState = 'crlf';
        }
        else if (await implEq(strState, 'crlf')) {
            strState = 'normal';
            intArrayPrefilter = await append(intArrayPrefilter, await crlf());
            if (await ne(intCurrentChar, 10)) {
                if (boolStrict) {
                    await implDie('CR followed by non-LF byte not allowed in asciiSafeSubset strict mode.');
                }
                /* Reparse the current character */
                intCounter = await implSub(intCounter, 1);
            }
        }
        else {
            intArrayPrefilter = await push(intArrayPrefilter, intCurrentChar);
        }
        intCounter = await implAdd(intCounter, 1);
    }
    intArrayPrefilter = await dcaFromAscii(intArrayPrefilter);

    intArrayReturn = intArrayPrefilter; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToAsciiSafeSubset(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToAsciiSafeSubset:format-asciiSafeSubset'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    let intArrayOut = [];
    let intArrayTemp = [];
    let intLen = 0;
    intLen = await count(intArrayDcIn);
    let intInputIndex = 0;
    intInputIndex = 0;
    let intDcAtIndex = 0;
    let strState = '';
    strState = 'normal';
    let intArrayMapTemp = [];
    while (await implLt(intInputIndex, intLen)) {
        intArrayMapTemp = await dcToFormat('utf8', await get(intArrayDcIn, intInputIndex));
        if (await implEq(0, await count(intArrayMapTemp))) {
            intArrayTemp = await setElement(intArrayTemp, intInputIndex, -1);
        }
        else {
            intArrayTemp = await setElement(intArrayTemp, intInputIndex, await get(intArrayMapTemp, 0));
        }
        intInputIndex = await implAdd(intInputIndex, 1);
    }
    intInputIndex = 0;
    let intArrayTempChar = [];
    while (await implLt(intInputIndex, intLen)) {
        intDcAtIndex = await get(intArrayDcIn, intInputIndex);
        if (await implEq(intDcAtIndex, 121)) {
            strState = 'crlf';
            intInputIndex = await implAdd(intInputIndex, 1);
            intDcAtIndex = await get(intArrayDcIn, intInputIndex);
        }
        if (await implEq(strState, 'normal')) {
            intArrayTempChar = await dcToFormat('utf8', intDcAtIndex);
            if (await implEq(0, await count(intArrayTempChar))) {
                await exportWarningUnmappable(intInputIndex, intDcAtIndex);
            }
            else {
                if (await dcIsNewline(intDcAtIndex)) {
                    intArrayOut = await append(intArrayOut, await crlf());
                }
                else if (await isAsciiSafeSubsetChar(await get(intArrayTempChar, 0))) {
                    intArrayOut = await push(intArrayOut, intArrayTempChar);
                }
                else {
                    await exportWarningUnmappable(intInputIndex, intDcAtIndex);
                }
            }
        }
        else if (await implEq(strState, 'crlf')) {
            strState = 'normal';
            if (await implEq(intDcAtIndex, 120)) {
                /* Found ambiguous cr, lf in a row, so only output one crlf */
                intArrayOut = await append(intArrayOut, await crlf());
            }
            else {
                /* Reprocess the current character with 'normal' state */
                intInputIndex = await implSub(intInputIndex, 1);
            }
        }
        intInputIndex = await implAdd(intInputIndex, 1);
    }
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function isAsciiSafeSubsetChar(intChar) {
    await internalDebugCollect('int Char = ' + intChar + '; '); await internalDebugStackEnter('isAsciiSafeSubsetChar:format-asciiSafeSubset'); await assertIsInt(intChar); let boolReturn;

    let boolRes = false;
    boolRes = await or(await asciiIsPrintable(intChar), await asciiIsNewline(intChar));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dcaFromIntegerList(intArrayContent) {
    await internalDebugCollect('intArray Content = ' + intArrayContent + '; '); await internalDebugStackEnter('dcaFromIntegerList:format-integerList'); await assertIsIntArray(intArrayContent); let intArrayReturn;

    await assertIsByteArray(intArrayContent);
    let intArrayRes = [];
    /* Accepts an array of bytes representing an ASCII list of integers representing Dcs. Returns an array of Dcs. This format is the same as sems but without supporting comments. */
    let strCurrentDc = '';
    strCurrentDc = '';
    let intContentLength = 0;
    intContentLength = await count(intArrayContent);
    let intByteOffset = 0;
    let intCurrentByte = 0;
    while (await implLt(intByteOffset, intContentLength)) {
        /* do something with each byte in the array. an/content[n/byteOffset] holds the decimal value of the given byte. These are Dcs encoded as ASCII text bytes, rather than an array of Dcs. */
        intCurrentByte = await get(intArrayContent, intByteOffset);
        if (await asciiIsDigit(intCurrentByte)) {
            strCurrentDc = await implCat(strCurrentDc, await charFromByte(intCurrentByte));
        }
        else if (await asciiIsSpace(intCurrentByte)) {
            intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentDc));
            strCurrentDc = '';
        }
        else {
            await implDie('Unexpected parser state in integerList document.');
        }
        intByteOffset = await implAdd(intByteOffset, 1);
    }
    if (await ne(0, await len(strCurrentDc))) {
        /* Ended without a trailing space */
        if (await implEq('true', await getSettingForFormat('integerList', 'in', 'strict'))) {
            await implDie('No trailing space present in integerList format while importing. This is not allowed in strict mode.');
        }
        intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentDc));
    }
    await assertIsDcArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dcaToIntegerList(intArrayDcIn) {
    await internalDebugCollect('intArray DcIn = ' + intArrayDcIn + '; '); await internalDebugStackEnter('dcaToIntegerList:format-integerList'); await assertIsIntArray(intArrayDcIn); let intArrayReturn;

    await assertIsDcArray(intArrayDcIn);
    let intArrayOut = [];
    let intLen = 0;
    intLen = await count(intArrayDcIn);
    let intInputIndex = 0;
    intInputIndex = 0;
    while (await implLt(intInputIndex, intLen)) {
        intArrayOut = await push(intArrayOut, await strToByteArray(await implCat(await strFrom(await get(intArrayDcIn, intInputIndex), ), ' ')));
        intInputIndex = await implAdd(intInputIndex, 1);
    }
    await assertIsByteArray(intArrayOut);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function runTestsFormatHtmlFragment(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsFormatHtmlFragment:format-htmlFragment-tests'); await assertIsBool(boolV);

    await testing(boolV, 'formatHtmlFragment');
    await runTest(boolV, await arrEq(await strToByteArray('<div style="white-space:pre-wrap">5&lt;6</div>'), await dcaToHtmlFragment([ 39, 46, 40 ])));

    await internalDebugStackExit();
}

async function dcPreprocessForFormat(intArrayIn, strFormat, strDirection) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Direction = ' + strDirection + '; '); await internalDebugStackEnter('dcPreprocessForFormat:dc-preprocess-for-format'); await assertIsIntArray(intArrayIn); await assertIsStr(strFormat); await assertIsStr(strDirection); let intArrayReturn;

    let intArrayRes = [];
    intArrayRes = intArrayIn;
    let strPreferredLang = '';
    strPreferredLang = await getPreferredLanguageForFormat(strFormat, strDirection);
    let strPreferredCodeLang = '';
    strPreferredCodeLang = await getPreferredCodeLanguageForFormat(strFormat, strDirection);
    let strTemp = '';
    if (await implIn('prefilter_semantic', await getSettingsForFormat(strFormat, strDirection))) {
        strTemp = await pushFormatImportSetting('semanticToText', 'language', strPreferredLang);
        intArrayRes = await dctSemanticToText(intArrayRes);
        await setFormatImportSetting('semanticToText', 'language', strTemp);
    }
    if (await implIn('prefilter_code', await getSettingsForFormat(strFormat, strDirection))) {
        strTemp = await pushFormatImportSetting('codeToText', 'language', strPreferredCodeLang);
        intArrayRes = await dctCodeToText(intArrayRes);
        await setFormatImportSetting('codeToText', 'language', strTemp);
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function isSupportedDocumentTransformation(strTransform) {
    await internalDebugCollect('str Transform = ' + strTransform + '; '); await internalDebugStackEnter('isSupportedDocumentTransformation:document-transformations'); await assertIsStr(strTransform); let boolReturn;

    let boolRes = false;
    boolRes = await implIn(strTransform, strArrayListDocumentTransformations);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function assertIsSupportedDocumentTransformation(strTransform) {
    await internalDebugCollect('str Transform = ' + strTransform + '; '); await internalDebugStackEnter('assertIsSupportedDocumentTransformation:document-transformations'); await assertIsStr(strTransform);

    await assertIsTrue(await isSupportedDocumentTransformation(strTransform));

    await internalDebugStackExit();
}

async function applyDocumentTransformation(strTransform, intArrayDcArrayIn) {
    await internalDebugCollect('str Transform = ' + strTransform + '; '); await internalDebugCollect('intArray DcArrayIn = ' + intArrayDcArrayIn + '; '); await internalDebugStackEnter('applyDocumentTransformation:document-transformations'); await assertIsStr(strTransform); await assertIsIntArray(intArrayDcArrayIn); let intArrayReturn;

    await assertIsSupportedDocumentTransformation(strTransform);
    await assertIsDcArray(intArrayDcArrayIn);
    let intArrayRes = [];
    if (await implEq(strTransform, 'semanticToText')) {
        intArrayRes = await dctSemanticToText(intArrayDcArrayIn);
    }
    else if (await implEq(strTransform, 'codeToText')) {
        intArrayRes = await dctCodeToText(intArrayDcArrayIn);
    }
    else {
        await implDie(await implCat('Unimplemented document transformation: ', strTransform));
    }
    await assertIsDcArray(intArrayRes);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

/* This file contains the public interface for EITE StageR. */
/* If you just want to run EITE, use the following routine. */

async function startEite() {
    await internalDebugStackEnter('startEite:public-interface');

    /* Start EITE, using the default startup document. Does not return while EITE is still running. */
    await loadAndRun('sems', 'eite.sems');

    await internalDebugStackExit();
}
/* If you want to run a different document, you can call loadAndRun with the format of the document to open and its location. */

async function loadAndRun(strFormat, strPath) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Path = ' + strPath + '; '); await internalDebugStackEnter('loadAndRun:public-interface'); await assertIsStr(strFormat); await assertIsStr(strPath);

    /* Load and run the specified document. Does not return while the document is still running. */
    await runDocument(await loadStoredDocument(strFormat, strPath));

    await internalDebugStackExit();
}
/* If you want to convert a document to another format, you can call loadAndConvert with the format of the document, its location, and the format you want the results in. */

async function loadAndConvert(strInputFormat, strOutputFormat, strPath) {
    await internalDebugCollect('str InputFormat = ' + strInputFormat + '; '); await internalDebugCollect('str OutputFormat = ' + strOutputFormat + '; '); await internalDebugCollect('str Path = ' + strPath + '; '); await internalDebugStackEnter('loadAndConvert:public-interface'); await assertIsStr(strInputFormat); await assertIsStr(strOutputFormat); await assertIsStr(strPath); let intArrayReturn;

    /* Load the specified document, and return it converted to the specified outputFormat as an array of bytes. */
    let intArrayOut = [];
    intArrayOut = await exportDocument(strOutputFormat, await loadStoredDocument(strInputFormat, strPath), );
}
/* To operate on a document you already have as a Dc array, you can call runDocument or convertDocument directly on it. Or, if you already have it as a byte array, you can call importDocument or importAndExport on it. */

async function runDocument(intArrayContents) {
    await internalDebugCollect('intArray Contents = ' + intArrayContents + '; '); await internalDebugStackEnter('runDocument:public-interface'); await assertIsIntArray(intArrayContents);

    /* Run the provided document. Does not return while the document is still running. Takes care of events and I/O automatically. */
    await runDocumentGo(await runDocumentPrepare(intArrayContents));

    await internalDebugStackExit();
}

async function runDocumentPrepare(intArrayContents) {
    await internalDebugCollect('intArray Contents = ' + intArrayContents + '; '); await internalDebugStackEnter('runDocumentPrepare:public-interface'); await assertIsIntArray(intArrayContents); let intReturn;

    /* Prepare to run the provided document. Use this followed by runDocumentGo if you want to configure execution settings before starting the document. */
    await setupIfNeeded();
    await assertIsDcArray(intArrayContents);
    let intExecId = 0;
    intExecId = await prepareDocumentExec(intArrayContents);
    await assertIsExecId(intExecId);

    intReturn = intExecId; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function runDocumentGo(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('runDocumentGo:public-interface'); await assertIsInt(intExecId);

    /* Run a document, once it's been prepared to run by calling runDocumentPrepare. */
    await internalRunDocument(intExecId);

    await internalDebugStackExit();
}

async function getExecOption(intExecId, strKey) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('getExecOption:public-interface'); await assertIsInt(intExecId); await assertIsStr(strKey); let strReturn;

    /* Get the value of an execution option for a document. */
    await setupIfNeeded();
    await assertIsExecId(intExecId);
    let strRes = '';
    strRes = await kvGetValue(await getExecSettings(intExecId), strKey);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getExecOptions(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getExecOptions:public-interface'); await assertIsInt(intExecId); let strArrayReturn;

    /* Get the execution options set for a document. */
    await setupIfNeeded();
    await assertIsExecId(intExecId);
    let strArrayRes = [];
    strArrayRes = await getExecSettings(intExecId);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function setExecOption(intExecId, strKey, strValue) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Value = ' + strValue + '; '); await internalDebugStackEnter('setExecOption:public-interface'); await assertIsInt(intExecId); await assertIsStr(strKey); await assertIsStr(strValue);

    /* Set an execution option for a document. */
    await setupIfNeeded();
    await assertIsExecId(intExecId);
    await setExecSettings(intExecId, await kvSetValue(await getExecSettings(intExecId), strKey, strValue));

    await internalDebugStackExit();
}

async function exportDocument(strFormat, intArrayContents) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('intArray Contents = ' + intArrayContents + '; '); await internalDebugStackEnter('exportDocument:public-interface'); await assertIsStr(strFormat); await assertIsIntArray(intArrayContents); let intArrayReturn;

    await setupIfNeeded();
    await assertIsSupportedOutputFormat(strFormat);
    /* Convert a document stored as an array of dcs to the specified format, and return it as an array of bytes. */
    await setupIfNeeded();
    let intArrayOut = [];
    intArrayOut = await dcaToFormat(strFormat, intArrayContents);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function importDocument(strFormat, intArrayContents) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('intArray Contents = ' + intArrayContents + '; '); await internalDebugStackEnter('importDocument:public-interface'); await assertIsStr(strFormat); await assertIsIntArray(intArrayContents); let intArrayReturn;

    await setupIfNeeded();
    await assertIsSupportedInputFormat(strFormat);
    /* Convert a document stored as an array of bytes in the specified format, and return it as an array of dc. */
    await setupIfNeeded();
    let intArrayOut = [];
    intArrayOut = await dcaFromFormat(strFormat, intArrayContents);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function importAndExport(strInputFormat, strOutputFormat, intArrayContents) {
    await internalDebugCollect('str InputFormat = ' + strInputFormat + '; '); await internalDebugCollect('str OutputFormat = ' + strOutputFormat + '; '); await internalDebugCollect('intArray Contents = ' + intArrayContents + '; '); await internalDebugStackEnter('importAndExport:public-interface'); await assertIsStr(strInputFormat); await assertIsStr(strOutputFormat); await assertIsIntArray(intArrayContents); let intArrayReturn;

    await setupIfNeeded();
    await assertIsSupportedInputFormat(strInputFormat);
    await assertIsSupportedOutputFormat(strOutputFormat);
    /* Convert a document stored as an array of bytes in the specified input format, and return it as an array of bytes in the specified output format. */
    let intArrayOut = [];
    intArrayOut = await convertFormats(strInputFormat, strOutputFormat, intArrayContents);

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function getFormatImportSetting(strFormat, strKey) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('getFormatImportSetting:public-interface'); await assertIsStr(strFormat); await assertIsStr(strKey); let strReturn;

    /* Return the value of the specified import setting for the specified format. */
    let strRes = '';
    strRes = await kvGetValue(await getFormatImportSettings(strFormat), strKey);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatExportSetting(strFormat, strKey) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('getFormatExportSetting:public-interface'); await assertIsStr(strFormat); await assertIsStr(strKey); let strReturn;

    /* Return the value of the specified export setting for the specified format. */
    let strRes = '';
    strRes = await kvGetValue(await getFormatExportSettings(strFormat), strKey);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function setFormatImportSetting(strFormat, strKey, strValue) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Value = ' + strValue + '; '); await internalDebugStackEnter('setFormatImportSetting:public-interface'); await assertIsStr(strFormat); await assertIsStr(strKey); await assertIsStr(strValue);

    /* Set the value of the specified import setting for the specified format. */
    await setFormatImportSettings(strFormat, await kvSetValue(await getFormatImportSettings(strFormat), strKey, strValue));

    await internalDebugStackExit();
}

async function setFormatExportSetting(strFormat, strKey, strValue) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Value = ' + strValue + '; '); await internalDebugStackEnter('setFormatExportSetting:public-interface'); await assertIsStr(strFormat); await assertIsStr(strKey); await assertIsStr(strValue);

    /* Set the value of the specified export setting for the specified format. */
    await setFormatExportSettings(strFormat, await kvSetValue(await getFormatExportSettings(strFormat), strKey, strValue));

    await internalDebugStackExit();
}

async function pushFormatImportSetting(strFormat, strKey, strValue) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Value = ' + strValue + '; '); await internalDebugStackEnter('pushFormatImportSetting:public-interface'); await assertIsStr(strFormat); await assertIsStr(strKey); await assertIsStr(strValue); let strReturn;

    /* Temporarily set the value of the specified import setting for the specified format. Call setFormatImportSetting with the value this returns when you want to put the setting back. */
    let strResult = '';
    strResult = await getFormatImportSetting(strFormat, strKey);
    await setFormatImportSetting(strFormat, strKey, strValue);

    strReturn = strResult; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function pushFormatExportSetting(strFormat, strKey, strValue) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Value = ' + strValue + '; '); await internalDebugStackEnter('pushFormatExportSetting:public-interface'); await assertIsStr(strFormat); await assertIsStr(strKey); await assertIsStr(strValue); let strReturn;

    /* Temporarily set the value of the specified export setting for the specified format. Call setFormatExportSetting with the value this returns when you want to put the setting back. */
    let strResult = '';
    strResult = await getFormatExportSetting(strFormat, strKey);
    await setFormatExportSetting(strFormat, strKey, strValue);

    strReturn = strResult; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function getFormatImportSettings(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatImportSettings:public-interface'); await assertIsStr(strFormat); let strArrayReturn;

    /* Return the import settings array for the specified format. */
    await setupIfNeeded();
    await assertIsSupportedInputFormat(strFormat);
    let strArrayRes = [];
    strArrayRes = await getSettingsForFormat(strFormat, 'in');

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function getFormatExportSettings(strFormat) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getFormatExportSettings:public-interface'); await assertIsStr(strFormat); let strArrayReturn;

    /* Return the export settings array for the specified format. */
    await setupIfNeeded();
    await assertIsSupportedOutputFormat(strFormat);
    let strArrayRes = [];
    strArrayRes = await getSettingsForFormat(strFormat, 'out');

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function setFormatImportSettings(strFormat, strArraySettings) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('strArray Settings = ' + strArraySettings + '; '); await internalDebugStackEnter('setFormatImportSettings:public-interface'); await assertIsStr(strFormat); await assertIsStrArray(strArraySettings);

    /* Replace the import settings array for the specified format. */
    await setupIfNeeded();
    await assertIsSupportedInputFormat(strFormat);
    await setImportSettings(await getFormatId(strFormat), await kvJoin(strArraySettings));

    await internalDebugStackExit();
}

async function setFormatExportSettings(strFormat, strArraySettings) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('strArray Settings = ' + strArraySettings + '; '); await internalDebugStackEnter('setFormatExportSettings:public-interface'); await assertIsStr(strFormat); await assertIsStrArray(strArraySettings);

    /* Replace the export settings array for the specified format. */
    await setupIfNeeded();
    await assertIsSupportedOutputFormat(strFormat);
    await setExportSettings(await getFormatId(strFormat), await kvJoin(strArraySettings));

    await internalDebugStackExit();
}

async function transformDocument(intArrayInputDocument, strTransformation) {
    await internalDebugCollect('intArray InputDocument = ' + intArrayInputDocument + '; '); await internalDebugCollect('str Transformation = ' + strTransformation + '; '); await internalDebugStackEnter('transformDocument:public-interface'); await assertIsIntArray(intArrayInputDocument); await assertIsStr(strTransformation); let intArrayReturn;

    /* Apply one of the supported document transformations to the provided document, and return the result. */
    await setupIfNeeded();
    await assertIsSupportedDocumentTransformation(strTransformation);
    let intArrayResult = [];
    intArrayResult = await applyDocumentTransformation(strTransformation, intArrayInputDocument);

    intArrayReturn = intArrayResult; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}
/* If you want more control over the document loading and execution, you can use these lower-level functions. */

async function loadStoredDocument(strFormat, strPath) {
    await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugCollect('str Path = ' + strPath + '; '); await internalDebugStackEnter('loadStoredDocument:public-interface'); await assertIsStr(strFormat); await assertIsStr(strPath); let intArrayReturn;

    /* Load and return the specified document as a Dc array. */
    await setupIfNeeded();
    await assertIsSupportedInputFormat(strFormat);
    let intArrayRes = [];
    intArrayRes = await dcaFromFormat(strFormat, await getFileFromPath(strPath));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function getDesiredEventNotifications(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getDesiredEventNotifications:public-interface'); await assertIsInt(intExecId); let strArrayReturn;

    /* Return list of event types (e.g. keystrokes, mouse movement, elapsed time) that the document wants to be notified of. */
    let strArrayRes = [];

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function sendEvent(intExecId, intArrayEventData) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('intArray EventData = ' + intArrayEventData + '; '); await internalDebugStackEnter('sendEvent:public-interface'); await assertIsInt(intExecId); await assertIsIntArray(intArrayEventData); let intArrayReturn;

    /* Send the provided event or events data to the specified document. */
}

async function getDocumentFrame(intExecId, strFormat) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('str Format = ' + strFormat + '; '); await internalDebugStackEnter('getDocumentFrame:public-interface'); await assertIsInt(intExecId); await assertIsStr(strFormat); let intArrayReturn;

    await assertIsSupportedOutputFormat(strFormat);
    /* Return the most recently available output for the given document in the requested format. */
}
/* To run the tests, you can use runTests or runPrintTests. */

async function runTests() {
    await internalDebugStackEnter('runTests:public-interface'); let boolReturn;

    /* Returns true if all tests pass; false otherwise. Displays a report of the tests. */
    await setupIfNeeded();
    await clearTestStats();
    await runTestsOnly(true);
    await reportTests();
    if (await implEq(intFailedTests, 0)) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function quietRunTests() {
    await internalDebugStackEnter('quietRunTests:public-interface'); let boolReturn;

    /* Returns true if all tests pass; false otherwise. */
    await setupIfNeeded();
    let boolRes = false;
    boolRes = await runTestsOnly(false);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function dctSemanticToText(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dctSemanticToText:semantic-to-text'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    let intArrayRes = [];
    let intC = 0;
    intC = 0;
    let intL = 0;
    intL = await count(intArrayIn);
    let intCurrentDc = 0;
    let strTargetLanguage = '';
    strTargetLanguage = await implCat('lang_', await getFormatImportSetting('semanticToText', 'language'));
    if (await implEq('lang_', strTargetLanguage)) {
        strTargetLanguage = await implCat('lang_', await getEnvLanguage());
    }
    let strTemp = '';
    while (await implLt(intC, intL)) {
        intCurrentDc = await get(intArrayIn, intC);
        if (await implEq('Semantic', await dcGetScript(intCurrentDc))) {
            strTemp = await dcGetMappingToFormat(intCurrentDc, strTargetLanguage);
            if (await ne(0, await len(strTemp))) {
                intArrayRes = await append(intArrayRes, await dcaFromElad(strTemp));
            }
            else {
                intArrayRes = await push(intArrayRes, intCurrentDc);
            }
        }
        intC = await inc(intC);
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function dctCodeToText(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('dctCodeToText:code-to-text'); await assertIsIntArray(intArrayIn); let intArrayReturn;

    let intArrayRes = [];
    let intC = 0;
    intC = 0;
    let intL = 0;
    intL = await count(intArrayIn);
    let intCurrentDc = 0;
    let strTargetLanguage = '';
    strTargetLanguage = await getFormatImportSetting('codeToText', 'language');
    if (await implEq(0, await len(strTargetLanguage))) {
        strTargetLanguage = await getEnvCodeLanguage();
    }
    let strTemp = '';
    while (await implLt(intC, intL)) {
        intCurrentDc = await get(intArrayIn, intC);
        if (await dcIsELCode(intCurrentDc)) {
            strTemp = await dcGetMappingToFormat(intCurrentDc, strTargetLanguage);
            if (await ne(0, await len(strTemp))) {
                intArrayRes = await append(intArrayRes, await dcaFromElad(strTemp));
            }
            else {
                intArrayRes = await push(intArrayRes, intCurrentDc);
            }
        }
        intC = await inc(intC);
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function runTestsDocumentExec(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsDocumentExec:document-exec-tests'); await assertIsBool(boolV);

    await testing(boolV, 'documentExec');
    await runExecTest(boolV, 'at-comment-no-space', 10);
    await runExecTest(boolV, 'at-comment', 10);
    await runExecTest(boolV, 'at-nl', 10);
    await runExecTest(boolV, 'at-space-nl', 10);
    await runExecTest(boolV, 'hello-world', 100);

    await internalDebugStackExit();
}

async function runExecTest(boolV, strTestName, intTicksNeeded) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugCollect('str TestName = ' + strTestName + '; '); await internalDebugCollect('int TicksNeeded = ' + intTicksNeeded + '; '); await internalDebugStackEnter('runExecTest:document-exec-tests'); await assertIsBool(boolV); await assertIsStr(strTestName); await assertIsInt(intTicksNeeded);

    let intExecId = 0;
    intExecId = await runDocumentPrepare(await loadStoredDocument('sems', await implCat('exec-tests/', await implCat(strTestName, '.sems'))));
    await setExecOption(intExecId, 'stopExecAtTick', await strFrom(intTicksNeeded));
    await setExecOption(intExecId, 'runHeadless', 'true');
    await runDocumentGo(intExecId);
    await runTest(boolV, await arrEq(await getCurrentExecFrame(intExecId), await loadStoredDocument('sems', await implCat('exec-tests/', await implCat(strTestName, '.out.sems')))));

    await internalDebugStackExit();
}

async function prepareDocumentExec(intArrayContents) {
    await internalDebugCollect('intArray Contents = ' + intArrayContents + '; '); await internalDebugStackEnter('prepareDocumentExec:document-exec'); await assertIsIntArray(intArrayContents); let intReturn;

    let intExecId = 0;
    intExecId = -1;
    /* documentExecData is a global, created during initialization. It holds the current document state for any documents being executed. */
    intExecId = await count(strArrayDocumentExecPtrs);
    strArrayDocumentExecData = await push(strArrayDocumentExecData, await strPrintArr(intArrayContents));
    /* documentExecPtrs is also a global created during init; it holds the current execution state of each document as an array of strings of of comma-terminated ints with the last indicating the position in the document where execution is (the earlier ints represent where execution should return to upon exiting the current scope, so it acts as a stack). */
    strArrayDocumentExecSymbolIndex = await push(strArrayDocumentExecSymbolIndex, '');
    strArrayDocumentExecPtrs = await push(strArrayDocumentExecPtrs, '0,');
    strArrayDocumentExecFrames = await push(strArrayDocumentExecFrames, '');
    strArrayDocumentExecEvents = await push(strArrayDocumentExecEvents, '');
    strArrayDocumentExecLogs = await push(strArrayDocumentExecLogs, '');
    strArrayDocumentExecSettings = await push(strArrayDocumentExecSettings, ',');
    await assertIsExecId(intExecId);

    intReturn = intExecId; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function isExecId(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('isExecId:document-exec'); await assertIsInt(intExecId); let boolReturn;

    if (await implLt(intExecId, await count(strArrayDocumentExecPtrs))) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function getExecSettings(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getExecSettings:document-exec'); await assertIsInt(intExecId); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await kvSplit(await get(strArrayDocumentExecSettings, intExecId));

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function setExecSettings(intExecId, strArrayVal) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('strArray Val = ' + strArrayVal + '; '); await internalDebugStackEnter('setExecSettings:document-exec'); await assertIsInt(intExecId); await assertIsStrArray(strArrayVal);

    /* Replace the entire exec settings array for this exec. */
    strArrayDocumentExecSettings = await setElem(strArrayDocumentExecSettings, intExecId, await kvJoin(strArrayVal));

    await internalDebugStackExit();
}

async function getExecPtrs(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getExecPtrs:document-exec'); await assertIsInt(intExecId); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await strSplitEsc(await get(strArrayDocumentExecPtrs, intExecId), ',');

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function setExecPtrs(intExecId, strArrayVal) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('strArray Val = ' + strArrayVal + '; '); await internalDebugStackEnter('setExecPtrs:document-exec'); await assertIsInt(intExecId); await assertIsStrArray(strArrayVal);

    /* Replace the entire exec pointer array for this exec. */
    strArrayDocumentExecPtrs = await setElem(strArrayDocumentExecPtrs, intExecId, await strJoinEsc(strArrayVal, ','));

    await internalDebugStackExit();
}

async function getCurrentExecPtrPos(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getCurrentExecPtrPos:document-exec'); await assertIsInt(intExecId); let intReturn;

    let intRes = 0;
    intRes = await intFromIntStr(await get(await getExecPtrs(intExecId), -1));

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function setExecPtrPos(intExecId, intNewPos) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugCollect('int NewPos = ' + intNewPos + '; '); await internalDebugStackEnter('setExecPtrPos:document-exec'); await assertIsInt(intExecId); await assertIsInt(intNewPos);

    await setExecPtrs(intExecId, await setElem(await getExecPtrs(intExecId), -1, await strFrom(intNewPos)));

    await internalDebugStackExit();
}

async function incrExecPtrPos(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('incrExecPtrPos:document-exec'); await assertIsInt(intExecId);

    await setExecPtrPos(intExecId, await implAdd(1, await getCurrentExecPtrPos(intExecId)));

    await internalDebugStackExit();
}

async function getNextLevelExecPtrPos(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getNextLevelExecPtrPos:document-exec'); await assertIsInt(intExecId); let intReturn;

    let intRes = 0;
    intRes = await intFromIntStr(await get(await getExecPtrs(intExecId), -2));

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function getCurrentExecData(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getCurrentExecData:document-exec'); await assertIsInt(intExecId); let intArrayReturn;

    let intArrayRes = [];
    intArrayRes = await intArrFromStrPrintedArr(await get(strArrayDocumentExecData, intExecId));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function getCurrentExecFrame(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('getCurrentExecFrame:document-exec'); await assertIsInt(intExecId); let intArrayReturn;

    let intArrayRes = [];
    intArrayRes = await intArrFromStrPrintedArr(await get(strArrayDocumentExecFrames, intExecId));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function startDocumentExec(intExecId) {
    await internalDebugCollect('int ExecId = ' + intExecId + '; '); await internalDebugStackEnter('startDocumentExec:document-exec'); await assertIsInt(intExecId);

    await assertIsExecId(intExecId);
    let boolContinue = false;
    boolContinue = true;
    let intCurrentPtrPos = 0;
    let intArrayWipFrame = [];
    let intDc = 0;
    let intArrayDocumentWorkingCopyData = [];
    intArrayDocumentWorkingCopyData = await intArrFromStrPrintedArr(await get(strArrayDocumentExecData, intExecId));
    let strArrayState = [];
    strArrayState = [ 'normal' ];
    let boolLastCharacterWasEscape = false;
    boolLastCharacterWasEscape = false;
    let intStopExecAtTick = 0;
    intStopExecAtTick = await positiveIntFromIntStr(await getExecOption(intExecId, 'stopExecAtTick'));
    let boolRunHeadless = false;
    boolRunHeadless = await implEq('true', await getExecOption(intExecId, 'runHeadless'));
    let intCurrentTick = 0;
    intCurrentTick = 0;
    if (await isNonnegative(intStopExecAtTick)) {
        if (await ge(intCurrentTick, await implAdd(-1, intStopExecAtTick))) {
            boolContinue = false;
        }
    }
    while (boolContinue) {
        if (await isNonnegative(intStopExecAtTick)) {
            if (await ge(intCurrentTick, await implAdd(-1, intStopExecAtTick))) {
                boolContinue = false;
            }
        }
        intCurrentTick = await inc(intCurrentTick);
        /* This loop goes through each Dc in the document, running it. */
        /* Where are we in the document? Store it in n/currentPtrPos. */
        /* n/currentPtrPos is a read-only copy! For changing it, call setExecPtrPos or incrExecPtrPos */
        intCurrentPtrPos = await getCurrentExecPtrPos(intExecId);
        /* The execution process basically is a big state machine. */
        if (await ge(intCurrentPtrPos, await count(intArrayDocumentWorkingCopyData))) {
            /* We're done with the document */
            boolContinue = false;
        }
        else {
            intDc = await get(intArrayDocumentWorkingCopyData, intCurrentPtrPos);
            await debugRev(1, await implCat('Starting exec loop with data ', await implCat(await strPrintArr(intArrayDocumentWorkingCopyData), await implCat(' and at position ', await implCat(await strFrom(intCurrentPtrPos), await implCat(' with current Dc ', await implCat(await strFrom(intDc), await implCat('; in state ', await implCat(await strPrintArr(strArrayState), await implCat(' at tick ', await implCat(await strFrom(intCurrentTick), '.')))))))))));
            if (boolLastCharacterWasEscape) {
                boolLastCharacterWasEscape = false;
                await incrExecPtrPos(intExecId);
            }
            else {
                /* Char isn't escaped, so process it normally */
                if (await implEq(intDc, 255)) {
                    boolLastCharacterWasEscape = true;
                }
                else {
                    if (await implEq('normal', await last(strArrayState))) {
                        if (await implIn(intDc, [ 246, 247 ])) {
                            strArrayState = await push(strArrayState, 'single-line source comment');
                        }
                        else if (await implIn(intDc, [ 249, 250 ])) {
                            strArrayState = await push(strArrayState, 'block source comment');
                        }
                        if (await dcIsELCode(intDc)) {
                            /* FIXME unimplemented */
                        }
                        else {
                            /* Normal Dc, or at least we don't know what it is */
                            intArrayWipFrame = await push(intArrayWipFrame, intDc);
                        }
                    }
                    else if (await implEq('single-line source comment', await last(strArrayState))) {
                        if (await implEq(intDc, 248)) {
                            strArrayState = await pop(strArrayState);
                        }
                    }
                    else if (await implEq('block source comment', await last(strArrayState))) {
                        if (await implEq(intDc, 251)) {
                            strArrayState = await pop(strArrayState);
                        }
                    }
                }
                await incrExecPtrPos(intExecId);
            }
        }
        if (await implAnd(await implNot(boolRunHeadless), await implEq(0, await implMod(intCurrentTick, 100)))) {
            /* Convert the frame data to the environment-appropriate format and output it. Ideally this would happen at more sensible intervals, but this is easy to implement... */
            await setElement(strArrayDocumentExecFrames, intExecId, await printArr(intArrayWipFrame));
            await renderDrawContents(await dcaToFormat(await getEnvPreferredFormat(), await getCurrentExecFrame(intExecId)));
        }
    }
    await setElement(strArrayDocumentExecFrames, intExecId, await printArr(intArrayWipFrame));
    await renderDrawContents(await dcaToFormat(await getEnvPreferredFormat(), await getCurrentExecFrame(intExecId)));

    await internalDebugStackExit();
}

async function abSubset(boolArrayIn, intStart, intEnd) {
    await internalDebugCollect('boolArray In = ' + boolArrayIn + '; '); await internalDebugCollect('int Start = ' + intStart + '; '); await internalDebugCollect('int End = ' + intEnd + '; '); await internalDebugStackEnter('abSubset:arrays'); await assertIsBoolArray(boolArrayIn); await assertIsInt(intStart); await assertIsInt(intEnd); let boolArrayReturn;

    let intCount = 0;
    intCount = await count(boolArrayIn);
    if (await implLt(intStart, 0)) {
        intStart = await implAdd(intCount, intStart);
    }
    if (await implLt(intEnd, 0)) {
        intEnd = await implAdd(intCount, intEnd);
    }
    let intI = 0;
    intI = intStart;
    intCount = intEnd;
    let boolArrayRes = [];
    while (await le(intI, intCount)) {
        boolArrayRes = await push(boolArrayRes, await get(boolArrayIn, intI));
        intI = await implAdd(intI, 1);
    }

    boolArrayReturn = boolArrayRes; await assertIsBoolArray(boolArrayReturn); await internalDebugStackExit(); return boolArrayReturn;
}

async function anSubset(intArrayIn, intStart, intEnd) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugCollect('int Start = ' + intStart + '; '); await internalDebugCollect('int End = ' + intEnd + '; '); await internalDebugStackEnter('anSubset:arrays'); await assertIsIntArray(intArrayIn); await assertIsInt(intStart); await assertIsInt(intEnd); let intArrayReturn;

    let intCount = 0;
    intCount = await count(intArrayIn);
    if (await implLt(intStart, 0)) {
        intStart = await implAdd(intCount, intStart);
    }
    if (await implLt(intEnd, 0)) {
        intEnd = await implAdd(intCount, intEnd);
    }
    let intI = 0;
    intI = intStart;
    intCount = intEnd;
    let intArrayRes = [];
    while (await le(intI, intCount)) {
        intArrayRes = await push(intArrayRes, await get(intArrayIn, intI));
        intI = await implAdd(intI, 1);
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function asSubset(strArrayIn, intStart, intEnd) {
    await internalDebugCollect('strArray In = ' + strArrayIn + '; '); await internalDebugCollect('int Start = ' + intStart + '; '); await internalDebugCollect('int End = ' + intEnd + '; '); await internalDebugStackEnter('asSubset:arrays'); await assertIsStrArray(strArrayIn); await assertIsInt(intStart); await assertIsInt(intEnd); let strArrayReturn;

    let intCount = 0;
    intCount = await count(strArrayIn);
    if (await implLt(intStart, 0)) {
        intStart = await implAdd(intCount, intStart);
    }
    if (await implLt(intEnd, 0)) {
        intEnd = await implAdd(intCount, intEnd);
    }
    let intI = 0;
    intI = intStart;
    intCount = intEnd;
    let strArrayRes = [];
    while (await le(intI, intCount)) {
        strArrayRes = await push(strArrayRes, await get(strArrayIn, intI));
        intI = await implAdd(intI, 1);
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function abFromB(boolIn) {
    await internalDebugCollect('bool In = ' + boolIn + '; '); await internalDebugStackEnter('abFromB:arrays'); await assertIsBool(boolIn); let boolArrayReturn;

    let boolArrayRes = [];
    boolArrayRes = await push(boolArrayRes, boolIn);

    boolArrayReturn = boolArrayRes; await assertIsBoolArray(boolArrayReturn); await internalDebugStackExit(); return boolArrayReturn;
}

async function anFromN(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('anFromN:arrays'); await assertIsInt(intIn); let intArrayReturn;

    let intArrayRes = [];
    intArrayRes = await push(intArrayRes, intIn);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function asFromS(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('asFromS:arrays'); await assertIsStr(strIn); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await push(strArrayRes, strIn);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function contains(genericArrayIn, genericValue) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugCollect('generic Value = ' + genericValue + '; '); await internalDebugStackEnter('contains:arrays'); await assertIsGenericArray(genericArrayIn); await assertIsGeneric(genericValue); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implEq(genericElem, genericValue)) {

            boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function implIn(genericValue, genericArrayIn) {
    await internalDebugCollect('generic Value = ' + genericValue + '; '); await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('implIn:arrays'); await assertIsGeneric(genericValue); await assertIsGenericArray(genericArrayIn); let boolReturn;

    /* Convenience wrapper */
    let boolRes = false;
    boolRes = await contains(genericArrayIn, genericValue);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function indexOf(genericArrayIn, genericValue) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugCollect('generic Value = ' + genericValue + '; '); await internalDebugStackEnter('indexOf:arrays'); await assertIsGenericArray(genericArrayIn); await assertIsGeneric(genericValue); let intReturn;

    let intCount = 0;
    intCount = await count(genericArrayIn);
    let intCounter = 0;
    intCounter = 0;
    let genericElem;
    while (await implLt(intCounter, intCount)) {
        genericElem = await get(genericArrayIn, intCounter);
        if (await implEq(genericElem, genericValue)) {

            intReturn = intCounter; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
        }
        intCounter = await implAdd(intCounter, 1);
    }

    intReturn = -1; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function arrEmpty(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('arrEmpty:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let boolRes = false;
    boolRes = await implEq(0, await count(genericArrayIn));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function arrNonempty(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('arrNonempty:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let boolRes = false;
    boolRes = await implNot(await arrEmpty(genericArrayIn));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('isArray:arrays'); await assertIsGenericItem(genericItemIn); let boolReturn;

    /* Just a convenience wrapper */
    let boolRes = false;
    boolRes = await isGenericArray(genericItemIn);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function arrEq(genericArrayA, genericArrayB) {
    await internalDebugCollect('genericArray A = ' + genericArrayA + '; '); await internalDebugCollect('genericArray B = ' + genericArrayB + '; '); await internalDebugStackEnter('arrEq:arrays'); await assertIsGenericArray(genericArrayA); await assertIsGenericArray(genericArrayB); let boolReturn;

    let intCount = 0;
    intCount = await count(genericArrayA);
    if (await ne(intCount, await count(genericArrayB))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let genericElem;
    let intI = 0;
    while (await implLt(intI, intCount)) {
        genericElem = await get(genericArrayA, intI);
        if (await ne(genericElem, await get(genericArrayB, intI))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intI = await implAdd(intI, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isIntArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isIntArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isInt(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isStrArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isStrArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isStr(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isBoolArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isBoolArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isBool(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isCharArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isCharArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isChar(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isByteArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isByteArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isByte(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isIntBitArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isIntBitArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isIntBit(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isDcArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('isDcArray:arrays'); await assertIsGenericArray(genericArrayIn); let boolReturn;

    let intCount = 0;
    intCount = await implSub(await count(genericArrayIn), 1);
    let genericElem;
    while (await ge(intCount, 0)) {
        genericElem = await get(genericArrayIn, intCount);
        if (await implNot(await isDc(genericElem))) {

            boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
        }
        intCount = await implSub(intCount, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function sumArray(intArrayIn) {
    await internalDebugCollect('intArray In = ' + intArrayIn + '; '); await internalDebugStackEnter('sumArray:arrays'); await assertIsIntArray(intArrayIn); let intReturn;

    let intCount = 0;
    intCount = await implSub(await count(intArrayIn), 1);
    let intRes = 0;
    while (await ge(intCount, 0)) {
        intRes = await implAdd(intRes, await get(intArrayIn, intCount));
        intCount = await implSub(intCount, 1);
    }

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

/* For now, I'm inclined to skip implementing wasm right now, and just have a stub interface here. It seems well specced and portable, so I think it *can* be at some point. It would be nice if it were already implemented in StageL, but I might have to do that later. */
/* Copies of the current versions as of this writing (latest git commits) of wac, WebAssembly spec, and dependencies are included in work-docs/wasm for easy access, and are covered under their respective licenses. The following repositories are there: */
/* https://github.com/kanaka/wac */
/* https://github.com/kanaka/fooboot */
/* https://github.com/WebAssembly/wabt */
/* https://github.com/WebAssembly/spec */
/* https://github.com/WebAssembly/testsuite */
/* https://github.com/google/googletest */
/* https://github.com/dabeaz/ply */

async function wasmCheckForError(strCaller, genericItemArg) {
    await internalDebugCollect('str Caller = ' + strCaller + '; '); await internalDebugCollect('genericItem Arg = ' + genericItemArg + '; '); await internalDebugStackEnter('wasmCheckForError:wasm'); await assertIsStr(strCaller); await assertIsGenericItem(genericItemArg);

    let strArgStr = '';
    if (await isArray(genericItemArg)) {
        strArgStr = await printArray(genericItemArg);
    }
    else {
        strArgStr = await strFrom(genericItemArg);
    }
    let intErr = 0;
    intErr = await internalWasmCall('checkForError');
    /* await console.log('intErr='+intErr+typeof intErr); */
    /* await console.log('strArgStr='+strArgStr+typeof strArgStr); */
    /* Next line seems to crash with intErr being a null object. Why???? */
    /* await console.log(await ne(intErr, 0)); */
    /* return; */
    await implWarn('WASM error checking does not yet work.');
    /*if ne 0 n/err */
    {
        /*die cat 'WebAssembly call to ' cat s/caller cat ' with the argument ' cat s/argStr ' reported an error.' */
    }

    await internalDebugStackExit();
}

async function wasmCall(strRoutine, intVal) {
    await internalDebugCollect('str Routine = ' + strRoutine + '; '); await internalDebugCollect('int Val = ' + intVal + '; '); await internalDebugStackEnter('wasmCall:wasm'); await assertIsStr(strRoutine); await assertIsInt(intVal); let intReturn;

    let intRes = 0;
    intRes = await internalWasmCall(strRoutine, intVal);
    await wasmCheckForError(strRoutine, intVal);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function wasmCallNoArgs(strRoutine) {
    await internalDebugCollect('str Routine = ' + strRoutine + '; '); await internalDebugStackEnter('wasmCallNoArgs:wasm'); await assertIsStr(strRoutine); let intReturn;

    /* Only returns an int */
    let intRes = 0;
    intRes = await internalWasmCallNoArgs(strRoutine);
    await wasmCheckForError(strRoutine);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function wasmCallArrIn(strRoutine, intArrayVals) {
    await internalDebugCollect('str Routine = ' + strRoutine + '; '); await internalDebugCollect('intArray Vals = ' + intArrayVals + '; '); await internalDebugStackEnter('wasmCallArrIn:wasm'); await assertIsStr(strRoutine); await assertIsIntArray(intArrayVals); let intReturn;

    let intRes = 0;
    intRes = await internalWasmCallArrIn(strRoutine, intArrayVals);
    await wasmCheckForError(strRoutine, intArrayVals);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function wasmCallArrOut(strRoutine, intVal) {
    await internalDebugCollect('str Routine = ' + strRoutine + '; '); await internalDebugCollect('int Val = ' + intVal + '; '); await internalDebugStackEnter('wasmCallArrOut:wasm'); await assertIsStr(strRoutine); await assertIsInt(intVal); let intArrayReturn;

    let intArrayRes = [];
    intRes = await internalWasmCallArrOut(strRoutine, intVal);
    await wasmCheckForError(strRoutine, intVal);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function wasmCallArrInOut(strRoutine, intArrayVals) {
    await internalDebugCollect('str Routine = ' + strRoutine + '; '); await internalDebugCollect('intArray Vals = ' + intArrayVals + '; '); await internalDebugStackEnter('wasmCallArrInOut:wasm'); await assertIsStr(strRoutine); await assertIsIntArray(intArrayVals); let intArrayReturn;

    let intArrayRes = [];
    intRes = await internalWasmCallArrInOut(strRoutine, intArrayVals);
    await wasmCheckForError(strRoutine, intArrayVals);

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function or(boolA, boolB) {
    await internalDebugCollect('bool A = ' + boolA + '; '); await internalDebugCollect('bool B = ' + boolB + '; '); await internalDebugStackEnter('or:booleans'); await assertIsBool(boolA); await assertIsBool(boolB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(boolA);
    boolTemp = await implNot(await implAnd(boolTemp, await implNot(boolB)));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function nor(boolA, boolB) {
    await internalDebugCollect('bool A = ' + boolA + '; '); await internalDebugCollect('bool B = ' + boolB + '; '); await internalDebugStackEnter('nor:booleans'); await assertIsBool(boolA); await assertIsBool(boolB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await or(boolA, boolB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function nand(boolA, boolB) {
    await internalDebugCollect('bool A = ' + boolA + '; '); await internalDebugCollect('bool B = ' + boolB + '; '); await internalDebugStackEnter('nand:booleans'); await assertIsBool(boolA); await assertIsBool(boolB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await implAnd(boolA, boolB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function xor(boolA, boolB) {
    await internalDebugCollect('bool A = ' + boolA + '; '); await internalDebugCollect('bool B = ' + boolB + '; '); await internalDebugStackEnter('xor:booleans'); await assertIsBool(boolA); await assertIsBool(boolB); let boolReturn;

    let boolTemp = false;
    boolTemp = await nand(boolA, boolB);
    boolTemp = await implAnd(boolTemp, await or(boolA, boolB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function xnor(boolA, boolB) {
    await internalDebugCollect('bool A = ' + boolA + '; '); await internalDebugCollect('bool B = ' + boolB + '; '); await internalDebugStackEnter('xnor:booleans'); await assertIsBool(boolA); await assertIsBool(boolB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await xor(boolA, boolB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isTrue(boolIn) {
    await internalDebugCollect('bool In = ' + boolIn + '; '); await internalDebugStackEnter('isTrue:booleans'); await assertIsBool(boolIn); let boolReturn;


    boolReturn = boolIn; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isFalse(boolIn) {
    await internalDebugCollect('bool In = ' + boolIn + '; '); await internalDebugStackEnter('isFalse:booleans'); await assertIsBool(boolIn); let boolReturn;

    let boolRes = false;
    boolRes = await implNot(boolIn);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

/* Calling a comparison with different types is an error. All types must be same type. */

async function ne(genericA, genericB) {
    await internalDebugCollect('generic A = ' + genericA + '; '); await internalDebugCollect('generic B = ' + genericB + '; '); await internalDebugStackEnter('ne:comparison'); await assertIsGeneric(genericA); await assertIsGeneric(genericB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await implEq(genericA, genericB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function ge(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('ge:comparison'); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implEq(intA, intB);
    boolTemp = await or(boolTemp, await implGt(intA, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function le(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('le:comparison'); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implEq(intA, intB);
    boolTemp = await or(boolTemp, await implLt(intA, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function ngt(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('ngt:comparison'); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await implGt(intA, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function nlt(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('nlt:comparison'); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await implLt(intA, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function nge(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('nge:comparison'); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await ge(intA, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function nle(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('nle:comparison'); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await le(intA, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function warnOrDie(boolStrict, strMsg) {
    await internalDebugCollect('bool Strict = ' + boolStrict + '; '); await internalDebugCollect('str Msg = ' + strMsg + '; '); await internalDebugStackEnter('warnOrDie:assertions'); await assertIsBool(boolStrict); await assertIsStr(strMsg);

    if (boolStrict) {
        await implDie(strMsg);
    }
    await implWarn(strMsg);

    await internalDebugStackExit();
}

async function assertIsTrue(boolIn) {
    await internalDebugCollect('bool In = ' + boolIn + '; '); await internalDebugStackEnter('assertIsTrue:assertions'); await assertIsBool(boolIn);

    if (await isFalse(boolIn)) {
        await assertionFailed(await implCat(await bool(' is not true.')));
    }

    await internalDebugStackExit();
}

async function assertIsFalse(boolIn) {
    await internalDebugCollect('bool In = ' + boolIn + '; '); await internalDebugStackEnter('assertIsFalse:assertions'); await assertIsBool(boolIn);

    if (await isTrue(boolIn)) {
        await assertionFailed(await implCat(await bool(' is true, but should be false.')));
    }

    await internalDebugStackExit();
}

async function assertContains(genericArrayIn, genericValue) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugCollect('generic Value = ' + genericValue + '; '); await internalDebugStackEnter('assertContains:assertions'); await assertIsGenericArray(genericArrayIn); await assertIsGeneric(genericValue);

    await assertIsTrue(await contains(genericArrayIn, genericValue));

    await internalDebugStackExit();
}

async function assertIsByte(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('assertIsByte:assertions'); await assertIsInt(intIn);

    await assertIsTrue(await isByte(intIn));

    await internalDebugStackExit();
}

async function assertIsChar(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('assertIsChar:assertions'); await assertIsGeneric(genericIn);

    await assertIsTrue(await isChar(genericIn));

    await internalDebugStackExit();
}

async function assertIsCharByte(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('assertIsCharByte:assertions'); await assertIsInt(intIn);

    await assertIsTrue(await isCharByte(intIn));

    await internalDebugStackExit();
}

async function assertIsDc(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('assertIsDc:assertions'); await assertIsGeneric(genericIn);

    await assertIsTrue(await isDc(genericIn));

    await internalDebugStackExit();
}

async function assertStrContainsOnlyInt(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('assertStrContainsOnlyInt:assertions'); await assertIsStr(strIn);

    if (await implNot(await strContainsOnlyInt(strIn))) {
        await assertionFailed(await implCat(strIn, ' does not only contain an integer.'));
    }

    await internalDebugStackExit();
}

async function assertIsNonnegative(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('assertIsNonnegative:assertions'); await assertIsInt(intIn);

    if (await implNot(await isNonnegative(intIn))) {
        let strTemp = '';
        strTemp = await strFrom(intIn);
        await assertionFailed(await implCat(strTemp, ' is negative.'));
    }

    await internalDebugStackExit();
}

async function assertIsSupportedBase(intB) {
    await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('assertIsSupportedBase:assertions'); await assertIsInt(intB);

    await assertIsTrue(await isSupportedBase(intB));

    await internalDebugStackExit();
}

async function assertIsBaseDigit(strIn, intB) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('assertIsBaseDigit:assertions'); await assertIsStr(strIn); await assertIsInt(intB);

    await assertIsTrue(await isBaseDigit(strIn, intB));

    await internalDebugStackExit();
}

async function assertIsBaseStr(strIn, intB) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('assertIsBaseStr:assertions'); await assertIsStr(strIn); await assertIsInt(intB);

    await assertIsTrue(await isBaseStr(strIn, intB));

    await internalDebugStackExit();
}

async function assertIsArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsIntArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsIntArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isIntArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsBoolArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsBoolArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isBoolArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsStrArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsStrArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isStrArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsCharArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsCharArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isCharArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsIntBitArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsIntBitArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isIntBitArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsByteArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsByteArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isByteArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsDcArray(genericItemIn) {
    await internalDebugCollect('genericItem In = ' + genericItemIn + '; '); await internalDebugStackEnter('assertIsDcArray:assertions'); await assertIsGenericItem(genericItemIn);

    await assertIsTrue(await isDcArray(genericItemIn));

    await internalDebugStackExit();
}

async function assertIsDcDataset(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('assertIsDcDataset:assertions'); await assertIsStr(strIn);

    await assertIsTrue(await isDcDataset(strIn));

    await internalDebugStackExit();
}

async function assertIsFormat(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('assertIsFormat:assertions'); await assertIsStr(strIn);

    await assertIsTrue(await isFormat(strIn));

    await internalDebugStackExit();
}

async function assertIsSupportedInputFormat(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('assertIsSupportedInputFormat:assertions'); await assertIsStr(strIn);

    if (await implNot(await isSupportedInputFormat(strIn))) {
        await implDie(await implCat(strIn, ' is not a supported input format.'));
    }
    await assertIsTrue(await isSupportedInputFormat(strIn));

    await internalDebugStackExit();
}

async function assertIsSupportedOutputFormat(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('assertIsSupportedOutputFormat:assertions'); await assertIsStr(strIn);

    if (await implNot(await isSupportedOutputFormat(strIn))) {
        await implDie(await implCat(strIn, ' is not a supported output format.'));
    }
    await assertIsTrue(await isSupportedOutputFormat(strIn));

    await internalDebugStackExit();
}

async function assertIsSupportedEnvironmentCharEncoding(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('assertIsSupportedEnvironmentCharEncoding:assertions'); await assertIsStr(strIn);

    if (await implNot(await isSupportedEnvironmentCharEncoding(strIn))) {
        await implDie(await implCat(strIn, ' is not a supported environment character encoding.'));
    }
    await assertIsTrue(await isSupportedEnvironmentCharEncoding(strIn));

    await internalDebugStackExit();
}

async function assertIsExecId(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('assertIsExecId:assertions'); await assertIsInt(intIn);

    await assertIsTrue(await isExecId(intIn));

    await internalDebugStackExit();
}

async function strPrintArr(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('strPrintArr:type-conversion'); await assertIsGenericArray(genericArrayIn); let strReturn;

    /* The reverse of this for an/ input is intArrFromStrPrintedArr. */
    /* Hint: running this on a DcArray produces a sems document that can be turned back into a DcArray with dcarrParseSems strToByteArray s/str :) */
    let strOut = '';
    strOut = await strJoin(genericArrayIn, ' ');

    strReturn = strOut; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function printArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('printArray:type-conversion'); await assertIsGenericArray(genericArrayIn); let strReturn;

    /* Just a convenience wrapper */
    let strRes = '';
    strRes = await strPrintArr(genericArrayIn);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strPrintArray(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('strPrintArray:type-conversion'); await assertIsGenericArray(genericArrayIn); let strReturn;

    /* Just a convenience wrapper */
    let strRes = '';
    strRes = await strPrintArr(genericArrayIn);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function printArr(genericArrayIn) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugStackEnter('printArr:type-conversion'); await assertIsGenericArray(genericArrayIn); let strReturn;

    /* Just a convenience wrapper */
    let strRes = '';
    strRes = await strPrintArr(genericArrayIn);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strSplit(strIn, strSeparator) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strSplit:type-conversion'); await assertIsStr(strIn); await assertIsStr(strSeparator); let strArrayReturn;

    let strArrayRes = [];
    let intSeparLen = 0;
    intSeparLen = await len(strSeparator);
    let strRemaining = '';
    strRemaining = strIn;
    let intRemainingLen = 0;
    intRemainingLen = await len(strRemaining);
    let strCurrentElem = '';
    let strCurrentChar = '';
    while (await implLt(0, intRemainingLen)) {
        if (await implEq(strSeparator, await substr(strRemaining, 0, intSeparLen))) {
            strArrayRes = await push(strArrayRes, strCurrentElem);
            strCurrentElem = '';
            strRemaining = await substr(strRemaining, intSeparLen, -1);
        }
        else {
            strCurrentChar = await strChar(strRemaining, 0);
            strCurrentElem = await implCat(strCurrentElem, strCurrentChar);
            if (await implLt(1, intRemainingLen)) {
                strRemaining = await substr(strRemaining, 1, -1);
            }
            else {
                strRemaining = '';
            }
        }
        intRemainingLen = await len(strRemaining);
    }
    strArrayRes = await push(strArrayRes, strCurrentElem);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function strJoin(genericArrayIn, strSeparator) {
    await internalDebugCollect('genericArray In = ' + genericArrayIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strJoin:type-conversion'); await assertIsGenericArray(genericArrayIn); await assertIsStr(strSeparator); let strReturn;

    /* Opposite of strSplit for a given separator */
    let intCount = 0;
    intCount = await count(genericArrayIn);
    let intI = 0;
    intI = 0;
    let strOut = '';
    while (await implLt(intI, intCount)) {
        strOut = await implCat(strOut, await strFrom(await get(genericArrayIn, intI)));
        if (await ne(intI, await implAdd(-1, intCount))) {
            strOut = await implCat(strOut, strSeparator);
        }
        intI = await implAdd(intI, 1);
    }

    strReturn = strOut; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strSplitEscaped(strIn, strSeparator) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strSplitEscaped:type-conversion'); await assertIsStr(strIn); await assertIsStr(strSeparator); let strArrayReturn;

    let strArrayRes = [];
    let strArrayExploded = [];
    strArrayExploded = await strSplit(strIn, strSeparator);
    strArrayRes = [  ];
    let intK = 0;
    let intL = 0;
    intK = 0;
    intL = await count(strArrayExploded);
    let boolContinue = false;
    boolContinue = true;
    let strTemp = '';
    let strArrayTempSubset = [];
    while (await implAnd(boolContinue, await implLt(intK, intL))) {
        if (await implEq('\\\\', await charAt(await get(strArrayExploded, intK), await implAdd(-1, await len(await get(strArrayExploded, intK)))))) {
            if (await ge(await implAdd(1, intK), intL)) {
                strArrayRes = await push(strArrayRes, await get(strArrayExploded, intK));
                boolContinue = false;
            }
            strTemp = await setCharAt(await get(strArrayExploded, intK), await dec(await len(await get(strArrayExploded, intK), ), ), strSeparator);
            await setElem(strArrayExploded, intK, strTemp);
            /*array_splice($exploded, $k + 1, 1); // https://www.php.net/manual/en/function.array-splice.php */
            strArrayTempSubset = await subset(strArrayExploded, await implAdd(1, intK), await implAdd(2, intK));
            strArrayExploded = await append(strArrayTempSubset, await subset(strArrayExploded, await implAdd(2, intK), -1));
            intL = await dec(intL);
            intK = await dec(intK);
        }
        else {
            strArrayRes = await push(strArrayRes, await get(strArrayExploded, intK));
        }
        intK = await implAdd(1, intK);
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
    /* Based on the explode_esc PHP function: */
    /*//explode_escaped (not written by me) */
    /*function explode_esc($delimiter, $string) */
    /*{ */
    /*    $exploded = explode($delimiter, $string); */
    /*    $fixed    = array(); */
    /*    for ($k = 0, $l = count($exploded); $k < $l; ++$k) { */
    /*        if ($exploded[$k][strlen($exploded[$k]) - 1] == '\\') { */
    /*            if ($k + 1 >= $l) { */
    /*                $fixed[] = trim($exploded[$k]); */
    /*                break; */
    /*            } */
    /*            $exploded[$k][strlen($exploded[$k]) - 1] = $delimiter; */
    /*            $exploded[$k] .= $exploded[$k + 1]; */
    /*            array_splice($exploded, $k + 1, 1); */
    /*            --$l; */
    /*            --$k; */
    /*        } else */
    /*            $fixed[] = trim($exploded[$k]); */
    /*    } */
    /*    return $fixed; */
    /*} */
}

async function strSplitEsc(strIn, strSeparator) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strSplitEsc:type-conversion'); await assertIsStr(strIn); await assertIsStr(strSeparator); let strArrayReturn;

    /* Convenience wrapper */
    let strArrayRes = [];
    strArrayRes = await strSplitEscaped(strIn, strSeparator);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function explodeEsc(strIn, strSeparator) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('explodeEsc:type-conversion'); await assertIsStr(strIn); await assertIsStr(strSeparator); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await strSplitEscaped(strIn, strSeparator);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function explodeEscaped(strIn, strSeparator) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('explodeEscaped:type-conversion'); await assertIsStr(strIn); await assertIsStr(strSeparator); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = await strSplitEscaped(strIn, strSeparator);

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function strJoinEscaped(strArrayIn, strSeparator) {
    await internalDebugCollect('strArray In = ' + strArrayIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strJoinEscaped:type-conversion'); await assertIsStrArray(strArrayIn); await assertIsStr(strSeparator); let strReturn;

    let strRes = '';
    let intC = 0;
    let intL = 0;
    intC = 0;
    intL = await count(strArrayIn);
    while (await implLt(intC, intL)) {
        strRes = await implCat(strRes, await implCat(await strReplace(await get(strArrayIn, intC), strSeparator, await implCat('\\', strSeparator), ), strSeparator));
        intC = await inc(intC);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strJoinEsc(strArrayIn, strSeparator) {
    await internalDebugCollect('strArray In = ' + strArrayIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strJoinEsc:type-conversion'); await assertIsStrArray(strArrayIn); await assertIsStr(strSeparator); let strReturn;

    /* Convenience wrapper */
    let strRes = '';
    strRes = await strJoinEscaped(strArrayIn, strSeparator);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strJoinEscNoTrailing(strArrayIn, strSeparator) {
    await internalDebugCollect('strArray In = ' + strArrayIn + '; '); await internalDebugCollect('str Separator = ' + strSeparator + '; '); await internalDebugStackEnter('strJoinEscNoTrailing:type-conversion'); await assertIsStrArray(strArrayIn); await assertIsStr(strSeparator); let strReturn;

    /* a,b instead of a,b, */
    let strRes = '';
    let intSeparLen = 0;
    intSeparLen = await len(strSeparator);
    intSeparLen = await implSub(-1, intSeparLen);
    strRes = await substr(await strJoinEscaped(strArrayIn, strSeparator), 0, intSeparLen);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function intArrFromStrPrintedArr(strInput) {
    await internalDebugCollect('str Input = ' + strInput + '; '); await internalDebugStackEnter('intArrFromStrPrintedArr:type-conversion'); await assertIsStr(strInput); let intArrayReturn;

    /* Reverse of strPrintArr with an an/ parameter. */
    let intArrayRes = [];
    let intArrayContent = [];
    intArrayContent = await strToByteArray(strInput);
    let strCurrentInt = '';
    strCurrentInt = '';
    let intContentLength = 0;
    intContentLength = await count(intArrayContent);
    let intByteOffset = 0;
    let intCurrentByte = 0;
    while (await implLt(intByteOffset, intContentLength)) {
        /* do something with each byte in the array. an/content[n/byteOffset] holds the decimal value of the given byte. These are ints represented as ASCII text bytes, rather than an array of ints. */
        intCurrentByte = await get(intArrayContent, intByteOffset);
        if (await asciiIsDigit(intCurrentByte)) {
            strCurrentInt = await implCat(strCurrentInt, await charFromByte(intCurrentByte));
        }
        else if (await asciiIsSpace(intCurrentByte)) {
            intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentInt));
            strCurrentInt = '';
        }
        else {
            await implDie('Unexpected parser state in intArrFromStrPrintedArr.');
        }
        intByteOffset = await implAdd(intByteOffset, 1);
    }
    if (await ne(0, await len(strCurrentInt))) {
        /* Ended without a trailing space */
        intArrayRes = await push(intArrayRes, await intFromIntStr(strCurrentInt));
    }

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function positiveIntFromIntStr(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('positiveIntFromIntStr:type-conversion'); await assertIsStr(strIn); let intReturn;

    /* Returns a negative value for an empty input string */
    let intRes = 0;
    if (await implEq(0, await len(strIn))) {
        intRes = -1;
    }
    else {
        intRes = await intFromIntStr(strIn);
    }

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function posIntFromIntStr(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('posIntFromIntStr:type-conversion'); await assertIsStr(strIn); let intReturn;

    /* Convenience wrapper */
    let intRes = 0;
    intRes = await positiveFromIntStr(strIn);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function charFromHexByte(strHexByte) {
    await internalDebugCollect('str HexByte = ' + strHexByte + '; '); await internalDebugStackEnter('charFromHexByte:type-conversion'); await assertIsStr(strHexByte); let strReturn;

    /* Bear in mind that StageL doesn't attempt to support Unicode. */
    await assertIsBaseStr(strHexByte, 16);
    let strRes = '';
    strRes = await charFromByte(await intFromBaseStr(strHexByte, 16));

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strToByteArray(strInput) {
    await internalDebugCollect('str Input = ' + strInput + '; '); await internalDebugStackEnter('strToByteArray:type-conversion'); await assertIsStr(strInput); let intArrayReturn;

    let intCount = 0;
    intCount = await len(strInput);
    let intI = 0;
    intI = 0;
    let intArrayOut = [];
    while (await implLt(intI, intCount)) {
        intArrayOut = await push(intArrayOut, await byteFromChar(await strChar(strInput, intI)));
        intI = await implAdd(intI, 1);
    }

    intArrayReturn = intArrayOut; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function strFromByteArray(intArrayInput) {
    await internalDebugCollect('intArray Input = ' + intArrayInput + '; '); await internalDebugStackEnter('strFromByteArray:type-conversion'); await assertIsIntArray(intArrayInput); let strReturn;

    /* Remember this will break if there are non-string bytes in it. */
    let intCount = 0;
    intCount = await count(intArrayInput);
    let intI = 0;
    intI = 0;
    let strOut = '';
    while (await implLt(intI, intCount)) {
        strOut = await implCat(strOut, await charFromByte(await get(intArrayInput, intI)));
        intI = await implAdd(intI, 1);
    }

    strReturn = strOut; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function runTestsWasm(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsWasm:wasm-tests'); await assertIsBool(boolV);

    await testing(boolV, 'wasm');
    await runTest(boolV, await implEq(42, await wasmCall('fortytwo', 0)));
    /*runTest b/v eq 4 wasmCallArrIn 'add' ( 2 2 ) */

    await internalDebugStackExit();
}

/* Can check for exception as result like: if eq s/res dcDataNoResultException */

async function dcDataNoResultException() {
    await internalDebugStackEnter('dcDataNoResultException:exceptions'); let strReturn;


    strReturn = '89315802-d53d-4d11-ba5d-bf505e8ed454'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function byteArrayFromBasenbUtf8InvalidInputException() {
    await internalDebugStackEnter('byteArrayFromBasenbUtf8InvalidInputException:exceptions'); let strReturn;

    /* It doesn't look like a normal UUID since it's an an/ function, so call strPrintArray on it to get the value as a string that can be compared using excep. (just use excepArr instead, which does this for you) */

    strReturn = '51 98 218 163 23 5 64 236 154 151 89 208 82 253 64 55 '; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function excep(strTest) {
    await internalDebugCollect('str Test = ' + strTest + '; '); await internalDebugStackEnter('excep:exceptions'); await assertIsStr(strTest); let boolReturn;

    let boolRes = false;
    boolRes = false;
    /* Test for each exception type in turn */
    boolRes = await or(boolRes, await implEq(strTest, await dcDataNoResultException()));
    boolRes = await or(boolRes, await implEq(strTest, await byteArrayFromBasenbUtf8InvalidInputException()));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function notExcep(strTest) {
    await internalDebugCollect('str Test = ' + strTest + '; '); await internalDebugStackEnter('notExcep:exceptions'); await assertIsStr(strTest); let boolReturn;

    let boolRes = false;
    boolRes = await implNot(await excep(strTest));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function excepArr(genericArrayTest) {
    await internalDebugCollect('genericArray Test = ' + genericArrayTest + '; '); await internalDebugStackEnter('excepArr:exceptions'); await assertIsGenericArray(genericArrayTest); let boolReturn;

    let boolRes = false;
    boolRes = await excep(await strPrintArray(genericArrayTest));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function notExcepArr(genericArrayTest) {
    await internalDebugCollect('genericArray Test = ' + genericArrayTest + '; '); await internalDebugStackEnter('notExcepArr:exceptions'); await assertIsGenericArray(genericArrayTest); let boolReturn;

    let boolRes = false;
    boolRes = await implNot(await excepArr(genericArrayTest));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function excOrEmpty(strTest) {
    await internalDebugCollect('str Test = ' + strTest + '; '); await internalDebugStackEnter('excOrEmpty:exceptions'); await assertIsStr(strTest); let boolReturn;

    let boolRes = false;
    boolRes = await or(await excep(strTest), await strEmpty(strTest));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function notExcOrEmpty(strTest) {
    await internalDebugCollect('str Test = ' + strTest + '; '); await internalDebugStackEnter('notExcOrEmpty:exceptions'); await assertIsStr(strTest); let boolReturn;

    let boolRes = false;
    boolRes = await implNot(await excOrEmpty(strTest));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function kvHasValue(strArrayData, strKey) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('kvHasValue:key-value'); await assertIsStrArray(strArrayData); await assertIsStr(strKey); let boolReturn;

    await assertIsKvArray(strArrayData);
    let boolRes = false;
    boolRes = false;
    let intL = 0;
    intL = await count(strArrayData);
    if (await ne(0, intL)) {
        let intC = 0;
        intC = 0;
        let boolContinue = false;
        boolContinue = true;
        while (boolContinue) {
            if (await implNot(await implLt(intC, intL))) {
                boolContinue = false;
            }
            if (await implEq(0, await implMod(intC, 2))) {
                if (await implEq(strKey, await get(strArrayData, intC))) {
                    boolRes = true;
                    boolContinue = false;
                }
            }
            intC = await implAdd(intC, 1);
        }
    }

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function kvGetValue(strArrayData, strKey) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('kvGetValue:key-value'); await assertIsStrArray(strArrayData); await assertIsStr(strKey); let strReturn;

    /* data format: [ 'a' 'b' 'c' 'd' ... ] */
    /* Returns empty if value not set */
    await assertIsKvArray(strArrayData);
    let strRes = '';
    strRes = '';
    let intL = 0;
    intL = await count(strArrayData);
    if (await ne(0, intL)) {
        let intC = 0;
        intC = 0;
        let boolContinue = false;
        boolContinue = true;
        let boolFound = false;
        boolFound = false;
        while (boolContinue) {
            if (boolFound) {
                strRes = await get(strArrayData, intC);
                boolContinue = false;
            }
            else {
                if (await implNot(await implLt(intC, await implAdd(-1, intL)))) {
                    boolContinue = false;
                }
                if (await implEq(0, await implMod(intC, 2))) {
                    if (await implEq(strKey, await get(strArrayData, intC))) {
                        boolFound = true;
                    }
                }
            }
            intC = await implAdd(intC, 1);
        }
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function kvGetDefinedValue(strArrayData, strKey) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('kvGetDefinedValue:key-value'); await assertIsStrArray(strArrayData); await assertIsStr(strKey); let strReturn;

    await assertKvHasValue(strArrayData);
    let strRes = '';
    strRes = await kvGetValue(strArrayData, strKey);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function kvSetValue(strArrayData, strKey, strVal) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Val = ' + strVal + '; '); await internalDebugStackEnter('kvSetValue:key-value'); await assertIsStrArray(strArrayData); await assertIsStr(strKey); await assertIsStr(strVal); let strArrayReturn;

    await assertIsKvArray(strArrayData);
    let strArrayRes = [];
    strArrayRes = strArrayData;
    let intL = 0;
    intL = await count(strArrayRes);
    let boolFound = false;
    boolFound = false;
    if (await ne(0, intL)) {
        let intC = 0;
        intC = 0;
        let boolContinue = false;
        boolContinue = true;
        while (boolContinue) {
            if (boolFound) {
                strArrayRes = await setElem(strArrayRes, intC, strVal);
                boolContinue = false;
            }
            else {
                if (await implNot(await implLt(intC, await dec(intL)))) {
                    boolContinue = false;
                }
                if (await implEq(0, await implMod(intC, 2))) {
                    if (await implEq(strKey, await get(strArrayData, intC))) {
                        boolFound = true;
                    }
                }
            }
            intC = await implAdd(intC, 1);
        }
    }
    if (await implNot(boolFound)) {
        strArrayRes = await push(strArrayRes, strKey);
        strArrayRes = await push(strArrayRes, strVal);
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function kvsHasValue(strData, strKey) {
    await internalDebugCollect('str Data = ' + strData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('kvsHasValue:key-value'); await assertIsStr(strData); await assertIsStr(strKey); let boolReturn;

    let boolRes = false;
    boolRes = await kvHasValue(await kvSplit(strData), strKey);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function kvsGetValue(strData, strKey) {
    await internalDebugCollect('str Data = ' + strData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('kvsGetValue:key-value'); await assertIsStr(strData); await assertIsStr(strKey); let strReturn;

    /* data format: [ 'a:b,c:d,' ... ] */
    /* Returns empty if value not set */
    let strRes = '';
    strRes = await kvGetValue(await kvSplit(strData), strKey);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function kvsGetDefinedValue(strData, strKey) {
    await internalDebugCollect('str Data = ' + strData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('kvsGetDefinedValue:key-value'); await assertIsStr(strData); await assertIsStr(strKey); let strReturn;

    await assertKvsHasValue(strData);
    let strRes = '';
    strRes = await kvsGetValue(strData, strKey);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function kvsSetValue(strData, strKey, strVal) {
    await internalDebugCollect('str Data = ' + strData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugCollect('str Val = ' + strVal + '; '); await internalDebugStackEnter('kvsSetValue:key-value'); await assertIsStr(strData); await assertIsStr(strKey); await assertIsStr(strVal); let strReturn;

    let strRes = '';
    strRes = await kvJoin(await kvSetValue(await kvSplit(strData), strKey, strVal));

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function assertKvHasValue(strArrayData, strKey) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('assertKvHasValue:key-value'); await assertIsStrArray(strArrayData); await assertIsStr(strKey);

    await assertIsTrue(await kvHasValue(strArrayData, strKey));

    await internalDebugStackExit();
}

async function assertKvsHasValue(strArrayData, strKey) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugCollect('str Key = ' + strKey + '; '); await internalDebugStackEnter('assertKvsHasValue:key-value'); await assertIsStrArray(strArrayData); await assertIsStr(strKey);

    await assertIsTrue(await kvsHasValue(strArrayData, strKey));

    await internalDebugStackExit();
}

async function kvSplit(strData) {
    await internalDebugCollect('str Data = ' + strData + '; '); await internalDebugStackEnter('kvSplit:key-value'); await assertIsStr(strData); let strArrayReturn;

    let strArrayRes = [];
    strArrayRes = [  ];
    let strArrayTemp = [];
    strArrayTemp = await strSplitEscaped(strData, ',');
    let intL = 0;
    intL = await count(strArrayTemp);
    if (await ne(0, intL)) {
        let intC = 0;
        intC = 0;
        while (await implLt(intC, intL)) {
            strArrayRes = await append(strArrayRes, await strSplitEscaped(await get(strArrayTemp, intC), ':'));
            intC = await inc(intC);
        }
    }

    strArrayReturn = strArrayRes; await assertIsStrArray(strArrayReturn); await internalDebugStackExit(); return strArrayReturn;
}

async function kvJoin(strArrayData) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugStackEnter('kvJoin:key-value'); await assertIsStrArray(strArrayData); let strReturn;

    let strRes = '';
    strRes = '';
    let intL = 0;
    intL = await count(strArrayData);
    if (await ne(0, intL)) {
        let intC = 0;
        intC = 0;
        let strArrayTempA = [];
        let strArrayTempB = [];
        strArrayTempB = [  ];
        while (await implLt(intC, intL)) {
            if (await implEq(0, await implMod(intC, 2))) {
                strArrayTempA = [  ];
                strArrayTempA = await push(strArrayTempA, await get(strArrayData, intC));
                strArrayTempA = await push(strArrayTempA, await get(strArrayData, await implAdd(1, intC)));
                strArrayTempB = await push(strArrayTempB, await strJoinEscNoTrailing(strArrayTempA, ':'));
            }
            intC = await inc(intC);
        }
        strRes = await strJoinEsc(strArrayTempB, ',');
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function isKvArray(strArrayData) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugStackEnter('isKvArray:key-value'); await assertIsStrArray(strArrayData); let boolReturn;

    let boolRes = false;
    boolRes = await isEven(await count(strArrayData));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function assertIsKvArray(strArrayData) {
    await internalDebugCollect('strArray Data = ' + strArrayData + '; '); await internalDebugStackEnter('assertIsKvArray:key-value'); await assertIsStrArray(strArrayData);

    await assertIsTrue(await isKvArray(strArrayData));

    await internalDebugStackExit();
}

async function strChar(strStr, intIndex) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugStackEnter('strChar:strings'); await assertIsStr(strStr); await assertIsInt(intIndex); let strReturn;

    let strTemp = '';
    strTemp = await substring(strStr, intIndex, 1);

    strReturn = strTemp; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strCharAtPos(strStr, intIndex) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugStackEnter('strCharAtPos:strings'); await assertIsStr(strStr); await assertIsInt(intIndex); let strReturn;

    /* helper alias */
    let strTemp = '';
    strTemp = await strChar(strStr, intIndex);

    strReturn = strTemp; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function charAtPos(strStr, intIndex) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugStackEnter('charAtPos:strings'); await assertIsStr(strStr); await assertIsInt(intIndex); let strReturn;

    /* helper alias */
    let strTemp = '';
    strTemp = await strChar(strStr, intIndex);

    strReturn = strTemp; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function charAt(strStr, intIndex) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugStackEnter('charAt:strings'); await assertIsStr(strStr); await assertIsInt(intIndex); let strReturn;

    /* helper alias */
    let strTemp = '';
    strTemp = await strChar(strStr, intIndex);

    strReturn = strTemp; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function setCharAt(strStr, intIndex, strChar) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugCollect('int Index = ' + intIndex + '; '); await internalDebugCollect('str Char = ' + strChar + '; '); await internalDebugStackEnter('setCharAt:strings'); await assertIsStr(strStr); await assertIsInt(intIndex); await assertIsStr(strChar); let strReturn;

    let strRes = '';
    let intFirstEnd = 0;
    let intLastStart = 0;
    intFirstEnd = await implSub(await len(strStr), await dec(intIndex));
    intLastStart = await implSub(await len(strStr), await inc(intIndex));
    strRes = await implCat(await substr(strStr, 0, intFirstEnd), await implCat(strChar, await substr(strStr, intLastStart, -1)));

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function reverseStr(strStr) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugStackEnter('reverseStr:strings'); await assertIsStr(strStr); let strReturn;

    let intL = 0;
    intL = await len(strStr);
    let intC = 0;
    intC = 0;
    let strRes = '';
    while (await le(intC, intL)) {
        strRes = await implCat(strRes, await strCharAtPos(strStr, await implSub(intL, intC)));
        intC = await implAdd(1, intC);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function charToUpper(strChar) {
    await internalDebugCollect('str Char = ' + strChar + '; '); await internalDebugStackEnter('charToUpper:strings'); await assertIsStr(strChar); let strReturn;

    await assertIsChar(strChar);
    let intTemp = 0;
    intTemp = await byteFromChar(strChar);
    if (await intIsBetween(intTemp, 97, 122)) {
        intTemp = await implSub(intTemp, 32);
    }
    let strRes = '';
    strRes = await charFromByte(intTemp);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strToUpper(strStr) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugStackEnter('strToUpper:strings'); await assertIsStr(strStr); let strReturn;

    let strRes = '';
    let intI = 0;
    intI = 0;
    let intCount = 0;
    intCount = await len(strStr);
    while (await implLt(intI, intCount)) {
        strRes = await implCat(strRes, await charToUpper(await strCharAtPos(strStr, intI)));
        intI = await implAdd(intI, 1);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function charToLower(strChar) {
    await internalDebugCollect('str Char = ' + strChar + '; '); await internalDebugStackEnter('charToLower:strings'); await assertIsStr(strChar); let strReturn;

    await assertIsChar(strChar);
    let intTemp = 0;
    intTemp = await byteFromChar(strChar);
    if (await intIsBetween(intTemp, 65, 90)) {
        intTemp = await implAdd(intTemp, 32);
    }
    let strRes = '';
    strRes = await charFromByte(intTemp);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strToLower(strStr) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugStackEnter('strToLower:strings'); await assertIsStr(strStr); let strReturn;

    let strRes = '';
    let intI = 0;
    intI = 0;
    let intCount = 0;
    intCount = await len(strStr);
    while (await implLt(intI, intCount)) {
        strRes = await implCat(strRes, await charToLower(await strCharAtPos(strStr, intI)));
        intI = await implAdd(intI, 1);
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strEmpty(strStr) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugStackEnter('strEmpty:strings'); await assertIsStr(strStr); let boolReturn;

    let boolRes = false;
    boolRes = await implEq(0, await len(strStr));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function strNonempty(strStr) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugStackEnter('strNonempty:strings'); await assertIsStr(strStr); let boolReturn;

    let boolRes = false;
    boolRes = await implNot(await strEmpty(strStr));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function substr(strStr, intStart, intLen) {
    await internalDebugCollect('str Str = ' + strStr + '; '); await internalDebugCollect('int Start = ' + intStart + '; '); await internalDebugCollect('int Len = ' + intLen + '; '); await internalDebugStackEnter('substr:strings'); await assertIsStr(strStr); await assertIsInt(intStart); await assertIsInt(intLen); let strReturn;

    /* Convenience wrapper */
    let strRes = '';
    strRes = await substring(strStr, intStart, intLen);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function strContainsOnlyInt(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('strContainsOnlyInt:strings'); await assertIsStr(strIn); let boolReturn;

    /* Positive int, specifically. Only digits allowed. */
    let intTemp = 0;
    intTemp = await len(strIn);
    let intI = 0;
    intI = 0;
    let boolRes = false;
    boolRes = true;
    while (await implLt(intI, intTemp)) {
        if (await implNot(await asciiIsDigit(await byteFromChar(await strCharAtPos(strIn, intI))))) {
            boolRes = false;
        }
        intI = await implAdd(intI, 1);
    }

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isValidIdent(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('isValidIdent:strings'); await assertIsStr(strIn); let strReturn;

    /* Doesn't check for duplicate idents or whatever. Just makes sure the basic form is correct. */
    let intTemp = 0;
    intTemp = await len(strIn);
    let intI = 0;
    intI = 0;
    let boolRes = false;
    boolRes = true;
    let intCurrentCharByte = 0;
    while (await implLt(intI, intTemp)) {
        intCurrentCharByte = await byteFromChar(await strCharAtPos(strIn, intI));
        if (await implEq(intI, 0)) {
            /* First character can only be lowercase letter */
            if (await implNot(await asciiIsLetterLower(intCurrentCharByte))) {
                boolRes = false;
            }
        }
        else if (await implNot(await or(await asciiIsDigit(intCurrentCharByte), await asciiIsLetter(intCurrentCharByte)))) {
            boolRes = false;
        }
        intI = await implAdd(intI, 1);
    }

    strReturn = boolRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function prepareStrForEcho(strIn) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugStackEnter('prepareStrForEcho:strings'); await assertIsStr(strIn); let intArrayReturn;

    let intArrayRes = [];
    intArrayRes = await convertFormats('ascii', await getEnvPreferredFormat(), await append(await strToByteArray(strIn), await crlf()));

    intArrayReturn = intArrayRes; await assertIsIntArray(intArrayReturn); await internalDebugStackExit(); return intArrayReturn;
}

async function isByte(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('isByte:type-tools'); await assertIsGeneric(genericIn); let boolReturn;

    if (await implNot(await isInt(genericIn))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intVal = 0;
    intVal = genericIn;
    let boolRes = false;
    boolRes = await intIsBetween(intVal, 0, 255);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isIntBit(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('isIntBit:type-tools'); await assertIsGeneric(genericIn); let boolReturn;

    if (await implNot(await isInt(genericIn))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intVal = 0;
    intVal = genericIn;
    let boolRes = false;
    boolRes = await intIsBetween(intVal, 0, 1);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isChar(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('isChar:type-tools'); await assertIsGeneric(genericIn); let boolReturn;

    if (await implNot(await isStr(genericIn))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let strVal = '';
    strVal = genericIn;
    let boolRes = false;
    boolRes = await isCharByte(await byteFromChar(strVal));

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isCharByte(genericIn) {
    await internalDebugCollect('generic In = ' + genericIn + '; '); await internalDebugStackEnter('isCharByte:type-tools'); await assertIsGeneric(genericIn); let boolReturn;

    /* Bear in mind that StageL doesn't attempt to support Unicode. */
    if (await implNot(await isInt(genericIn))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intVal = 0;
    intVal = genericIn;
    let boolRes = false;
    boolRes = await intIsBetween(intVal, 32, 126);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function runTestsMath(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsMath:math-tests'); await assertIsBool(boolV);

    await testing(boolV, 'math');
    await runTest(boolV, await implEq(4, await implAdd(2, 2)));
    await runTest(boolV, await ne(4, await implAdd(2, 3)));
    await runTest(boolV, await implEq('26BD', await decToHex(9917)));
    await runTest(boolV, await implEq(9917, await hexToDec('26BD')));

    await internalDebugStackExit();
}

async function debugRev(intLevel, strMessage) {
    await internalDebugCollect('int Level = ' + intLevel + '; '); await internalDebugCollect('str Message = ' + strMessage + '; '); await internalDebugStackEnter('debugRev:logging'); await assertIsInt(intLevel); await assertIsStr(strMessage);

    /* Just the debug routine with the arguments reversed to avoid needing to close a bunch of arglists for a dynamically constructed string. */
    await implDebug(strMessage, intLevel);

    await internalDebugStackExit();
}

async function runTestsTypeConversion(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsTypeConversion:type-conversion-tests'); await assertIsBool(boolV);

    await testing(boolV, 'typeConversion');
    await runTest(boolV, await arrEq([ 'a', 'b', 'c' ], await strSplit('a,b,c', ',')));
    await runTest(boolV, await arrEq([ 'a', 'b', 'c' ], await strSplit('aabbabc', 'ab')));
    await runTest(boolV, await arrEq([ 'a', 'b', 'c', '' ], await strSplit('aabbabcab', 'ab')));
    await runTest(boolV, await arrEq([ '', 'c' ], await strSplit('abc', 'ab')));
    await runTest(boolV, await arrEq([ '', '', 'baa' ], await strSplit('ababbaa', 'ab')));
    await runTest(boolV, await arrEq([ 'a', '' ], await strSplit('aab', 'ab')));
    await runTest(boolV, await arrEq([ '', 'a', '' ], await strSplit('abaab', 'ab')));
    await runTest(boolV, await arrEq([ '', 'a', '', '' ], await strSplit('abaabab', 'ab')));
    await runTest(boolV, await arrEq([ '', '', '' ], await strSplit('abab', 'ab')));
    await runTest(boolV, await arrEq([ '', '' ], await strSplit('ab', 'ab')));
    await runTest(boolV, await arrEq([ '', '', '' ], await strSplit(await strJoin(await strSplit('abab', 'ab'), 'ab'), 'ab')));

    await internalDebugStackExit();
}

async function runTestsOnly(boolV) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugStackEnter('runTestsOnly:unit-testing'); await assertIsBool(boolV); let boolReturn;

    /* Run tests without report. b/v=verbose: true=print test result lines; false=return value only */
    /* This runs each component's test suite */
    /* General tests */
    /*runTestsBits b/v */
    await runTestsMath(boolV);
    await runTestsPack32(boolV);
    await runTestsTypeConversion(boolV);
    await runTestsWasm(boolV);
    /* Core tests */
    await runTestsDcData(boolV);
    await runTestsFormatDc(boolV);
    /* Format tests */
    await runTestsFormatAscii(boolV);
    await runTestsFormatAsciiSafeSubset(boolV);
    await runTestsFormatHtml(boolV);
    await runTestsFormatHtmlFragment(boolV);
    await runTestsFormatIntegerList(boolV);
    await runTestsFormatSems(boolV);
    await runTestsFormatUtf8(boolV);
    /* Document exec tests */
    await runTestsDocumentExec(boolV);
    /* Did anything fail? */
    if (await implEq(intFailedTests, 0)) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function testing(boolV, strTestSuite) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugCollect('str TestSuite = ' + strTestSuite + '; '); await internalDebugStackEnter('testing:unit-testing'); await assertIsBool(boolV); await assertIsStr(strTestSuite);

    if (boolV) {
        intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(await implCat('Started running test suite: ', strTestSuite)));
        await renderDrawContents(intArrayTestFrameBuffer);
    }

    await internalDebugStackExit();
}

async function runTest(boolV, boolTestReturn) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugCollect('bool TestReturn = ' + boolTestReturn + '; '); await internalDebugStackEnter('runTest:unit-testing'); await assertIsBool(boolV); await assertIsBool(boolTestReturn); let boolReturn;

    intTotalTests = await implAdd(intTotalTests, 1);
    if (boolTestReturn) {
        if (boolV) {
            intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(await implCat('Test #', await implCat(await strFrom(intTotalTests), ' passed.'))));
        }
        intPassedTests = await implAdd(intPassedTests, 1);
    }
    else {
        if (boolV) {
            intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(await implCat('Test #', await implCat(await strFrom(intTotalTests), ' failed.'))));
        }
        intFailedTests = await implAdd(intFailedTests, 1);
    }
    if (boolV) {
        await renderDrawContents(intArrayTestFrameBuffer);
    }

    boolReturn = boolTestReturn; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function runTestNamed(boolV, strTestName, boolTestReturn) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugCollect('str TestName = ' + strTestName + '; '); await internalDebugCollect('bool TestReturn = ' + boolTestReturn + '; '); await internalDebugStackEnter('runTestNamed:unit-testing'); await assertIsBool(boolV); await assertIsStr(strTestName); await assertIsBool(boolTestReturn); let boolReturn;

    intTotalTests = await implAdd(intTotalTests, 1);
    if (boolTestReturn) {
        if (boolV) {
            intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(await implCat('Test #', await implCat(await strFrom(intTotalTests), await implCat(strTestName, ' passed.')))));
        }
        intPassedTests = await implAdd(intPassedTests, 1);
    }
    else {
        if (boolV) {
            intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(await implCat('Test #', await implCat(await strFrom(intTotalTests), await implCat(strTestName, ' failed.')))));
        }
        intFailedTests = await implAdd(intFailedTests, 1);
    }
    if (boolV) {
        await renderDrawContents(intArrayTestFrameBuffer);
    }

    boolReturn = boolTestReturn; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function clearTestStats() {
    await internalDebugStackEnter('clearTestStats:unit-testing');

    intTotalTests = 0;
    intPassedTests = 0;
    intFailedTests = 0;

    await internalDebugStackExit();
}

async function reportTests() {
    await internalDebugStackEnter('reportTests:unit-testing'); let boolReturn;

    let strPassedWord = '';
    strPassedWord = 'tests';
    if (await implEq(intPassedTests, 1)) {
        strPassedWord = 'test';
    }
    let strFailedWord = '';
    strFailedWord = 'tests';
    if (await implEq(intFailedTests, 1)) {
        strFailedWord = 'test';
    }
    let strTotalWord = '';
    strTotalWord = 'tests';
    if (await implEq(intTotalTests, 1)) {
        strTotalWord = 'test';
    }
    let strPassedPercentage = '';
    strPassedPercentage = await formatPercentage(intPassedTests, intTotalTests);
    let strFailedPercentage = '';
    strFailedPercentage = await formatPercentage(intFailedTests, intTotalTests);
    intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(await implCat(await strFrom(intPassedTests), await implCat(' ', await implCat(strPassedWord, await implCat(' (', await implCat(strPassedPercentage, await implCat('%) passed and ', await implCat(await strFrom(intFailedTests), await implCat(' ', await implCat(strFailedWord, await implCat(' (', await implCat(strFailedPercentage, await implCat('%) failed out of a total of ', await implCat(await strFrom(intTotalTests), await implCat(' ', await implCat(strTotalWord, '.')))))))))))))))));
    let strTemp = '';
    if (await ne(intFailedTests, 0)) {
        strTotalWord = 'Some tests';
        if (await implEq(intTotalTests, 1)) {
            strTotalWord = 'A test';
        }
        strTemp = await implCat(strTotalWord, await implCat(' (', await implCat(strFailedPercentage, await implCat('%: ', await implCat(await strFrom(intFailedTests), await implCat(' out of ', await implCat(await strFrom(intTotalTests), ') failed!')))))));
        intArrayTestFrameBuffer = await append(intArrayTestFrameBuffer, await prepareStrForEcho(strTemp));
        /*error s/temp */
    }
    if (await ne(intPassedTests, await implSub(intTotalTests, intFailedTests))) {
        await implDie('There is a problem in the testing framework.');
    }
    await renderDrawContents(intArrayTestFrameBuffer);
    intArrayTestFrameBuffer = [  ];
    let boolTestReturn = false;
    boolTestReturn = true;
    if (await ne(intFailedTests, 0)) {
        boolTestReturn = false;
        /*die s/temp */
    }

    boolReturn = boolTestReturn; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isNonnegative(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('isNonnegative:math'); await assertIsInt(intIn); let boolReturn;

    if (await implLt(intIn, 0)) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isNegative(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('isNegative:math'); await assertIsInt(intIn); let boolReturn;

    if (await implLt(intIn, 0)) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isPositive(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('isPositive:math'); await assertIsInt(intIn); let boolReturn;

    if (await le(intIn, 0)) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isNonpositive(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('isNonpositive:math'); await assertIsInt(intIn); let boolReturn;

    if (await le(intIn, 0)) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isEven(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('isEven:math'); await assertIsInt(intIn); let boolReturn;

    if (await implEq(0, await implMod(intIn, 2))) {

        boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isOdd(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('isOdd:math'); await assertIsInt(intIn); let boolReturn;

    if (await implEq(0, await implMod(intIn, 2))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function assertIsEven(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('assertIsEven:math'); await assertIsInt(intIn);

    await assertIsTrue(await isEven(intIn));

    await internalDebugStackExit();
}

async function assertIsOdd(intIn) {
    await internalDebugCollect('int In = ' + intIn + '; '); await internalDebugStackEnter('assertIsOdd:math'); await assertIsInt(intIn);

    await assertIsTrue(await isOdd(intIn));

    await internalDebugStackExit();
}

async function intIsBetween(intN, intA, intB) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('intIsBetween:math'); await assertIsInt(intN); await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    /* Checks whether N is within the range A and B, including endpoints */
    /* Can't do it this way since it can use ints intermediately that are outside of 32 bit */
    /*new n/t1 */
    /*set n/t1 sub n/n n/a */
    /*new n/t2 */
    /*set n/t2 sub n/n n/b */
    /*new n/t3 */
    /*set n/t3 mul n/t1 n/t2 */
    /*new b/temp */
    /*set b/temp le n/t3 0 */
    /* So instead implement using gt/lt */
    boolTemp = await implAnd(await ge(intN, intA), await le(intN, intB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function intToBase36Char(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('intToBase36Char:math'); await assertIsInt(intN); let strReturn;

    /* Returns the nth digit in base 36 or less (using capitalized digits). */
    if (await implNot(await intIsBetween(intN, 0, 36))) {
        let strTemp = '';
        strTemp = await strFrom(intN);
        await implDie(await implCat(await strFrom(strTemp, ' is not within the supported range of numbers between 0 and 36 (Z).')));
    }
    let strRes = '';
    if (await le(intN, 9)) {
        strRes = await charFromByte(await implAdd(intN, 48));
    }
    else {
        strRes = await charFromByte(await implAdd(intN, 55));
    }

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function intFromBase36Char(strN) {
    await internalDebugCollect('str N = ' + strN + '; '); await internalDebugStackEnter('intFromBase36Char:math'); await assertIsStr(strN); let intReturn;

    /* Returns an int given the nth digit in base 36 or less (using capitalized digits). */
    await assertIsChar(strN);
    let strUc = '';
    strUc = await strToUpper(strN);
    let intRes = 0;
    intRes = await byteFromChar(strUc);
    if (await ge(intRes, 65)) {
        if (await implGt(intRes, 90)) {
            await implDie(await implCat(strUc, ' is not within the supported range of digits between 0 and Z (36).'));
        }
        intRes = await implSub(intRes, 55);
    }
    else {
        if (await implNot(await intIsBetween(intRes, 48, 57))) {
            await implDie(await implCat(strN, ' is not within the supported range of digits between 0 and Z (36).'));
        }
        intRes = await implSub(intRes, 48);
    }
    if (await implNot(await intIsBetween(intRes, 0, 36))) {
        await implDie(await implCat('Internal error in intFromBase36Char called with n=', await implCat(strN, '.')));
    }

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function intFromBaseStr(strN, intB) {
    await internalDebugCollect('str N = ' + strN + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('intFromBaseStr:math'); await assertIsStr(strN); await assertIsInt(intB); let intReturn;

    /* Returns the integer represented by n in the requested base. Strategy based on https://www.geeksforgeeks.org/convert-base-decimal-vice-versa/ */
    await assertIsBaseStr(strN, intB);
    let strUc = '';
    strUc = await strToUpper(strN);
    let intRes = 0;
    intRes = 0;
    let intLen = 0;
    intLen = await len(strUc);
    let intInt = 0;
    intInt = 0;
    let intPow = 0;
    intPow = 1;
    while (await implGt(intLen, 0)) {
        intLen = await implSub(intLen, 1);
        intInt = await intFromBase36Char(await strCharAtPos(strUc, intLen));
        await assertIsTrue(await implLt(intInt, intB));
        intRes = await implAdd(intRes, await implMul(intInt, intPow));
        intPow = await implMul(intPow, intB);
    }

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function hexToDec(strN) {
    await internalDebugCollect('str N = ' + strN + '; '); await internalDebugStackEnter('hexToDec:math'); await assertIsStr(strN); let intReturn;

    let intRes = 0;
    intRes = await intFromBaseStr(strN, 16);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function decToHex(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('decToHex:math'); await assertIsInt(intN); let strReturn;

    let strRes = '';
    strRes = await intToBaseStr(intN, 16);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function intToBaseStr(intN, intB) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('intToBaseStr:math'); await assertIsInt(intN); await assertIsInt(intB); let strReturn;

    /* Returns a string representing n in the requested base. Strategy based on https://www.geeksforgeeks.org/convert-base-decimal-vice-versa/ */
    let strRes = '';
    if (await implEq(0, intN)) {
        strRes = '0';
    }
    else {
        while (await implGt(intN, 0)) {
            strRes = await implCat(strRes, await intToBase36Char(await implMod(intN, intB)));
            intN = await implDiv(intN, intB);
        }
        strRes = await reverseStr(strRes);
    }
    await assertIsBaseStr(strRes, intB);

    strReturn = strRes; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function isSupportedBase(intB) {
    await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('isSupportedBase:math'); await assertIsInt(intB); let boolReturn;

    /* StageL base conversion routines support base 1 to base 36. */
    let boolRes = false;
    boolRes = await intIsBetween(intB, 1, 36);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isBaseDigit(strIn, intB) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('isBaseDigit:math'); await assertIsStr(strIn); await assertIsInt(intB); let boolReturn;

    await assertIsChar(strIn);
    await assertIsSupportedBase(intB);
    if (await implNot(await asciiIsAlphanum(await byteFromChar(strIn)))) {

        boolReturn = false; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
    }
    let intDigitVal = 0;
    intDigitVal = await intFromBase36Char(strIn);
    let boolRes = false;
    boolRes = await implLt(intDigitVal, intB);

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function isBaseStr(strIn, intB) {
    await internalDebugCollect('str In = ' + strIn + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('isBaseStr:math'); await assertIsStr(strIn); await assertIsInt(intB); let boolReturn;

    let intLen = 0;
    intLen = await len(strIn);
    intLen = await implSub(intLen, 1);
    await assertIsNonnegative(intLen);
    let strChr = '';
    let boolRes = false;
    boolRes = true;
    while (await ge(intLen, 0)) {
        strChr = await strCharAtPos(strIn, intLen);
        boolRes = await implAnd(boolRes, await isBaseDigit(strChr, intB));
        intLen = await implSub(intLen, 1);
    }

    boolReturn = boolRes; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}

async function formatPercentage(intA, intB) {
    await internalDebugCollect('int A = ' + intA + '; '); await internalDebugCollect('int B = ' + intB + '; '); await internalDebugStackEnter('formatPercentage:math'); await assertIsInt(intA); await assertIsInt(intB); let strReturn;

    if (await implEq(0, intA)) {

        strReturn = '0.000'; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
    }
    let intPercentageN = 0;
    intPercentageN = await implMul(100, await implDiv(await implMul(intA, 100000), intB));
    let strPercentageTemp = '';
    strPercentageTemp = await strFrom(intPercentageN);
    let intCount = 0;
    intCount = await implSub(await len(strPercentageTemp), 2);
    let intCounter = 0;
    intCounter = intCount;
    let strPercentage = '';
    let intDecimLoc = 0;
    intDecimLoc = await implSub(intCount, 3);
    while (await implGt(intCounter, 0)) {
        if (await implEq(intCounter, await implSub(intCount, intDecimLoc))) {
            strPercentage = await implCat(strPercentage, '.');
        }
        strPercentage = await implCat(strPercentage, await strChar(strPercentageTemp, await implSub(intCount, intCounter)));
        intCounter = await implSub(intCounter, 1);
    }

    strReturn = strPercentage; await assertIsStr(strReturn); await internalDebugStackExit(); return strReturn;
}

async function inc(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('inc:math'); await assertIsInt(intN); let intReturn;

    let intRes = 0;
    intRes = await implAdd(1, intN);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}

async function dec(intN) {
    await internalDebugCollect('int N = ' + intN + '; '); await internalDebugStackEnter('dec:math'); await assertIsInt(intN); let intReturn;

    let intRes = 0;
    intRes = await implAdd(-1, intN);

    intReturn = intRes; await assertIsInt(intReturn); await internalDebugStackExit(); return intReturn;
}


// @license-end
