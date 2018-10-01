import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LightPage } from './light';

@NgModule({
  declarations: [
    LightPage,
  ],
  imports: [
    IonicPageModule.forChild(LightPage),
  ],
})
export class LightPageModule {}
