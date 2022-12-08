// https://nodejs.org/docs/v0.4.0/api/fs.html#fs.createWriteStream

//open and close file after write

var fs = require('fs');

function write_file(filename, callback){
const file = fs.createWriteStream(filename);
file.on('error', function (e) {
    console.error('error',e)
});
callback(file);
}

module.exports = {write_file}



// write_file("antanyoms", function (file) {
 
//     let keys = Object.keys(words);
//     let values = Object.values(words)
//     let m = keys.length;

//     console.log('mmm--', values)
//     while (m--) {
//         file.write(`\n ${keys[m]}:`);
//         let i = values[m].length;

//         while (i--) {
//             file.write(`${values[m][i]},`)

//         }

//         file.write(' \n');

//     }
//     file.close();
// })

