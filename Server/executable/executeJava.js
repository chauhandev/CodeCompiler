const {exec} = require('child_process');
const path = require('path');

const executeJavaFile = (filePath)=>{
    const fileName = path.basename(filePath).split('.')[0];
    const outPath = path.dirname(filePath);
    const command = `javac -d "${outPath}" "${filePath}" && java -cp "${outPath}" "${fileName}"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                let errMessage = error.message.replaceAll(error.cmd, "").replaceAll(filePath,`${fileName}.java`);
                reject(errMessage);
                
            }        
            else if (stderr) {
                let errMessage = stderr.replaceAll(filePath,`${fileName}.java`);
                reject(errMessage);
             }
            resolve(stdout);
         });
    });


 };
 module.exports = {
    executeJavaFile
 };