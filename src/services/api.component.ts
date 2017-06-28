import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import CONFIG from '../config.json';

@Injectable()
export class Api {
    constructor(private network: Network, private http: Http) {}
    private getApiUrl():Promise<string>{
        return new Promise((resolve, reject) => {
            var connType = this.network.type;
            if(connType == "2g" || connType == "3g" || connType == "4g" || connType == "cellular" ){
                resolve(CONFIG.API_EXTERNA);
            }else if(connType == "wifi"){
                this.ping().then((res) => {
                    resolve(CONFIG.API_INTERNA);
                }).catch((err) => {
                    resolve(CONFIG.API_EXTERNA);
                });
            }else{
                reject(new Error("Celular não possui acesso a internet!"));
            }
        });
    }

    private ping():Promise<boolean>{
        var url = CONFIG.API_INTERNA + "ping";
        return this.http.get(url).toPromise()
            .then(response => response.json() as boolean)
    }

    public ligarNotebook():Promise<boolean>{
        return this.getApiUrl().then((url) => {
            url += "ligarNote";
            return this.http.get(url).toPromise()
            .then(response => response.json() as boolean)
        });
    }

    public desligarNotebook():Promise<boolean>{
        return this.getApiUrl().then((url) => {
            url += "desligarNote";
            return this.http.get(url).toPromise()
            .then(response => response.json() as boolean)
        });
    }

}