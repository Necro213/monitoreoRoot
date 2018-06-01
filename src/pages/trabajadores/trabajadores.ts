import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/**
 * Generated class for the TrabajadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trabajadores',
  templateUrl: 'trabajadores.html',
})
export class TrabajadoresPage {
trabajadores: any =[];
idUsuario: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private http: Http,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
    this.storage.get('id').then((val) => {
      this.http.get('http://monitoreo.monitoreonay.online/gettrabajador/'+val).subscribe(data => {
         // this.trabajadores= data['data'];
         let tr = JSON.parse(data['_body']);
          tr.forEach(element => {
            this.trabajadores.push(element);
          
          });
        
      });
      this.idUsuario=val;
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrabajadoresPage');
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Trabajador',
      inputs: [
        {
          name: 'username',
          placeholder: 'Nombre de Usuario',
          type: 'text'
        },{
          name: 'password',
          placeholder: 'Contraseña',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agregar',
          handler: data => {
            this.http.post('http://monitoreo.monitoreonay.online/addtrabajadores/'+this.idUsuario,{
              params:{
                username: data.username,
                password: data.password
              }
            }
          ).subscribe(data => {
            console.log(data);
           if(data['_body'] == 200){
            this.http.get('http://monitoreo.monitoreonay.online/gettrabajador/'+this.idUsuario).subscribe(data => {
              // this.trabajadores= data['data'];
              let tr = JSON.parse(data['_body']);
              this.trabajadores = [];
               tr.forEach(element => {
                 this.trabajadores.push(element);
               
               });
             });
           }
          });
          }
        }
      ]
    });
    alert.present();
  }

  eliminar(id){
    let alert = this.alertCtrl.create({
      title: 'Atencion!',
      message: 'El usuario se eliminara, desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.http.post('http://monitoreo.monitoreonay.online/delete/'+id,{}).subscribe(data => {
              // this.trabajadores= data['data'];
              if(data['_body'] == 200){
                this.http.get('http://monitoreo.monitoreonay.online/gettrabajador/'+this.idUsuario).subscribe(data => {
                  // this.trabajadores= data['data'];
                  let tr = JSON.parse(data['_body']);
                  this.trabajadores = [];
                   tr.forEach(element => {
                     this.trabajadores.push(element);
                   });
                 });
               }else{
                 this.presentToast("Error al eliminar intentelo mas tarde");
               }
     });
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
