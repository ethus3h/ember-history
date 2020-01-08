// Implementations of routines provided in public-interface.stagel.

async function internalRunDocument(execId) {
    await assertIsExecId(execId);

    // Start actually running the document
    startDocumentExec(execId);

    // Watch for events and add them into strArrayDocumentExecEvents as needed

    let eventsToNotify = [];
    eventsToNotify = await getDesiredEventNotifications(execId);

    // FIXME Unimplemented
}
