import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {
  languages: any[] = [
    { displayName: 'C++', value: 'cpp' },
    { displayName: 'Java',value: 'java' },
    { displayName: 'JavaScript',value: 'js' },
    { displayName: 'Html' ,value: 'html'},
  ];
  // languages: any[] = [
  //   { name: 'C++' }
  // ];
  tabChanged(event: MatTabChangeEvent){
    console.log("tabChanged",event);
  }
}
