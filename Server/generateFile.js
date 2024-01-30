const fs = require('fs');
const path = require('path');
const {v4:uuid} = require('uuid');


const codeDirectory = path.join(__dirname, 'Codes');

if(!fs.existsSync(codeDirectory)){
    fs.mkdirSync(codeDirectory,{ recursive:true});
}
const generateFile = (format,content)=>{
const jobId = uuid();
   
   let fileName = `${jobId}.${format}`;
   if(format ==='java'){
    const className = extractClassNameWithMain(content);
    // Output the result
    if (className) {
        fileName = `${className}.${format}`;
    } else {
      return {error : 'No class with main function found.',filePath : ""};
    }
   }
   const folderDir = path.join(codeDirectory,jobId);
   const filePath = path.join(folderDir,fileName);
   if(!fs.existsSync(folderDir)){
        fs.mkdirSync(folderDir,{ recursive:true});
    }
   fs.writeFileSync(filePath, content);
   return  {error : '',filePath : filePath};
};

const extractClassNameWithMain = (javaCode) => {
    // Regular expression to match class with main function
    const regex = /\bclass\s+(\w+)\s*\{[^}]*\bpublic\s+static\s+void\s+main\s*\([^)]*\)\s*\{/;
  
    // Match the regular expression in the Java code
    const match = javaCode.match(regex);  
    // If a match is found, return the class name
    if (match) {
      return match[1];
    } else {
      return null; // No match found
    }
}
module.exports = {
     generateFile,
};