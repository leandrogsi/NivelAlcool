import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Alcool} from '../../model/alcool';
import * as firebase from 'firebase';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alcool : Alcool = new Alcool();
  ref = firebase.database().ref("alcool/");
  alcools = [];
  constructor(public navCtrl: NavController,private admobFree: AdMobFree) {
    this.ref.on('value',resp => {
      this.alcools = [];
      this.alcools = snapshotToArray(resp);
      this.mostrarPublicidadeBanner();
    });
  }
  mostrarPublicidadeBanner(){
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-4591485773487921/1772305655',
      isTesting: false,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
    .then(() => {
      // banner Ad is ready
      // if we set autoShow to false, then we will need to call the show method here
    })
    .catch(e => console.log(e));
  }
  converterNumber(numero): number {
    return parseFloat(numero);
  }
  cadastrarAlcool() {
    let novoAlcool = this.ref.push();
    var resultado = 0;
    if (this.alcool.sexo == 'M') {
        resultado = (this.alcool.quantidade / this.alcool.peso) * 0.7;
    }else {
        resultado = (this.alcool.quantidade / this.alcool.peso) * 0.6;
    }
    this.alcool.resultado = resultado;
    novoAlcool.set(this.alcool);
  }
}
export const snapshotToArray = snapshot => {
  var returnArr = [];
  snapshot.forEach(childSnapshot => {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};
