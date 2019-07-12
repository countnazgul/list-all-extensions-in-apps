
const qlikComm = require('./functions/qlik-comm.js');
// const qlikHelpers = require('./functions/qlik-helpers.js');
const helpers = require('./functions/helpers.js');



(async function () {
    let session = qlikComm.general.createSession()
    let global = await qlikComm.general.global(session)
    let allQlikDocs = await global.getDocList()
    await session.close()

    console.log('preparing')
    let docPromises = helpers.preparePromises(allQlikDocs)

    console.log('prepared')
    const result = await Promise.all(docPromises);
    let dataToPrint = helpers.prepareResult(result)
    let printData = helpers.printResult(dataToPrint)


    console.log('done')
    // let a = 1;
    process.exit(0)

    // let a = 1



})()

