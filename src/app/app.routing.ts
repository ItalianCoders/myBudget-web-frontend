import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'movements', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'scheduled-movements', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'new-account', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'edit-account', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'invite-users-account', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'budgets', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
