import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarPage } from './avatar.page';

import { AvatarPageRoutingModule } from './avatar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvatarPageRoutingModule
  ],
  declarations: [AvatarPage]
})
export class AvatarPageModule {}
