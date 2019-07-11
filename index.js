const qlikComm = require('./functions/qlik-comm.js');
const qlikHelpers = require('./functions/qlik-helpers.js');
const helpers = require('./functions/helpers.js');

(async function () {
    let session = qlikComm.general.createSession()
    let global = await qlikComm.general.global(session)

    let doc = await qlikComm.doc.open(global, "C:\\Users\\Lenovo-Yoga-260\\Documents\\Qlik\\Sense\\Apps\\SkyLine TEST.qvf", true)

    let allInfos = await doc.getAllInfos()
    let extensionObjects = await qlikHelpers.filterOnlyExtensionObjects(doc, allInfos)

    let dataToPrint = helpers.prepareResult(extensionObjects)
    let printData = helpers.printResult(dataToPrint)
    // let a = 1

    await session.close()

})()