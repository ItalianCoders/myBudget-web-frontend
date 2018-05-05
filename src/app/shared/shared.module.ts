import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from './material.modules';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
})
export class SharedModule {}
