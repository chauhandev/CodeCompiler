import { Component } from '@angular/core';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dev++';
  theme = 'lightMode'
  constructor(private service: Service){
    // this.theme = service.getmode() =='light' ? 'lightMode' :'darkMode';
  }
  ngOnInit() {
   this.service.getmode().subscribe(theme => {
      this.theme = theme =='light' ? 'lightMode' :'darkMode';
    }) ;
  }

}
