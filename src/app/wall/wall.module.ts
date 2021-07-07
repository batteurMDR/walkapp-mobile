import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WallPage } from './wall.page';

import { WallPageRoutingModule } from './wall-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: WallPage }]),
    WallPageRoutingModule,
  ],
  declarations: [WallPage]
})
export class WallPageModule {}
