import { Component } from '@angular/core';
import { Service } from 'src/app/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isDarkMode: boolean = false;
  constructor(public service: Service){

  }
  ngOnInit() {
    this.service.getmode().subscribe(mode=>{
      this.isDarkMode = mode === 'dark' ? true : false;
    })
  }
  toggleMode() {
    this.service.toggleMode();
  }
}
