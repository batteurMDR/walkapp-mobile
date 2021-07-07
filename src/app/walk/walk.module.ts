import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalkPage } from './walk.page';

import { WalkPageRoutingModule } from './walk-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WalkPageRoutingModule
  ],
  declarations: [WalkPage]
})
export class WalkPageModule {}
