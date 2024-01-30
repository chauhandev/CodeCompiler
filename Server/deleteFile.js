const path = require('path');
const fs = require('fs');

const deleteFile =(filePath)=>{
    const dir = path.dirname(filePath);
    fs.rmdirSync(dir ,{ recursive: true},(err)=>{
        if(err) {
            console.error(err);
        }
    });
}

module.exports = {
    deleteFile
};