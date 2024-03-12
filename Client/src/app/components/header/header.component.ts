import { Component } from '@angular/core';
import { Service } from 'src/app/service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  isDarkMode: boolean = false;
  constructor(public service: Service,private authService: AuthService){

  }
  ngOnInit() {
    this.service.getmode().subscribe(mode=>{
      this.isDarkMode = mode === 'dark' ? true : false;
    })
  }
  toggleMode() {
    this.service.toggleMode();
  }

  logout() {
    this.authService.logout();
  }
  
}
