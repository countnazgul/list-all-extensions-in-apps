
const qlikComm = require('./functions/qlik-comm.js');
const helpers = require('./functions/helpers.js');

(async function () {
    let session = qlikComm.general.createSession()
    let global = await qlikComm.general.global(session)
    let allQlikDocs = await global.getDocList()
    await session.close()

    console.log()
    console.log(`To process: ${allQlikDocs.length} document(s)`)
    console.log()

    let docPromises = helpers.preparePromises(allQlikDocs)

    const result = await Promise.all(docPromises);
    let dataToPrint = helpers.prepareResult(result)
    let printData = helpers.printResult(dataToPrint)


    console.log()
    console.log()
    console.log(`Found and exported ${dataToPrint.length} extension object(s)`)
    console.log()
    process.exit(0)
})()

