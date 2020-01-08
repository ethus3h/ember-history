async function getEnvPreferredFormat() {
    // Note that this routine will produce different outputs on different StageL target platforms, and that's not a problem since that's what it's for.
    return await getSharedState('envPreferredFormat');
}

async function getEnvResolutionW() {
    // Result for this is either in pixels or characters. For immutableCharacterCells, it's just the number of columns available, defaulting to 80 if we can't tell, and says 1 line available. If it's -1, it's unlimited (probably this would only occur if explicitly configured as such).
    return await getSharedState('envResolutionW');
}

async function getEnvResolutionH() {
    // See getEnvResolutionW description.
    return await getSharedState('envResolutionH');
}

async function getEnvCharEncoding() {
    return await getSharedState('envCharEncoding');
}

async function getEnvTerminalType() {
    return await getSharedState('envTerminalType');
}

async function getEnvLanguage() {
    return await getSharedState('envLanguage');
}

async function getEnvCodeLanguage() {
    return await getSharedState('envCodeLanguage');
}

async function getEnvLocaleConfig() {
    return await getSharedState('envLocaleConfig');
}

async function renderDrawContents(renderBuffer) {
    // Whether it appends to or replaces the frame would depend on the environment. In this implementation, HTML replaces, and terminal appends.
    // The input is an array of bytes of the rendered document, either of HTML or text.
    await assertIsByteArray(renderBuffer);
    let utf8decoder = new TextDecoder('utf-8');
    let string = utf8decoder.decode(Uint8Array.from(renderBuffer));
    if (haveDom) {
        await eiteHostCall('internalRequestRenderDrawHTMLToDOM', [string]);
    }
    else {
        await console.log(string);
    }
}

async function internalRequestRenderDrawHTMLToDOM(htmlString) {
    let htmlOutputRootElement = await document.getElementById('eiteDocumentRoot');
    htmlOutputRootElement.innerHTML = htmlString;
    htmlOutputRootElement.scrollTop = htmlOutputRootElement.scrollHeight;
}

async function getImportSettingsArr() {
    await assertIsStrArray(await getSharedState('importSettings'));

    return await getSharedState('importSettings');
}

async function getExportSettingsArr() {
    await assertIsStrArray(await getSharedState('exportSettings'));

    return await getSharedState('exportSettings');
}

async function setImportSettings(formatId, strNewSettings) {
    await assertIsStr(strNewSettings);

    await implDebug('State change for import settings for '+formatId+' to '+strNewSettings+'.', 1);

    let temp;
    temp=await getSharedState('importSettings');
    temp[formatId]=strNewSettings;
    await setSharedState('importSettings', temp);
}

async function setExportSettings(formatId, strNewSettings) {
    await assertIsStr(strNewSettings);

    await implDebug('State change for export settings for '+formatId+' to '+strNewSettings+'.', 1);

    let temp;
    temp=await getSharedState('exportSettings');
    temp[formatId]=strNewSettings;
    await setSharedState('exportSettings', temp);
}

async function setImportDeferredSettingsStack(newStack) {
    await assertIsStrArray(newStack);

    await implDebug('State change for import deferred settings stack to '+newStack+'.', 1);

    await setSharedState('strArrayImportDeferredSettingsStack', newStack);
}

async function setExportDeferredSettings(newStack) {
    await assertIsStr(newStack);

    await implDebug('State change for export deferred settings stack to '+newStack+'.', 1);

    await setSharedState('strArrayImportDeferredSettingsStack', newStack);
}

async function setStorageSettings(strArrayNewSettings) {
    await assertIsStrArray(strArrayNewSettings);
    await setSharedState('strArrayStorageCfg', strArrayNewSettings);
}

async function getStorageSettings(strArrayNewSettings) {
    return await getSharedState('strArrayStorageCfg');
}
