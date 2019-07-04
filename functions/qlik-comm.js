const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');

const helpers = require('./helpers.js')

const general = {
    createSession: function () {
        const session = enigma.create({
            schema,
            url: `ws://${helpers.config.qlik.host}:${helpers.config.qlik.port}/app/engineData`,
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
    open: async function (global, id, noData) {
        return await global.openDoc(id, null, null, null, noData)
    },
    
}

module.exports = {
    general,
    doc
}