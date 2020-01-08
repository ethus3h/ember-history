async function ne(genericArrayA, genericItemB) {
    await internalDebugCollect('genericArray A = ' + genericArrayA + '; '); await internalDebugCollect('genericItem B = ' + genericItemB + '; '); await internalDebugStackEnter('ne:in'); await assertIsGenericArray(genericArrayA); await assertIsGenericItem(genericItemB); let boolReturn;

    let boolTemp = false;
    boolTemp = await implNot(await implEq(genericArrayA, genericItemB));

    boolReturn = boolTemp; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
}
