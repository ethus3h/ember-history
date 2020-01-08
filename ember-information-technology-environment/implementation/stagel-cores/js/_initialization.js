eiteLibrarySetup(); // This function call should be the only code other than exports, for easy moduleification. This has to run somehow regardless of whether EITE is being used as a library or normally. This does not call setupIfNeeded, meaning things like nice error messages that that provides aren't available.
async function eiteLibrarySetup() {
    // This function is run when the eite is imported as a script tag. It has to be manually run when eite is imported as a module (unless you call setupIfNeeded or an API interface that calls it for you as the first thing after importing it).
    if (true !== await getSharedState('librarySetupFinished') && true !== await getSharedState('librarySetupStarted')) {
        // Preferences (most preferences should be implemented in EITE itself rather than this implementation of its data format): set defaults if not set already
        await setSharedState('librarySetupStarted', true);
        await setSharedState('librarySetupFinished', false);
        if (await getSharedState('STAGEL_DEBUG') === undefined) {
            await setSharedState('STAGEL_DEBUG', 0);
            await setSharedState('STAGEL_DEBUG_UNSET', true);
        }
        if (await getSharedState('EITE_STORAGE_CFG') === undefined) {
            await setSharedState('EITE_STORAGE_CFG', []);
        }
        if (await getSharedState('importSettings') === undefined) {
            await setSharedState('importSettings', []);
        }
        if (await getSharedState('exportSettings') === undefined) {
            await setSharedState('exportSettings', []);
        }
        if (await getSharedState('envPreferredFormat') === undefined) {
            await setSharedState('envPreferredFormat', '');
        }
        if (await getSharedState('envCharEncoding') === undefined) {
            await setSharedState('envCharEncoding', 'asciiSafeSubset');
        }
        if (await getSharedState('envTerminalType') === undefined) {
            await setSharedState('envTerminalType', 'vt100');
        }
        if (await getSharedState('envLanguage') === undefined) {
            await setSharedState('envLanguage', 'en-US');
        }
        if (await getSharedState('envLocaleConfig') === undefined) {
            await setSharedState('envLocaleConfig', 'inherit:usa,');
        }
        if (await getSharedState('envCodeLanguage') === undefined) {
            await setSharedState('envCodeLanguage', 'javascript');
        }
        if (await getSharedState('envResolutionW') === undefined) {
            await setSharedState('envResolutionW', '0');
        }
        if (await getSharedState('envResolutionH') === undefined) {
            await setSharedState('envResolutionH', '0');
        }

        // Shared state variables
        await setSharedState('datasets', []); // as
        await setSharedState('datasetsLoaded', false);
        await setSharedState('dcData', []); // an
        await setSharedState('strArrayDocumentExecData', []); // as: holds the current document state for any documents being executed.
        await setSharedState('strArrayDocumentExecSymbolIndex', []); // as: holds a key-value-pair list of symbols for each doc. Example string that could go in this: "25 1 0 1 :129,5 1 3 278 :343," indicates that the document it goes with contains two symbols: the first is named 25 1 0 1 (which is Dcs) and is located at strArrayDocumentExecData[129], and the second is named 5 1 3 278 and is located at strArrayDocumentExecData[343]. Symbols get stuck onto the end of the currently executing document's data and their positions recorded in this index.
        await setSharedState('strArrayDocumentExecPtrs', []); // as: holds the current execution state of each document as a comma-separated list of ints with the last indicating the position in the document where execution is (the earlier ints represent where execution should return to upon exiting the current scope, so it acts as a stack). When the document finishes executing (the pointer runs off the end of the document), the pointer position is set to -1. (not implemented)
        await setSharedState('strArrayDocumentExecFrames', []); // as: holds strings of space-terminated integers representing Dcs to be rendered.
        await setSharedState('strArrayDocumentExecEvents', []); // as: holds comma-delimited strings of space-terminated integers representing the Dcs of event data that have not been processed yet.
        await setSharedState('strArrayDocumentExecLogs', []); // as: holds comma-delimited strings of warning messages, like the import and export warning logs, except with a separate warning message array for each document execution.
        await setSharedState('strArrayDocumentExecSettings', []); // as: holds comma-delimited strings of exec setting key/value pairs. For example, might be a good setting string for running a unit test that aborts if it's still running at 50 ticks and running without I/O: stopExecAtTick:50,runHeadless:true,
        await setSharedState('setupFinished', false);
        await setSharedState('intPassedTests', 0);
        await setSharedState('intFailedTests', 0);
        await setSharedState('intTotalTests', 0);
        await setSharedState('intArrayTestFrameBuffer', []); // an
        await setSharedState('eiteWasmModule', undefined);
        await setSharedState('strArrayImportDeferredSettingsStack', []); // as
        await setSharedState('strArrayExportDeferredSettingsStack', []); // as
        await setSharedState('strArrayImportWarnings', []); // as
        await setSharedState('strArrayExportWarnings', []); // as
        await setSharedState('strArrayStorageCfg', []); // as
        await setSharedState('ipfsNode', undefined);
        await setSharedState('haveDom', false);
        await setSharedState('internalDelegateStateRequests', false); // if set to true, pass back get/set shared state requests to the Web worker's host, allowing state to be kept in sync between the worker and host.

        await setSharedState('stagelDebugCallstack', []);
        await setSharedState('stagelDebugCallNames', []);
        await setSharedState('stagelDebugCallCounts', []);
        await setSharedState('stagelDebugCollection', "");
        //alert("Setting up logging");

        // Next code is support for the eiteCall routine which allows calling other eite routines using a Web worker if available.

        // To call a routine from eite, running it as a worker if available, run: await eiteCall('routineName', [param1, param2, param3...]); (with the brackets around the params). There's also eiteHostCall('routineName', [params...]) for calling functions from the worker that can't be called from a worker.

        // Promise-wrapped worker strategy is inspired by Gilad Dayagi's implementation described at https://codeburst.io/promises-for-the-web-worker-9311b7831733

        if (typeof window !== 'undefined') {
            // Not running as a Web worker
            window.eiteCall = async function(funcName, args) {
                if (args === undefined) {
                    args=[];
                }
                return await window[funcName]( ...args );
            };
            window.eiteHostCall = window.eiteCall;
            if (window.Worker) {
                window.eiteWorker = new Worker('eite.js');
                window.eiteWorkerResolveCallbacks = {};
                window.eiteWorkerCallID = 0;
                // no need to declare it async when it explicitly returns a promise
                window.eiteCall = function(funcName, args) {
                    if (args === undefined) {
                        args=[];
                    }
                    window.eiteWorkerCallID = window.eiteWorkerCallID + 1;
                    let thisCallId=window.eiteWorkerCallID;
                    let thisCall={uuid: 'b8316ea083754b2e9290591f37d94765EiteWebworkerRequest', msgid: thisCallId, args: [funcName, args]};
                    return new Promise(function(resolve) {
                        window.eiteWorkerResolveCallbacks[thisCallId]=resolve;
                        window.eiteWorker.postMessage(thisCall);
                    });
                };
                window.eiteHostRequestInternalOnMessage = async function(message) {
                    // The host accepted a message; this function processes it
                    const uuid = message.data.uuid;
                    const msgid = message.data.msgid;
                    const args = message.data.args;
                    await implDebug('Host understood message '+msgid+' from worker: '+args, 1);
                    await internalDebugLogJSObject(message);
                    let res = await window[args[0]]( ...args[1] );
                    await implDebug('Request made of host by worker in message '+msgid+' returned the result: '+res, 1);
                    window.eiteWorker.postMessage({uuid: 'b8316ea083754b2e9290591f37d94765EiteWebworkerHostResponse', msgid: msgid, args: res});
                }
                window.eiteWorker.onmessage = async function(message) {
                    // Handle messages sent to this code when it is not running as a Web worker
                    const uuid = message.data.uuid;
                    const msgid = message.data.msgid;
                    const msgdata = message.data.args;
                    await implDebug('Host got message '+msgid+' from worker: '+msgdata, 1);
                    await internalDebugLogJSObject(message);
                    if (uuid === 'b8316ea083754b2e9290591f37d94765EiteWebworkerResponse') {
                        if (msgdata === undefined) {
                            await implDebug('Web worker returned undefined result in message '+msgid+'.', 1);
                        }
                        let resolveCallback;
                        resolveCallback = window.eiteWorkerResolveCallbacks[msgid];
                        if (resolveCallback !== undefined) {
                            resolveCallback(msgdata);
                            delete window.eiteWorkerResolveCallbacks[msgid];
                        }
                        else {
                            await implDie('Web worker returned invalid message ID '+msgid+'.');
                            throw 'Web worker returned invalid message ID '+msgid+'.';
                        }
                    }
                    else if (uuid === 'b8316ea083754b2e9290591f37d94765EiteWebworkerHostRequest') {
                        window.eiteHostRequestInternalOnMessage(message);
                    }
                    else if (uuid === 'b8316ea083754b2e9290591f37d94765EiteWebworkerError') {
                        await implDie('Web worker with message '+msgid+' encountered an error: '+msgdata+'.');
                        throw 'Web worker with message '+msgid+' encountered an error: '+msgdata+'.';
                    }
                };
            }
        }
        else {
            self.eiteCall = async function(funcName, args) {
                if (args === undefined) {
                    args=[];
                }
                return await self[funcName]( ...args );
            }
            self.eiteHostCall = self.eiteCall;
        }

        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // Running as a Web worker, so set up accordingly
            self.internalOnMessage = async function(message) {
                // The worker accepted a message; this function processes it
                const uuid = message.data.uuid;
                const msgid = message.data.msgid;
                const args = message.data.args;
                await implDebug('Worker understood message '+msgid+' from host: '+args, 1);
                await internalDebugLogJSObject(message);
                let res;
                try {
                    res = await self[args[0]]( ...args[1] );
                }
                catch(error) {
                    self.postMessage({uuid: 'b8316ea083754b2e9290591f37d94765EiteWebworkerError', msgid: msgid, args: error.message + ' (call: ' + args[0] + ', ' + args[1].toString() + ')'});
                    throw error;
                }
                await implDebug('Request made of worker by host in message '+msgid+' returned the result: '+res, 1);
                self.postMessage({uuid: 'b8316ea083754b2e9290591f37d94765EiteWebworkerResponse', msgid: msgid, args: res});
            }

            self.onmessage = async function(message) {
                // Handle messages sent to this code when it is running as a Web worker
                const uuid = message.data.uuid;
                const msgid = message.data.msgid;
                const args = message.data.args;
                await implDebug('Worker got message '+msgid+' from host: '+args, 1);
                await internalDebugLogJSObject(message);
                if (uuid === 'b8316ea083754b2e9290591f37d94765EiteWebworkerRequest') {
                    self.internalOnMessage(message);
                }
                else if (uuid === 'b8316ea083754b2e9290591f37d94765EiteWebworkerHostResponse') {
                    if (args === undefined) {
                        await implDebug('Host sent undefined contents in message '+msgid+'.', 1);
                    }
                    let resolveCallback;
                    resolveCallback = self.eiteWorkerHostResolveCallbacks[msgid];
                    if (resolveCallback !== undefined) {
                        resolveCallback(args);
                        delete self.eiteWorkerHostResolveCallbacks[msgid];
                    }
                    else {
                        await implDie('Host returned invalid message ID.');
                        throw 'Host returned invalid message ID.';
                    }
                }
            }

            self.eiteWorkerHostResolveCallbacks = {};
            self.eiteWorkerHostCallID = 0;
            // no need to declare it async when it explicitly returns a promise
            self.eiteHostCall = function(funcName, args) {
                if (args === undefined) {
                    args=[];
                }
                self.eiteWorkerHostCallID = self.eiteWorkerHostCallID + 1;
                let thisCallId=self.eiteWorkerHostCallID;
                let thisCall={uuid: 'b8316ea083754b2e9290591f37d94765EiteWebworkerHostRequest', msgid: thisCallId, args: [funcName, args]};
                return new Promise(function(resolve) {
                    self.eiteWorkerHostResolveCallbacks[thisCallId]=resolve;
                    self.postMessage(thisCall);
                });
            };
            //getWindowOrSelf()['internalDelegateStateRequests'] = true; // This would make the host and worker use the same shared state. That breaks things though, so don't. Still, it's interesting to have support in the code for it, just as reference to show that it can be done even without SharedArrayBuffer. (not exactly groundbreaking, I know, but whatever, it's only a couple of extra lines to leave the delegated requests support in)
        }
        await setSharedState('librarySetupFinished', true);
        /*if (await getSharedState('STAGEL_DEBUG_UNSET') === 'true') {
            if (await getSharedState('STAGEL_DEBUG') === 0) {
                await setSharedState('STAGEL_DEBUG', 1);
            }
        }*/
    }
}

