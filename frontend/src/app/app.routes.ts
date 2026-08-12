import { Routes } from '@angular/router';
import {SignIn} from './sign-in/sign-in';
import {SignUp} from './sign-up/sign-up';
import {authGuard} from './guards/auth-guard';
import {Dashboard} from './dashboard/dashboard';
import {deactivateAuthGuard} from './guards/deactivate-auth-guard';

export const routes: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  { path: 'signin', component: SignIn, canActivate: [deactivateAuthGuard] },
  { path: "signup", component: SignUp, canActivate: [deactivateAuthGuard] },
  { path: "dashboard", component: Dashboard, canActivate: [authGuard] },
];
