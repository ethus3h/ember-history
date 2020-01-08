async function storageSetup(kvStorageCfgParam) {
    kvStorageCfg=kvStorageCfgParam;
    if (typeof kvStorageCfg === 'undefined') {
        kvStorageCfg=[];
    }
    let temp;
    // Later, use OrbitDB. Currently they don't support granting write access after a database has been created, which makes it unusable for this.
    /* ipfsNode = new IPFS();
    await new Promise(resolve => {
        ipfsNode.once('ready', () => {
            resolve()
        });
    }); */
    // Now, set default values for storage providers configuration
    // Provider: MySQL
    temp=await kvGetValue(kvStorageCfg, 'mysqlApi')
    if (''===temp) {
        kvStorageCfg=await kvSetValue(kvStorageCfg, 'mysqlApi', 'http://futuramerlin.com/specification/engineering-and-tech/information-technology/software/env/web/api.php');
    }
    temp=await kvGetValue(kvStorageCfg, 'mysqlUser')
    if (''===temp) {
        kvStorageCfg=await kvSetValue(kvStorageCfg
        , 'mysqlUser', 'UNCONFIGURED');
    }
    temp=await kvGetValue(kvStorageCfg, 'mysqlSecretKey')
    if (''===temp) {
        kvStorageCfg=await kvSetValue(kvStorageCfg
        , 'mysqlSecretKey', 'UNCONFIGURED');
    }
    await setStorageSettings(kvStorageCfg);
    temp=await kvGetValue(kvStorageCfg, 'mysqlSession')
    if (''===temp) {
        let session=await internalStorageMysqlApiRequest('table=idxPerson&action=getSession&user='+await kvGetValue(await getStorageSettings(), 'mysqlUser')+'&secretkey='+encodeURIComponent(await kvGetValue(await getStorageSettings(), 'mysqlSecretKey')));
        if (session === null || session === undefined) {
            await implError('Could not log in!');
        }
        else {
            kvStorageCfg=await kvSetValue(kvStorageCfg, 'mysqlSession', session);
        }
    }
    // Done, so now set the global value to the prepared configuration key-value pairs
    await setStorageSettings(kvStorageCfg);
}

async function storagePut(path, data) {
    // s/path, as/data
    await assertIsIntArray(data); let intRes;
    if (data.constructor.name !== 'Uint8Array') {
        data = new Uint8Array(data);
    }
    /* ipfsNode.files.add(ipfsNode.types.Buffer.from(data), (err, files) => {
        if (err) {
            await implDie(err.toString());
        }
        // "'hash', known as CID, is a string uniquely addressing the data and can be used to get it again. 'files' is an array because 'add' supports multiple additions, but we only added one entry" —https://js.ipfs.io/
        return files[0].hash;
    }); */
    intRes=await intFromIntStr(await internalStorageMysqlApiRequest('table=node&action=insertNode&session='+await kvGetValue(await getStorageSettings(), 'mysqlSession')+'&data=version,0,data,'+await intArrayToBase64(data)));
    await assertIsInt(intRes); return intRes;
}

async function storageGet(path) {
    // s/path
    await assertIsInt(id); let intArrayRes;
    /* ipfsNode.files.cat(id, (err, data) => {
        if (err) {
            await implDie(err.toString());
        }
        return new Uint8Array(data);
    }); */
    intArrayRes=await strToByteArray((await internalStorageMysqlApiRequest('table=node&action=getRowByValue&session='+await kvGetValue(await getStorageSettings(), 'mysqlSession')+'&field=id&value='+await strFrom(id)))['data']);
    await assertIsIntArray(intArrayRes); return intArrayRes;
}

async function internalStorageMysqlApiRequest(queryString) {
    let url=await kvGetValue(await getStorageSettings(), 'mysqlApi')+'?'+queryString;
    let response = await new Promise(resolve => {
    var oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        if (oReq.status !== 200) {
            resolve(null);
        }
        else {
            resolve(oReq.response);
        }
    };
    oReq.onerror = function() {
        resolve(null);
    }
    oReq.send(null);
    });
    return response;
}

async function internalStorageGetTable(tableName) {
    // For testing; will be removed eventually
    let qs='action=getTable&session='+await kvGetValue(await getStorageSettings(), 'mysqlSession')+'&table='+tableName;
    return await internalStorageMysqlApiRequest(qs);
}
