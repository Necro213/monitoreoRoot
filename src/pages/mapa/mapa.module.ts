import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { MapaPage } from './mapa';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    IonicPageModule.forChild(MapaPage),
  ],
  providers: [
    GoogleMaps,
    Geolocation,
  ],
})
export class MapaPageModule {}
