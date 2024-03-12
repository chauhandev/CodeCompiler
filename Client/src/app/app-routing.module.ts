import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompilerDashboardComponent } from './components/compiler-dashboard/compiler-dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent , canActivate:[AuthGuardService]},
  {path: 'register', component: RegisterComponent , canActivate:[AuthGuardService]},
  {path: 'dashboard', component: CompilerDashboardComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent , canActivate:[AuthGuardService]},
  {path: 'verify-email', component: VerifyEmailComponent,  canActivate:[AuthGuardService]},
  {path: '**', component: LoginComponent,  canActivate:[AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
