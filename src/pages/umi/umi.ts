import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-umi',
  templateUrl: 'umi.html',
})
export class UmiPage {

  sensores: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UmiPage');
  }


}
