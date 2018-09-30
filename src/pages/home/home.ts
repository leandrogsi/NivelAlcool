import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Alcool} from '../../model/alcool';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alcool : Alcool = new Alcool();
  ref = firebase.database().ref("alcool/");
  alcools = [];
  constructor(public navCtrl: NavController) {
       this.ref.on('value',resp => {
         this.alcools = [];
         this.alcools = snapshotToArray(resp);
       });
  }
  converterNumber(numero): number {
    return parseFloat(numero);
}
cadastrarAlcool() {
  let novoAlcool = this.ref.push();

  if (this.sexo == 'M') {
      var  resultado = (this.alcool.quantidade / this.alcool.peso) * 0.7;
  }else {
  var  resultado = (this.alcool.quantidade / this.alcool.peso) * 0.6;
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
