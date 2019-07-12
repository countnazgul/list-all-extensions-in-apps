const fs = require('fs');
const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');

const config = JSON.parse(fs.readFileSync('./config.json'));

function createSession() {
    const session = enigma.create({
        schema,
        url: `ws://${config.qlik.host}:${config.qlik.port}/app/engineData/identity/${+new Date()}`,
        createSocket: url => new WebSocket(url),
    });

    return session
}

const general = {
    createSession: function () {
        const session = enigma.create({
            schema,
            url: `ws://${config.qlik.host}:${config.qlik.port}/app/engineData`,
            createSocket: url => new WebSocket(url),
        });

        return session
    },
    global: async function (session) {
        return await session.open()
    }
}

const doc = {
    getAll: async function (global) {
        return await global.getDocList()
    },
    open: async function (global, qDoc, noData) {
        return await global.openDoc(qDoc.qDocId, null, null, null, noData)
    },

}

const qObj = {
    getExtensionDetails: async function (obj) {

        let qObjProps = await obj.getProperties()
        return qObjProps
    }
}

module.exports = {
    general: general,
    doc: doc,
    qObj: qObj,
    createSession: createSession
}