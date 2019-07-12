const appRoot = require('app-root-path');
const fs = require('fs');
const pLimit = require('p-limit');
const jsonexport = require('jsonexport')
const qlikHelpers = require('./qlik-helpers.js')
const qlikComm = require(`${appRoot}\\functions\\qlik-comm.js`)

const limit = pLimit(4);
const config = JSON.parse(fs.readFileSync('./config.json'));

const prepareResult = function (extensionsList) {
    extensionsList = extensionsList.filter(function (e) {
        return e.length > 0
    })
    let flatten = extensionsList.reduce((a, b) => a.concat(b), []);
    return flatten
}

const printResult = function (dataToPrint) {
    jsonexport(dataToPrint, function (err, csv) {
        fs.writeFileSync(config.outputFile, csv)
    })
}

const preparePromises = function (allQlikDocs) {
    let docs = [];

    allQlikDocs.map(function (qDoc) {
        try {
            docs.push(limit(() => extractExtensionObjectsData(qDoc)));
        } catch (e) {
            console.log(qDoc.qDocName)
        }
    })

    return docs
}

async function extractExtensionObjectsData(qDoc) {
    try {
        console.log(`Opened ${qDoc.qDocName} ...`)
        let session = qlikComm.createSession()
        let global = await session.open()
        let doc = await qlikComm.doc.open(global, qDoc, true)

        let allInfos = await doc.getAllInfos()
        let extensionObjects = await qlikHelpers.filterOnlyExtensionObjects(doc, allInfos)
        await session.close()

        console.log(`Closed app: ${qDoc.qDocName}. Total objects processed: ${allInfos.length}`)
        return extensionObjects
    } catch (e) {
        let a = 1
        console.log(`${qDoc.qDocId} -> ${e.message}`)
        return []
    }
}

module.exports = {
    config,
    prepareResult,
    printResult,
    preparePromises
}