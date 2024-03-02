const {exec} = require('child_process');
const path = require('path');

const executeCppFile = (filePath) => {
    const fileName = path.basename(filePath).split('.')[0];
    const outPath = path.dirname(filePath);
    const compiledFileName = `${outPath}/${fileName}`;

    const command = `g++ -o "${compiledFileName}" "${filePath}" && ./${compiledFileName}`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                let errMessage = error.message.replace(error.cmd, "").replace(filePath, `${fileName}.cpp`);
                reject(errMessage);
            } else if (stderr) {
                let errMessage = stderr.replace(error.cmd, "").replace(filePath, `${fileName}.cpp`);
                reject(errMessage);
            } else {
                resolve(stdout);
            }
        });
    });
};


 module.exports = {
    executeCppFile
 };