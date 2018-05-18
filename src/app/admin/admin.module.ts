import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '@shared';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DummyComponent } from '../dummy/dummy.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    DummyComponent,
  ]
})
export class AdminModule { }
