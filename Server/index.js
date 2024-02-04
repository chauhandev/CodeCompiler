const express = require('express')
const cors = require('cors');
const app = express();
const path = require('path');
const {generateFile} = require('./generateFile');
const { executeJavaFile } = require('./executable/executeJava');
const { deleteFile } = require('./deleteFile');
const { executeJsFile } = require('./executable/executeJS');
const { executeCppFile } = require('./executable/executeCPP');


const PORT = process.env.PORT || 3000
// Use cors middleware
// const corsOptions = {
//     origin: 'http://localhost:4200', // Replace with the actual origin of your Angular app
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   };
  
//   app.use(cors(corsOptions));
  app.use(express.json()); 
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
    res.sendFile(`${path.join(__dirname,'public/index.html')}`);
});
app.use(express.urlencoded({ extended: true }));
app.post('/run', async (req, res) => {
   const {LANGUAGE:language,CODE:code} = req.body;
   if(code === undefined){
     res.status(404).json({success: false,error :"Empty Code Body"});     
   }
    const filePath = generateFile(language,code);
    if(filePath.error ){
      return res.json({error : filePath.error,output : ""});
    }
    let output ={error : "",output:""};
    if(language.toLowerCase()=='java'){
        await executeJavaFile(filePath.filePath).then(result => {
            output.output = result;
        }).catch(err => {
            output.error = err;
        });
    }
    else if(language.toLowerCase()=='js'){
        await executeJsFile(filePath.filePath).then(result => {
            output.output = result;
        }).catch(err => {
            output.error = err;
        });
    }
    else if(language.toLowerCase()=='cpp'){
        await executeCppFile(filePath.filePath).then(result => {
            output.output = result;
        }).catch(err => {
            output.error = err;
        });
    }
    else {
        return res.json({error : "language not supported currently",output : ""});
    }
  
    deleteFile(filePath.filePath);
    return res.json(output);

});

app.listen(PORT, ()=>{
  console.log(`Server started at ${PORT}`);
});


// const http = require('http');

// const hostname = '127.0.0.1';
// const port = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');

//   if(req.url == '/'){
//       res.end('Hello, World!\n');      
//   }
//   else if(req.url == '/test'){
//     res.end('test url!\n');     
//   }
// });

// server.listen(port, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
