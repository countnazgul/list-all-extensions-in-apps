const helpers = require('./helpers.js');

const filterOnlyExtensionObjects = async function (qDoc, allObjects) {
    let possibleExtensionObjects = allObjects.filter(function (o) {
        return helpers.config.nonExtensionObjects.indexOf(o.qType) == -1
    })

    let realExtensionObjects = possibleExtensionObjects.filter(async function (extObj) {
        let isReallyExtension = await realExtensionCheck(qDoc, extObj.qId)
        return isReallyExtension == true
    })

    return realExtensionObjects
}

const realExtensionCheck = async function (qDoc, objId) {
    let qObj = await qDoc.getObject(objId)
    let qObjProps = await qObj.getProperties()

    let result = false
    if (qObjProps.extensionMeta) {
        result = true
    }

    return result
}

module.exports = {
    filterOnlyExtensionObjects
}