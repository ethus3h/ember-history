async function runTestsWasm(boolV, boolA) {
    await internalDebugCollect('bool V = ' + boolV + '; '); await internalDebugCollect('bool A = ' + boolA + '; '); await internalDebugStackEnter('runTestsWasm:in'); await assertIsBool(boolV); await assertIsBool(boolA);

    await runTest(boolV, await implEq(42, await wasmCall('fortytwo', [ true, false ])));
    await runTest(boolV, await implEq(4, await wasmCallArrIn('add', [ 2, 2 ])));

    await internalDebugStackExit();
}
