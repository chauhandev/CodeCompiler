import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  
     constructor(private authService: AuthService ,private fb: FormBuilder){
      
     }

     ngOnInit(): void {
      this.registrationForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
    
     register(){
      this.authService.register(this.registrationForm.value.username, this.registrationForm.value.password);
     }
}
