const path = require('path')
const fs = require('fs')
const csvToJson = require ('csvtojson')
const csvFile = './customer-data.csv'

const readFile = () => {
    console.log('starting parse');
    var json;
    csvToJson().fromFile(csvFile)
        .on('error', (err)=>{
            console.log(err)
        })
        .on('data', (data) => {
            json += data.toString('utf8')
        })
        .on('done', () => {
            console.log(json);
            fs.writeFile('customer-data.json', JSON.stringify(json), function(err) {
                console.log(err);
            })
        })
}

readFile();

/*
    Using the csvtojson module made the parsing very straightforward, way easier than
    coding the conversion myself.
    Initially I used the .fromFile).then() syntax but that didn't alow for easy error handling so I switched to using the .on
    style.
    Tested against file not found errors and unable to write the JSON file.
    I could have also allowed for passing in a file name rather than declaring it statically.
*/

