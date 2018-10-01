import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  message: string = "";
  topic: string = ""; //Linha comentada, pois o tópico será lido direto do broker
  author: string = "app : ";
  publishM: string = "";
  sensor_temp = [];
  sensor_umi = [];
  sensor_lumi = [];
  

  private subs: Subscription;
  clear: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mqttService: MqttService) {
    console.log(this.mqttService);

    //MQTT Subscribe for temperatura
    this.subs = this.mqttService.observe('home/temperatura').subscribe((message: IMqttMessage) => {
      console.log(message);
      this.sensor_temp = [];
      this.message = message.payload.toString();
      this.sensor_temp.push(this.message);

    });

    //MQTT Subscribe for umidade
    this.subs = this.mqttService.observe('home/umidade').subscribe((message: IMqttMessage) => {
      console.log(message);
      this.sensor_umi = [];
      this.message = message.payload.toString();
      this.sensor_umi.push(this.message);

    });

    //MQTT Subscribe for luminosidade
    this.subs = this.mqttService.observe('home/luminosidade').subscribe((message: IMqttMessage) => {
      console.log(message);
      this.sensor_lumi = [];
      this.message = message.payload.toString();
      this.sensor_lumi.push(this.message);

    });

  }

  public unsubscribe() {
    console.log("unsubscribe");
    this.subs.unsubscribe();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

  temp() {
    this.navCtrl.push("TempPage");
  }
  umi() {
    this.navCtrl.push("UmiPage");
  }
  light() {
    this.navCtrl.push("LightPage");
  }
}