function internalSleep(ms) {
    // from https://web.archive.org/web/20190111230631/https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSharedState(name) {
    if (getWindowOrSelf()['internalDelegateStateRequests'] === true) {
        return await eiteHostCall('getSharedState', [name]);
    }
    else {
        return getWindowOrSelf()[name];
    }
}

async function setSharedState(name, value) {
    if (getWindowOrSelf()['internalDelegateStateRequests'] === true) {
        await eiteHostCall('setSharedState', [name, value]);
    }
    else {
        await implDebug('State change for ' + name + ' to ' + value + '.', 3);
        getWindowOrSelf()[name] = value;
    }
}

async function isSetupFinished() {
    return await getSharedState('setupFinished');
}

async function setupIfNeeded() {
    if (await getSharedState('librarySetupFinished') !== 'true') {
        await eiteLibrarySetup();
    }
    if (await getSharedState('setupFinished')) {
        return;
    }
    await internalSetup();
}

// Main setup logic
async function internalSetup() {
    // Load WebAssembly components. Functions provided by them are available with await wasmCall('functionName', argument), where argument is an int or an array of ints.
    // https://developer.mozilla.org/en-US/docs/WebAssembly/Loading_and_running
    await eiteHostCall('internalEiteReqWasmLoad', ['wasm-common/eite-c-exts.c.wat']);

    // Set up environment variables.

    // Detect if we can create DOM nodes (otherwise we'll output to a terminal). This is used to provide getEnvironmentPreferredFormat.
    if (await eiteHostCall('internalEiteReqTypeofWindow') !== 'undefined') {
        await setSharedState('haveDom', true);
    }
    let charset = await eiteHostCall('internalEiteReqCharset');
    if (charset === 'utf-8') {
        await setSharedState('envCharEncoding', 'utf8');
    }
    else {
        await implWarn("Unimplemented character set: " + charset + ". Falling back to asciiSafeSubset.");
    }
    if (await getSharedState('haveDom')) {
        // Web browsers, etc.
        await setSharedState('envPreferredFormat', 'htmlFragment');
        await setSharedState('envResolutionW', await eiteHostCall('internalEiteReqOutputWidth'));
        await setSharedState('envResolutionH', await eiteHostCall('internalEiteReqOutputHeight'));
    }
    else {
        // Command-line, e.g. Node.js
        await setSharedState('envPreferredFormat', 'characterCells');
        await setSharedState('envResolutionW', process.stdout.columns);
        await setSharedState('envResolutionH', process.stdout.rows);
        if (await getSharedState('envResolutionW') === 0 || await getSharedState('envResolutionH') === 0 || await getSharedState('envResolutionW') === undefined || await getSharedState('envResolutionH') === undefined) {
            await setSharedState('envPreferredFormat', 'immutableCharacterCells');
            // Maybe it's headless, or going to a text file or something? Not tested, but let's just assume we've got 80 columns to work with, and set the height to 1 so apps don't try to draw text-mode GUIs and stuff maybe.
            await setSharedState('envResolutionW', 80);
            await setSharedState('envResolutionH', 1);
        }
    }
    if (await getSharedState('envResolutionW') === 0 || await getSharedState('envResolutionH') === 0 || await getSharedState('envResolutionW') === undefined || await getSharedState('envResolutionH') === undefined) {
        await implWarn('The resolution detected was zero in at least one dimension. Width = '+await getSharedState('envResolutionW')+'; height = '+await getSharedState('envResolutionH')+'. Things may draw incorrectly. TODO: Add a way to configure this for environments that misreport it.');
    }

    // Set up data sets.

    await setSharedState('datasets', await listDcDatasets());
    if (!await getSharedState('datasetsLoaded')) {
        await internalLoadDatasets();
    }

    // Fill out format settings arrays in case they aren't yet
    let settingsCount=Object.keys(await listFormats()).length;
    let tempSettings;
    for (let settingsCounter=0; settingsCounter < settingsCount; settingsCounter++) {
        if (await getSharedState('importSettings')[settingsCounter] === undefined) {
            tempSettings = await getSharedState('importSettings');
            tempSettings[settingsCounter] = '';
            await setSharedState('importSettings', tempSettings);
            tempSettings = [];
        }
    }
    settingsCount=Object.keys(await listFormats()).length;
    for (let settingsCounter=0; settingsCounter < settingsCount; settingsCounter++) {
        if (exportSettings[settingsCounter] === undefined) {
            tempSettings = await getSharedState('exportSettings');
            tempSettings[settingsCounter] = '';
            await setSharedState('exportSettings', tempSettings);
        }
    }

    // Set up storage

    await storageSetup(await getSharedState('EITE_STORAGE_CFG'));

    // Other startup stuff.

    if (await getSharedState('haveDom')) {
        // Override error reporting method to show alert

        registerSpeedup('implError', async function (strMessage) {
            if(typeof strMessage !== "string") {
                await eiteHostCall('internalEiteReqAlert', ["EITE reported an error! You may want to reload the page. The error was: Nonstring error message!"]);
                throw "Nonstring error message";
            }
            // Don't call await assertIsStr(strMessage); here since it can call implDie and cause a recursive loop — maybe??

            //await FIXMEUnimplemented("implError");
            await implWarn(strMessage);

            await console.trace();
            await eiteHostCall('internalEiteReqAlert', ["EITE reported an error! You may want to reload the page. The error was: " + strMessage]);
        });

        registerSpeedup('implWarn', async function (strMessage) {
            await assertIsStr(strMessage);
            // Log the provided message

            await FIXMEUnimplemented("implWarn");
            await implLog(strMessage);

            await console.trace();
        });

        registerSpeedup('implLog', async function (strMessage) {
            await assertIsStr(strMessage);
            // Log the provided message

            await console.log(strMessage);
            //await console.trace();
            if(await Object.keys(stagelDebugCallstack).length > 0) {
                await console.log("Previous message sent at: " + await internalDebugPrintStack());
            }
            else {
                if (2 <= await getSharedState('STAGEL_DEBUG') && 3 > await getSharedState('STAGEL_DEBUG')) {
                    await console.log("(Previous message sent from non-StageL code.)");
                    await console.trace();
                }
            }
            if (3 <= await getSharedState('STAGEL_DEBUG')) {
                await console.trace();
            }
        });
    }

    await setSharedState('setupFinished', true);
}

