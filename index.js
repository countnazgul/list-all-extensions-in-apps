const qlikComm = require('./functions/qlik-comm.js');
const qlikHelpers = require('./functions/qlik-helpers.js');
const helpers = require('./functions/helpers.js');

(async function () {
    let session = qlikComm.general.createSession()
    let global = await qlikComm.general.global(session)

    let docs = await qlikComm.doc.getAll(global);
    let doc = await qlikComm.doc.open(global, "C:\\Users\\Home\\Documents\\Qlik\\Sense\\Apps\\Consumer Sales.qvf", true)

    let allInfos = await doc.getAllInfos()
    let extensionObjects = await qlikHelpers.filterOnlyExtensionObjects(doc, allInfos)
    let a = 1

    await session.close()

})()