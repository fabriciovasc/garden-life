import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  //Manipulação de dados

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

  //Dados dos sensores

  sensor_temp = [];
  sensor_umi = [];
  sensor_light = [];
  interval;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
//Intervalos de tempo para obter os valores dos sensores no banco de dados

  ionViewDidLoad() {
    this.getDataTemp();
    this.interval = setInterval(() => {
      this.getDataTemp();
    }, 10 * 1000)

    this.getDataUmi();
    this.interval = setInterval(() => {
      this.getDataUmi();
    }, 10 * 1000)

    this.getDataLight();
    this.interval = setInterval(() => {
      this.getDataLight();
    }, 10 * 1000)
  }

//Extrair valores do sensor_temperatura do banco de dados

  getDataTemp() {
    const query = new Parse.Query('sensor');
    query.limit(1);
    query.descending("createdAt");
    query.equalTo("topico", "temperatura");

    query.find().then((message) => {
      console.log(message);
      this.sensor_temp = message[0].get('valor');

    })
  }

//Extrair valores do sensor_umidade do banco de dados

  getDataUmi() {
    const query = new Parse.Query('sensor');
    query.limit(1);
    query.descending("createdAt");
    query.equalTo("topico", "umidade");

    query.find().then((message) => {
      console.log(message);
      this.sensor_umi = message[0].get('valor');
      
    })
  }

//Extrair valores do sensor_luminosidade do banco de dados

  getDataLight() {
    const query = new Parse.Query('sensor');
    query.limit(1);
    query.descending("createdAt");
    query.equalTo("topico", "luminosidade");

    query.find().then((message) => {
      console.log(message);
      this.sensor_light = message[0].get('valor');
      
    })
  }

//Puxar a página de gráficos de cada temperatura

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
