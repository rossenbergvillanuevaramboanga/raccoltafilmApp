import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedDirective } from './directives/is-logged.directive';
import { DecodificaSessoPipe } from './pipes/decodifica-sesso.pipe';
import { IsAdminDirective } from './directives/is-admin.directive';



@NgModule({
  declarations: [
    IsLoggedDirective,
    DecodificaSessoPipe,
    IsAdminDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsLoggedDirective,
    DecodificaSessoPipe,
    IsAdminDirective
  ]
})
export class SharedModule { }
