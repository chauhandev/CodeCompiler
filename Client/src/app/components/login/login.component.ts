import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {


  loginForm!: FormGroup ;
  
  constructor(private fb: FormBuilder,private authService: AuthService , private router: Router) {
    
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