function getWindowOrSelf() {
    if (typeof this !== 'undefined') {
        return this;
    }
    else if (typeof window !== 'undefined') {
        return window;
    }
    else {
        return self;
    }
}

function registerSpeedup(name, func) {
    getWindowOrSelf()[name] = func;
}

// Routines needed for Web worker requests
async function internalEiteReqCharset() {
    return document.characterSet.toLowerCase();
}

async function internalEiteReqOutputWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

async function internalEiteReqOutputHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

async function internalEiteReqWat2Wabt(watData) {
    let watStr=await strFromByteArray(watData);
    let wasmArray;
    let wabtWasmObject;
    let wabtFeaturesArray = [ 'exceptions', 'mutable_globals', 'sat_float_to_int', 'sign_extension', 'simd', 'threads', 'multi_value', 'tail_call' ];
    let wabtFeaturesObject={};
    for (let feature of wabtFeaturesArray) {
        wabtFeaturesObject[feature] = false;
    }
    return await new Promise(resolve => {
        WabtModule().then(async function(wabt) {
            try {
                wabtWasmObject=wabt.parseWat('test.wast', watStr, wabtFeaturesObject);
                wabtWasmObject.resolveNames();
                wabtWasmObject.validate(wabtFeaturesObject);
                wasmArray=new Uint8Array(await new Response(new Blob([wabtWasmObject.toBinary({log: true, write_debug_names:true}).buffer])).arrayBuffer());
                resolve(wasmArray);
            } catch (e) {
                await implDie('Failed loading WebAssembly module.');
            } finally {
                if (wabtWasmObject) {
                    wabtWasmObject.destroy();
                }
            }
        });
    });
}

