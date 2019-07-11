const helpers = require('./helpers.js');

const filterOnlyExtensionObjects = async function (qDoc, allObjects) {
    let possibleExtensionObjects = allObjects.filter(function (o) {
        return helpers.config.nonExtensionObjects.indexOf(o.qType) == -1
    })

    let realExtensionObjects = []
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
}

const realExtensionCheck = async function (qDoc, objId) {
    let qObj = await qDoc.getObject(objId)
    let result = false
    let qObjProps = {}
    try {
        qObjProps = await qObj.getProperties()

        if (qObjProps.extensionMeta) {
            result = true
        }

    } catch (e) {
        console.log(e.message)
    }
    return { qObjProps, result }
}

module.exports = {
    filterOnlyExtensionObjects
}