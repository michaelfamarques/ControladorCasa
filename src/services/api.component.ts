//import { Component } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import CONFIG from '../config.json';

//@Component({})
export class Api {
    constructor(private hotspot: Hotspot, private http: Http) {}

    private getApiUrl():Promise<string>{
        return new Promise((resolve, reject) => {
            this.hotspot.isConnectedToInternet().then((isConnected) => {
                if(!isConnected){
                    reject(new Error("Celular não possui acesso a internet!"));
                }else{
                    this.hotspot.isConnectedToInternetViaWifi().then((isWifi) => {
                        if(!isWifi){
                            resolve(CONFIG.API_EXTERNA);
                        }else{
                            this.hotspot.getConnectionInfo().then((info) => {
                                if(info.SSID == CONFIG.SSID){
                                    resolve(CONFIG.API_INTERNA);
                                }else{
                                    resolve(CONFIG.API_EXTERNA);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    public ligarNotebook():Promise<boolean>{
        return this.getApiUrl().then((url) => {
            url += "ligarNote";
            return this.http.get(url).toPromise()
            .then(response => response.json().data as boolean)
        });
    }

    public desligarNotebook():Promise<boolean>{
        return this.getApiUrl().then((url) => {
            url += "desligarNote";
            return this.http.get(url).toPromise()
            .then(response => response.json().data as boolean)
        });
    }

}