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

  //Test
  max: number = 100;
  stroke: number = 10;
  radius: number = 70;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color_temp: string = '#ffcc00';
  background_temp: string = '#e5e3e3';
  color_umi: string = '#129648';
  background_umi: string = '#e5e3e3';
  color_light: string = '#488aff';
  background_light: string = '#d6d4d4';
  duration: number = 900;
  animation: string = 'easeInCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  rate: number;

  message: string = "";
  topic: string = ""; //Linha comentada, pois o tópico será lido direto do broker
  author: string = "app : ";
  publishM: string = "";
  sensor_temp = 30;
  sensor_umi = 40;
  sensor_light = 10;
  

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
      this.sensor_light = [];
      this.message = message.payload.toString();
      this.sensor_light.push(this.message);

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
