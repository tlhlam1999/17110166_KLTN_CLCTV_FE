 
import { LoginRoutingModule } from './login.routing.component';
 

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login.component';

@NgModule({
  imports: [LoginRoutingModule, CommonModule, FormsModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
