import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WindEffectGeneratorPage } from './wind-effect-generator';

@NgModule({
  declarations: [
    WindEffectGeneratorPage,
  ],
  imports: [
    IonicPageModule.forChild(WindEffectGeneratorPage),
  ],
})
export class WindEffectGeneratorPageModule {}
