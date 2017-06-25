import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../services/api.component';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(public navCtrl: NavController, private api:Api, public alertCtrl: AlertController, public toastCtrl: ToastController) {}
    comando(comando:string): void{
        this.api[comando]().then((res) => {
            let msgToast;
            if(res){
                msgToast = "Comando ["+comando+"] executado com sucesso!";
            }else{
                msgToast = "Comando ["+comando+"] não executado!";
            }
            let toast = this.toastCtrl.create({
                message: msgToast,
                duration: 5000
            });
            toast.present();
        }).catch((err) => {            
            let alert = this.alertCtrl.create({
              title: 'Erro!',
              subTitle: err.message,
              buttons: ['OK']
            });
            alert.present();
        });
    }
}