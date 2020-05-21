import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditemPageRoutingModule } from './additem-routing.module';

import { AdditemPage } from './additem.page';

import { HttpClientModule } from '@angular/common/http';

import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditemPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    Camera
  ],
  declarations: [AdditemPage]
})
export class AdditemPageModule {}
