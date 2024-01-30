const {exec} = require('child_process');
const path = require('path');

const executeJsFile = (filePath)=>{
    const fileName = path.basename(filePath);
    const command = `node "${filePath}" `;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                let errMessage = error.message.replaceAll(error.cmd, "").replaceAll(filePath,fileName);
                reject(errMessage);
                
            }        
            else if (stderr) {
                let errMessage = stderr.replaceAll(filePath,fileName);
                reject(errMessage);
             }
            resolve(stdout);
         });
    });


 };
 module.exports = {
    executeJsFile
 };