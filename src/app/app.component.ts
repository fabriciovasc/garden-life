import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, AlertController, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Parse from 'parse';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  toastInstance: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public alertCtrl: AlertController, public menuCtrl: MenuController, public app: App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    //Network
    public events: Events,
    private toastCtrl: ToastController,
    public network: Network,
    private networkProvider: NetworkProvider
    ) {

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

      //Network status
      this.networkProvider.initializeNetworkEvents();

      //Off
      this.events.subscribe('network:off', () => {
        this.presentToast('Falha na conexão. Conecte-se novamente.')
        localStorage.setItem('network', '0');
      });

      //On
      this.events.subscribe('network:on', () => {
        localStorage.setItem('network', '1');
        this.toastDismisser();
        this.presentToast('Conexão estabelecida.')
          setTimeout(() => {
            this.toastDismisser();
          }, 3000);
      });



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

  presentToast(msg){
    this.toastInstance = this.toastCtrl.create({
      message: msg,
      position: 'buttom'
    });

    this.toastInstance.present();
  }

  toastDismisser() {
    this.toastInstance.dismiss();
  }
}