async function internalEiteReqWasmLoad(path) {
    let importObject = {
        imports: {
            // If there were JavaScript functions that the C code could call, they would go here. For calling C functions from JavaScript, use instance.exports.exported_func();. I could have an import object passed to internalEiteReqWasmLoad, but don't see the need for it at the moment, so this is just here for documentation.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate
            /*
            imported_func: function(arg) {
                console.log(arg);
            }
            */
        }
    };
    let wasmData=await eiteHostCall('internalEiteReqWat2Wabt', [await getFileFromPath(path)]);
    await setSharedState('eiteWasmModule', await WebAssembly.instantiate(wasmData, importObject));
}

async function internalEiteReqTypeofWindow() {
    return typeof window;
}

async function internalEiteReqAlert(msg) {
    await alert(msg);
    return null;
}

async function internalEiteReqLoadDataset(dataset) {
    // Papa.parse call has to be run from the main thread because Papa isn't defined in the worker since it was only imported in the main thread.
    return await new Promise(resolve => {
        Papa.parse('data/' + dataset + '.csv', {
            download: true,
            encoding: "UTF-8",
            newline: "\n",
            delimiter: ",",
            quoteChar: "\"",
            complete: async function(results, file) {
                resolve(results.data);
            },
            error: async function(results, file) {
                await implError("Error reported while parsing "+dataset+"!");
                resolve(undefined);
            }
        });
    });
}

