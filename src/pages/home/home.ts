import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: any;
  password: any;
  constructor(public navCtrl: NavController,
    private http: Http,
    private storage: Storage,
    private viewCtrl: ViewController
  ) {
    this.storage.get('id').then((val) => {
      if(val != null){
        this.navCtrl.push('MapaPage');
        viewCtrl.dismiss();
      }
    });
  }

  doLogin(){
      this.http.post("http://monitoreo.monitoreonay.online/logint",{
        params:{
          username: this.username,
          password: this.password
        }
      }).subscribe(res => {
        let code = res['_body'];
        if(code == 300){
          alert("Usuario o Contraseña Incorrecta");
          return;
        }
        if(code == 500){
          alert("Error en el servidor");
          return;
        }
        this.storage.set("id",code);
        this.navCtrl.push('MapaPage');
      });
  }
  abrir(){
    this.navCtrl.push("MapaPage");
  }

}
