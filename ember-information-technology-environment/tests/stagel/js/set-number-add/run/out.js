async function f() {
    await internalDebugStackEnter('f:in');

    let intCounter = 1;
    intCounter = await implAdd(intCounter, 1);
    let strTemp = '';

    await internalDebugStackExit();
}
