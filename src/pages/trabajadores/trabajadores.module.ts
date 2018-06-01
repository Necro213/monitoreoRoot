import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrabajadoresPage } from './trabajadores';

@NgModule({
  declarations: [
    TrabajadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(TrabajadoresPage),
  ],
})
export class TrabajadoresPageModule {}
