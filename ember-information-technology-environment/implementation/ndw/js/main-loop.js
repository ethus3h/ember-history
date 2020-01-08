// This file contains the implementation of the main loop of the JavaScript implementation of the EITE NDW

async function ndw() {
    // Start StageR main loop
    await ndw_invoke('main');
    // Run r/b/tick, which returns 0 once there is no more code to run
    let status;
    while (status > 0) {
        status = await ndw_invoke('tick');
        if (status === 1) {
            // continue without waiting for next event
        } else if (status === 2) {
            // wait for next expected event
        }
    }
    return await ndw_invoke('getExitCode');
}

async function ndw_invoke(routine) {
    // sr_ prefix is the deterministic StageR routines
    let tickResults;
    if (routine === 'main' || routine === 'tick') {
        if (routine === 'main') {
            tickResults = sr_main(an/memory, an/storage, an/io);
        }
        if (routine === 'tick') {
            tickResults = sr_tick(an/memory, an/storage, an/io);
        }
        return 1;
    }
    if (routine === 'getExitCode') {
        return sr_getExitCode(an/memory, an/storage, an/io);
    }
}
