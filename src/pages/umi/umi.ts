import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
import Chart from 'chart.js'

@IonicPage()
@Component({
  selector: 'page-umi',
  templateUrl: 'umi.html',
})
export class UmiPage {

  @ViewChild("canvas") canvas;
  data = [];
  interval;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewWillUnload() {
    clearInterval(this.interval);

  }

  ionViewDidLoad() {
    this.getData();
    this.interval = setInterval(() => {
      this.getData();
    }, 30 * 1000)
  }
  getData() {
    const query = new Parse.Query('sensor');
    query.limit(5);
    query.descending("createdAt");
    query.equalTo("topico", "umidade");

    query.find().then((data) => {
      console.log(data);
      this.data = data;
      this.generateGraph();
    })
  }

  generateGraph() {
    const ctx = (<HTMLCanvasElement>document.getElementById("canvas")).getContext("2d");

    const data = this.data.map(el => el.get("valor"))
    const labels = this.data.map(el => {
      const date = new Date(el.get("createdAt"))
      return date.getHours() + ":" + date.getMinutes()
    })

    const config = {
      labels: labels,
      datasets: [{
        label: "Umidade",
        data: data,
        borderColor: "#129648",
        fill: false
      }]
    };

    new Chart(ctx, {
      type: 'line',
      data: config,

    });
  }
}
