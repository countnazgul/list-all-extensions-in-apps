> At the moment the app will only work with QS Desktop or Qlik Core

## Description

This small app will loop through all QS applications and:

  * open each app with `NoData`
  * get info for all app objects
  * filter only the extensions objects
  * store the list into a `csv` file

## Usage

* Download and unzip this repo
* Edit `qlik` section in `config.json` (if needed)
* Open CMD or PowerShell
* Navigate to the folder where the app is
* Run `npm install` 
* Wait for the required modules to be installed
* run `node index.js`

After the process is finished check the output in `export.csv`

## Exported fields

* appName - QS application name
* extName - Extension name
* extVisible - is the extension object visible or not
* extIsBundle - is the extension object part of the Qlik Bundle
* extIsLibrary - is the extension object a library

## TO-DO and Future

* Some more testing need to be performed (automated?)

* Only Desktop and Core are supported at the moment. QS Server is good to be supported but might be better instead of standalone app this to be converted to Enigma Mixins and to be used within Enigma itself. 