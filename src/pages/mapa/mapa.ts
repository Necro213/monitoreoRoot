import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TrabajadoresPage } from '../trabajadores/trabajadores';
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  @ViewChild("map") mapRef: ElementRef;
 
  mapa: any;
  gps: any;
  markers: any =[];
  id: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    private http: Http,
    private storage: Storage) {

      this.storage.get('id').then((val) => {
          this.id=val;
      });

     this.loadTrabajadores();
      setInterval(() => {
        this.loadTrabajadores()
      },3000);
      //this.loadTrabajadores();
  }

  ionViewDidLoad() {
      this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.showMap(position.coords.latitude,position.coords.longitude);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
  showMap(lat,lng){
    let map: any;
    let panelEle: HTMLElement = document.getElementById('panel');
    const location = new google.maps.LatLng(lat,lng);
    let mapStyle: any = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ];
    const options = {
      center: location,
      zoom: 11,
      styles: mapStyle
    }

    map = new google.maps.Map(this.mapRef.nativeElement, options);

   /* this.addMarker(location,map,"Mi ubicacion");

    map.addListener("click",(e)=>{
              this.addMarker(e.latLng,map,"desde click");
    });*/
   
    //this.directionsDisplay.setMap(map);
    //this.directionsDisplay.setPanel(panelEle);

    this.mapa = map;
    this.gps = location;
    //this.calcuateRoute(location,map);
    google.maps.event.addListenerOnce(map, "idle", () => {
      
    });
   
  }

  addMarker(pos,map,titulo){
    let marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: titulo,
    });

    this.markers.push(marker);
  }

  clear(){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  loadTrabajadores(){
    this.http.get('http://monitoreo.monitoreonay.online/gettrabajadores/'+this.id).subscribe(item =>{
          let res = JSON.parse(item['_body'])
          res.forEach(element => {
            this.clear();
            const location = new google.maps.LatLng(element['lat'],element['lng']);
            this.addMarker(location,this.mapa,element['username']);
          });
      });
  }

  trabajadores(){
    this.navCtrl.push('TrabajadoresPage');
  }

}
