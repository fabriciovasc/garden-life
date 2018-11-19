import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";

  pages: Array<{ title: string, component: any }>;

  constructor(public alertCtrl: AlertController, public menuCtrl: MenuController, public app: App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sensores', component: "InfoPage" },
      { title: 'Sobre nós', component: "AboutPage" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //Configurações do servidor do banco de dados
      Parse.initialize("Q68CJmlbatARZBuNm64zHlbQVxPBrXGCv6Wqbloh", "YPKUxtkmZtluu7OETQWzMtsxGtRqENfXcN8EwRqH");
      Parse.serverURL = 'https://parseapi.back4app.com/';

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //Alert for exit to app
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: 'Você desconectou-se do app',
      buttons: ['OK']
    });
    alert.present();
  }

  //Button Logout
  logoutClicked() {
    console.log("Sair");
    this.menuCtrl.close();
    this.nav.setRoot("LoginPage");
  }
}

