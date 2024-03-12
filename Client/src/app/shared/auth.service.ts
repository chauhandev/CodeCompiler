import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private fireAuth : AngularFireAuth , private router : Router)  { }
   
  /* The `login` method in the AuthService class is responsible for authenticating a user by signing in
  with the provided email and password using AngularFireAuth. If the sign-in is successful, it sets
  a token in the local storage, navigates the user to the dashboard page. If there is an error
  during the sign-in process, it displays an alert message and navigates the user back to the login
  page. */
  login(email : string, password : string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then((res:any) => {
      localStorage.setItem('token', res.user.uid);
      if(res.user?.emailVerified){
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/verify-email']);
      }
    }, err => {
      alert("Something went wrong");
      this.router.navigate(['/login']);
    });
  }

  /**
   * The function `register` creates a new user account with the provided email and password,
   * displaying success or error messages accordingly.
   * @param {string} email - The `email` parameter in the `register` function is a string that
   * represents the email address of the user who is registering for an account.
   * @param {string} password - The `password` parameter in the `register` function is a string that
   * represents the password entered by the user during the registration process. It is used to create
   * a new user account with the provided email and password using the `createUserWithEmailAndPassword`
   * method from the `fireAuth` service.
   */
  register(email : string, password : string){
    this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then( (res) => {
      alert("Registration successful");
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }
    ,err =>{
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  /**
   * The `logout` function signs out the user, removes the token from local storage, and navigates to
   * the login page, displaying an alert if there is an error.
   */
  logout(){
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
     },
     err=> {
      alert(err.message);
     });
  }

  //forgotPassword
  forgotPassword(email:string){
    this.fireAuth.sendPasswordResetEmail(email).then( () => {
    this.router.navigate(['/verify-email']);
  },err=>{
    alert("Something went wrong");
  });
 }

 sendEmailForVerification(user :any){
    user.sendEmailVerification().then( (res:any) => {
      this.router.navigate(['/verify-email']);
    }, (err :any) => {
      alert("Something went wrong");
    });
 }

 signInWithGoogle(){
  return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then( res =>{
    this.router.navigate(['/dashboard']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));
  }, err =>{
    alert(err.message);
  })
 }

 isLoggedIn(): boolean {
  // Implement your logic to check if user is logged in
  // For example, you can check if there's a valid token in localStorage
  return !!localStorage.getItem('token');
}

}
