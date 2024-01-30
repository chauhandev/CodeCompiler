import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Service } from '../../service';
import { ApiServiceResponse } from '../../Model/ApiServiceResponse';
import * as ace from 'ace-builds'; 
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-github_dark';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild('editorHTML') editorHTML!: ElementRef;
  @ViewChild('editorCSS') editorCSS!: ElementRef;
  @ViewChild('editorJS') editorJS!: ElementRef;
  @ViewChild('editorJava') editorJava!: ElementRef;
  @ViewChild('editorCpp') editorCpp!: ElementRef;
  @ViewChild('editorJavaScript') editorJavaScript!: ElementRef;  


  @Input() language: string | undefined;
 
  isResizing : boolean = false;
  initialX : number = 0;
  initialY: number = 0;

  initialEditorWidth: number =0;
  initialEditorHeight: number =0;
  MediaQuery : number = 768;
  theme : string ='ace/theme/github';
  
  editorOptions = {
    theme: 'ace/theme/github',
    fontSize: 14,
    showPrintMargin: false,
    setUseWrapMode: false,
    gutterStyle: 'background-color: #f0f0f0',
    backgroundColor: 'red',
    hScrollBarAlwaysVisible: false,
    wrap: true
  };  
  constructor(private Service: Service){
    Service.getmode().subscribe( mode =>{
    
      if (this.language?.toLowerCase() === 'html') {
        const editorHTMLInstance = ace.edit(this.editorHTML.nativeElement);
        const editorCSSInstance = ace.edit(this.editorCSS.nativeElement);
        const editorJSInstance = ace.edit(this.editorJS.nativeElement);
        this.updateTheme(mode,editorHTMLInstance);
        this.updateTheme(mode,editorCSSInstance);
        this.updateTheme(mode,editorJSInstance);
      } else if (this.language?.toLowerCase() === 'java') {
        const editorJavaInstance = ace.edit(this.editorJava.nativeElement);
        this.updateTheme(mode,editorJavaInstance);
      } else if (this.language?.toLowerCase() === 'cpp') {
        const editorCppInstance = ace.edit(this.editorCpp.nativeElement);
        this.updateTheme(mode,editorCppInstance);
      } else if (this.language?.toLowerCase() === 'js') {
        const editorJavaScriptInstance = ace.edit(this.editorJavaScript.nativeElement);
        this.updateTheme(mode,editorJavaScriptInstance);
       }   
      
    });

  }  
  updateTheme(mode: string, editor: ace.Ace.Editor) {
    const theme = mode=='light' ? 'ace/theme/github' : 'ace/theme/github_dark';
    const background = mode=='light' ? '#ffffff' : '#1c2130';
    editor.setTheme(theme);
    editor.container.style.background = background;
    if(mode==='light'){
      editor.container.classList.remove('darkMode');
      editor.container.classList.add('lightMode');
      
    }
     else{
      editor.container.classList.remove('lightMode');
       editor.container.classList.add('darkMode');

     }

  }
  ngAfterViewInit(): void {
       this.createEditor();
   }
  
  createEditor() {
    if (this.language?.toLowerCase() === 'html') {
      this.initializeEditor(this.editorHTML, 'ace/mode/html', `<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8">\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t\t<title>HTML 5 Boilerplate</title>\n\t\t<link rel="stylesheet" href="style.css">\n\t</head>\n\t<body>\n\t\t<script src="index.js"></script>\n\t</body>\n</html>`);
      this.initializeEditor(this.editorCSS, 'ace/mode/css', 'body {\n\tmargin: 20px;\n}');
      this.initializeEditor(this.editorJS, 'ace/mode/javascript', 'console.log("from script file");');
    } else if (this.language?.toLowerCase() === 'java') {
      this.initializeEditor(this.editorJava, 'ace/mode/java', 'class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}');
    } else if (this.language?.toLowerCase() === 'cpp') {
      this.initializeEditor(this.editorCpp, 'ace/mode/c_cpp', '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\n\treturn 0;\n}');
    } else if (this.language?.toLowerCase() === 'js') {
      this.initializeEditor(this.editorJavaScript, 'ace/mode/javascript', 'console.log("Welcome to Dev++");');
    }
  }
  
  private initializeEditor(editorRef: ElementRef, mode: string, content: string) {
    const editorInstance = ace.edit(editorRef.nativeElement, this.editorOptions);
    editorInstance.getSession().setMode(mode);
    editorInstance.getSession().setValue(content);
  }

  getOutput(){
    const editorOptions = {
      theme: 'ace/theme/monokai',
      fontSize: 14,
      showPrintMargin: false,
    };
    const output = document.getElementById('htmlOutput');

    if(this.language?.toLowerCase()=="html"){
      const editorHTMLInstance = ace.edit(this.editorHTML.nativeElement, editorOptions);
      const existingHtml= editorHTMLInstance.getSession().getValue();

      const editorCSSInstance = ace.edit(this.editorCSS.nativeElement, editorOptions);
      const existingCss= editorCSSInstance.getSession().getValue();


      const editorJSInstance = ace.edit(this.editorJS.nativeElement, editorOptions);
      const existingJS= editorJSInstance.getSession().getValue();

         // Modify the existing HTML string by adding CSS and JS
      var modifiedHtml = existingHtml.replace(
          /(<head>.*<\/head>)/s,
          `$1\n<style>${existingCss}</style>\n<script>${existingJS}</script>`
      );

        var iframe = document.createElement('iframe');

        // Set the srcdoc attribute with the modified HTML content
        iframe.srcdoc = modifiedHtml;
        iframe.height = '100%';
        iframe.width = '100%';
        // Set other attributes if needed
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.frameBorder= "none";
        // Append the iframe to the document body
        if(output){
          const previousFrame = output.getElementsByTagName("iframe")[0]; 
          if(previousFrame) 
              output.removeChild(previousFrame);
          output.appendChild(iframe)
        }
    }
    else if(this.language?.toLowerCase()=="java"){
      const editorJavaInstance = ace.edit(this.editorJava.nativeElement, editorOptions);
      this.runCode(this.language.toLowerCase(),editorJavaInstance.getSession().getValue());      
    }
    else if(this.language?.toLowerCase()=="cpp"){
      const editorCppInstance = ace.edit(this.editorCpp.nativeElement, editorOptions);
      this.runCode(this.language.toLowerCase(),editorCppInstance.getSession().getValue());      
    }
    else if(this.language?.toLowerCase()=="js"){
      const editorJavaScriptInstance = ace.edit(this.editorJavaScript.nativeElement, editorOptions);
      this.runCode(this.language.toLowerCase(),editorJavaScriptInstance.getSession().getValue());      
    }
  }

  runCode(language: string, content: string) {
    try {
      this.Service.run({LANGUAGE:language.toLowerCase(),CODE: content}).subscribe(
        (response: ApiServiceResponse) => {
          // Handle successful response
          const outputDiv = document.getElementById('otherOutput');
          if(outputDiv){
            if(response.error){
              const outputString = response.error;
              outputDiv.innerHTML = outputString;

            }
            else{
              const outputString = response.output;
              outputDiv.innerHTML = outputString;
            }
          }
          console.log(response);

        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  resize(event:any){
    this.isResizing = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
    
     const editor = document.getElementById('editorDiv');
    if (editor) {
      this.initialEditorWidth = editor.clientWidth;
      this.initialEditorHeight = editor.clientHeight;
    }
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);

   
  }
   handleMouseMove(event:any){
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerWidth;
     if (this.isResizing) {
      const editor = document.getElementById('editorDiv');
      if (editor) {
       
        if(screenWidth > this.MediaQuery){
          const deltaX = event.clientX - this.initialX;
          const newDiv1Width = this.initialEditorWidth + deltaX;
          editor.style.width = `${newDiv1Width}px`;
          editor.style.height = `100%`;

        }
        else{
          const deltaY = event.clientY - this.initialY;
          let newDivHeight = this.initialEditorHeight + deltaY;
          editor.style.height = `${newDivHeight}px`;
          editor.style.width = `100%`;

        }
       
      }
    }
  }
   handleMouseUp(event:any){
    this.isResizing = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
}
