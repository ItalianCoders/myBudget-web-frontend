import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from './material.modules';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    ...MATERIAL_MODULES,
  ],
})
export class SharedModule {}
