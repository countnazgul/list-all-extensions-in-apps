const fs = require('fs');
const jsonexport = require('jsonexport')

const config = JSON.parse(fs.readFileSync('./config.json'));

const prepareResult = function (extensionsList) {
    let flatten = extensionsList.reduce((a, b) => a.concat(b), []);
    return flatten
}

const printResult = function (dataToPrint) {
    jsonexport(dataToPrint, function (err, csv) {
        fs.writeFileSync('.\\export.csv', csv)
    })
}

module.exports = {
    config,
    prepareResult,
    printResult
}