async function internalLoadDatasets() {
    // This is a separate function since it may later be desirable to dynamically load datasets while a document is running (so only the needed datasets are loaded).
    let count = 0;
    let dataset = '';
    let temp;
    let datasets=await getSharedState('datasets');
    while (count < Object.keys(datasets).length) {
        dataset = datasets[count];
        temp=await getSharedState('dcData');
        temp[dataset] = [];
        // I guess the anonymous functions defined as parameters to the Papa.parse call inherit the value of dataset from the environment where they were defined (i.e., here)??
        temp[dataset] = await eiteHostCall('internalEiteReqLoadDataset', [dataset]);
        await setSharedState('dcData', temp);
        count = count + 1;
    }
    await setSharedState('datasetsLoaded', true);
}

let Base16b = {
    /* Based on https://web.archive.org/web/20090902074623/http://www.base16b.org/doc/specification/version/0.1/base16b.pdf */
    // This code for the Base16b object is included under the following license:
    /**
    * Base16b family encode / decode
    * http://base16b.org/lib/version/0.1/js/base16b.js
    * or http://base16b.org/lib/js/base16b.js
    **/
    /*
    Copyright (c) 2009 Base16b.org
    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    */
    // private variables
    // +UF0000 is the first code point in the Asyntactic script
    _asStart: {
        value: 0x0000,
        cp: 0xF0000
    },
    _noncont: function() {
        let nc = []; // array of cp : value mappings for the non-contiguous code points
        nc[0] = {
            value: 0xFFFE,
            cp: 0xF80A
        };
        nc[1] = {
            value: 0xFFFF,
            cp: 0xF80B
        };
        nc[2] = {
            value: 0x1FFFE,
            cp: 0xF80C
        };
        nc[3] = {
            value: 0x1FFFF,
            cp: 0xF80D
        };
        return nc;
    },
    // private methods
    _CharBytes: function(segmCP) { // return the number of bytes needed for the character. Usually 2.
        if (this._fixedCharCodeAt(segmCP, 0) && this._fixedCharCodeAt(segmCP, 1)) {
            return 2;
        }
        else {
            return 1;
        }
    },
    _CharBytesFixed: function(segmCP) { // return the number of bytes needed for the character. Usually 2.
        let code = segmCP.charCodeAt(0);
        if (0xD800 <= code && code <= 0xDBFF) { // High surrogate
            return 2;
        }
        if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
            return 2;
        }
        return 1;
    },
    _invertVal: function(segmVal, base) {
        // Two's complement of the value for this base
        return Math.pow(2, base) - (segmVal + 1);
    },
    _fromCodePoint: function(segmCP, bytes) {
        // Map Code Point to a segment value as specified by the mapping table for this base in the Asyntactic script
        if (bytes === 2) {
            return this._fixedCharCodeAt(segmCP, 0) - this._asStart.cp;
        }
        let i;
        for (i = 0; i < this._noncont().length; i++) {
            // handle non-contiguous code points for last two CPs in bases 16 and 17
            if (this._fixedFromCharCode(this._noncont()[i].cp) === segmCP) {
                return this._noncont()[i].value;
            }
        }
    },
    _toCodePoint: function(segmVal, base) {
        // Map a segment value to the Code Point specified by the mapping table for this base in the Asyntactic script
        if (base < 16) {
            return this._asStart.cp + segmVal;
        }
        let i;
        for (i = 0; i < this._noncont().length; i++) {
            // handle non-contiguous code points for bases 16 and 17
            if (this._noncont()[i].value === segmVal) {
                return this._noncont()[i].cp;
            }
        }
        return this._asStart.cp + segmVal;
    },
    _fixedFromCharCode: function(codePt) {
        // Fix the standard String.FromCharCode method to handle non-BMP unicode planes
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/fromCharCode
        if (codePt > 0xFFFF) {
            codePt -= 0x10000;
            return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
        }
        else {
            return String.fromCharCode(codePt);
        }
    },
    _fixedCharCodeAt: function(str, idx) {
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/charCodeAt
        let code = str.charCodeAt(idx);
        let hi;
        let low;
        if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            hi = code;
            low = str.charCodeAt(idx + 1);
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
            hi = str.charCodeAt(idx - 1);
            low = code;
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        return code;
    },
    // public method for encoding
    encode: function(inputArr, base) {
        /*
        Encode an array of pseudo-booleans (0 or 1)
        The specification of the encoding is documented elsewhere on this site. (Search Asyntactic script and Base16b.)
        */
        try {
            if (!(base >= 7 && base <= 17)) {
                throw ('invalid encoding base: ' + base);
            }
            let resultArr = [];
            let fullSegments = Math.floor(inputArr.length / base);
            let remainBits = inputArr.length - (fullSegments * base);
            let segment;
            let bit;
            let segmstart;
            let segmVal; // construct the value of the bits in the current segment
            let currsegm;
            // convert the next segment of base number of bits to decimal
            for (segment = 0; segment < fullSegments; segment++) {
                // input and output both read from left to right
                segmstart = base * segment;
                currsegm = inputArr.slice(segmstart, segmstart + base);
                // most significant bit at the start (left) / least significant bit at the end (right).
                segmVal = 0;
                for (bit = base - 1; bit >= 0; bit--) {
                    segmVal += (currsegm[bit] * Math.pow(2, (base - 1) - bit));
                }
                resultArr[segment] = this._fixedFromCharCode(this._toCodePoint(segmVal, base));
            }
            // encode the termination character
            segmVal = 0;
            segmstart = base * segment;
            currsegm = inputArr.slice(segmstart);
            for (bit = remainBits - 1; bit >= 0; bit--) {
                segmVal += (currsegm[bit] * Math.pow(2, (remainBits - 1) - bit));
            }
            resultArr[segment] = this._fixedFromCharCode(this._toCodePoint(this._invertVal(segmVal, base), base));
            return resultArr.join('');
        }
        catch (e) {
            //alert(e);
            return false;
        }
    },
    // public method for decoding
    decode: function(inputStr, remainderLength) {
        // remainderLength is not in the original version of this code. It should be provided to get the expected result. It is the input length in bits, mod the number of bits per character (the second argument to the encode function). Other fixes to decoding are also made if remainderLength is provided. If it is not provided, the output should be the same as with original API (if not, that's a bug).
        /*
        Decode a string encoded in the Asyntactic script. Return an array of pseudo-booleans (0 or 1)
        The specification of the encoding is documented elsewhere on this site. (Search Asyntactic script and Base16b.)
        */
        try {
            let originalApi = true;
            if (remainderLength !== undefined) {
                originalApi = false;
            }
            let resultArr = [];
            let termCharBytes = this._CharBytesFixed(inputStr.slice(-1));
            let termCharCP = inputStr.slice(-termCharBytes); // get the termination character
            let termCharVal = this._fromCodePoint(termCharCP, termCharBytes);
            let bit = 17;
            let base;
            // decode the base from the termination character
            while (Math.floor(termCharVal / Math.pow(2, bit - 1)) === 0 && bit >= 7) {
                bit--;
            }
            if (!(bit >= 7 && bit <= 17)) {
                throw ('invalid encoding base');
            }
            else {
                base = bit;
            }
            let segmVal;
            let currCharBytes;
            let bytesUsed = 0;
            let fullBytes = inputStr.length - termCharBytes;
            let decodedBit = 0;
            let segmentBitLength = currCharBytes * 8;
            if (!originalApi) {
                segmentBitLength = base;
            }
            while (bytesUsed < fullBytes) {
                // decode the code point segments in sequence
                currCharBytes = this._CharBytesFixed(inputStr.slice(bytesUsed, bytesUsed + 1)); // taste before taking a byte
                termCharCP = inputStr.slice(bytesUsed, bytesUsed + currCharBytes);
                let segmVal = this._fromCodePoint(termCharCP, currCharBytes);
                // most significant bit at the start (left) / least significant bit at the end (right).
                for (bit = segmentBitLength - 1; bit >= 0; bit--) {
                    decodedBit=Math.floor((segmVal / Math.pow(2, (bit))) % 2);
                    if (!originalApi) {
                        if (Number.isNaN(decodedBit)) {
                            throw ('Found NaN while decoding');
                        }
                    }
                    resultArr.push(decodedBit);
                }
                bytesUsed += currCharBytes;
            }
            // remainder
            let remainVal = this._invertVal(termCharVal, base); // decode the remainder from the termination character
            bit = (termCharBytes * 8) - 1;
            if (!originalApi) {
                bit = remainderLength - 1;
            }
            for (bit; bit >= 0; bit--) {
                resultArr.push(Math.floor((remainVal / Math.pow(2, (bit))) % 2));
            }
            return resultArr;
        }
        catch (e) {
            //alert(e);
            return false;
        }
    },
    // public method for counting Unicode characters
    trueLength: function(inputStr) {
        /*
        Count the number of characters in a string.
        This function can handle stings of mixed BMP plane and higher Unicode planes.
        Fixes a problem with Javascript which incorrectly that assumes each character is only one byte.
        */
        let strBytes = inputStr.length;
        let strLength = 0;
        let tallyBytes = 0;
        try {
            while (tallyBytes < strBytes) {
                tallyBytes += this._CharBytes(inputStr.slice(tallyBytes, tallyBytes + 2));
                strLength += 1;
            }
            return strLength;
        }
        catch (e) {
            //alert(e);
            return false;
        }
    }
};
