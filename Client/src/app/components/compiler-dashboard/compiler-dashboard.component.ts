import { Component } from '@angular/core';
import { Service } from 'src/app/service';

@Component({
  selector: 'app-compiler-dashboard',
  templateUrl: './compiler-dashboard.component.html',
  styleUrls: ['./compiler-dashboard.component.css']
})
export class CompilerDashboardComponent {
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
