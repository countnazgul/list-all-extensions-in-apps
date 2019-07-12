// const helpers = require('./helpers.js');
const qlikComm = require('./qlik-comm.js')
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

const filterOnlyExtensionObjects = async function (qDoc, allObjects) {
    let possibleExtensionObjects = allObjects.filter(function (o) {
        return config.nonExtensionObjects.indexOf(o.qType) == -1
    })

    let realExtensionObjects = []
    if (possibleExtensionObjects.length > 0) {
        for (let extObj of possibleExtensionObjects) {
            let isReallyExtension = await realExtensionCheck(qDoc, extObj.qId)
            if (isReallyExtension.result) {
                realExtensionObjects.push({
                    appName: qDoc.id,
                    extName: isReallyExtension.qObjProps.extensionMeta.name,
                    extVisible: isReallyExtension.qObjProps.extensionMeta.visible,
                    extIsBundle: !isReallyExtension.qObjProps.extensionMeta.isThirdParty,
                    extIsLibrary: isReallyExtension.qObjProps.extensionMeta.isLibraryItem,
                    // qProps: isReallyExtension.qObjProps
                })
            }
        }
        // let realExtensionObjects = possibleExtensionObjects.filter(async function (extObj) {
        //     let isReallyExtension = await realExtensionCheck(qDoc, extObj.qId)
        //     return isReallyExtension == true
        // })

        return realExtensionObjects
    } else {
        return []
    }
}

const realExtensionCheck = async function (qDoc, objId) {
    let result = false
    let qObjProps = {}

    try {
        let qObj = await qDoc.getObject(objId)

        qObjProps = await qObj.getProperties()

        if (qObjProps.extensionMeta) {
            result = true
        }

    } catch (e) {
        // console.log(`${e.message}`)
    }
    return { qObjProps, result }
}

const extractExtensionObjectsData1 = async function (qDoc) {
    let session = qlikComm.general.createSession()
    let global = await session.open()
    let doc = await qlikComm.doc.open(global, qDoc, true)

    let allInfos = await doc.getAllInfos()
    let extensionObjects = await filterOnlyExtensionObjects(doc, allInfos)
    await session.close()

    return extensionObjects
}

module.exports = {
    extractExtensionObjectsData1,
    filterOnlyExtensionObjects
}