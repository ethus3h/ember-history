async function f() {
    await internalDebugStackEnter('f:in'); let strReturn;

    while (!(await condition()) {
        await command();
    }
}
