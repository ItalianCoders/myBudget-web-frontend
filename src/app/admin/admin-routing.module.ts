import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DummyComponent } from '../dummy/dummy.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movements', component: DummyComponent },
  { path: 'scheduled-movements', component: DummyComponent },
  { path: 'new-account', component: DummyComponent },
  { path: 'edit-account', component: DummyComponent },
  { path: 'invite-users-account', component: DummyComponent },
  { path: 'budgets', component: DummyComponent },
  { path: 'settings', component: DummyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
