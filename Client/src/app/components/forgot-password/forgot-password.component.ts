import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  registrationForm!: FormGroup;
  
  constructor(private authService: AuthService ,private fb: FormBuilder,private router: Router){
   
  }

  ngOnInit(): void {
   this.registrationForm = this.fb.group({
     username: ['', Validators.required]
   });
 }
 
  forgotPassword(){
   this.authService.forgotPassword(this.registrationForm.value.username);
  }

  backToLogin() {
    this.router.navigate(['login']);
  }
}
