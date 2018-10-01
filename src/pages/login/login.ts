import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';
import Parse from 'parse';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {

  }

  signUp() {
    Parse.User.signUp(this.username, this.password).then(resp => {
      console.log('Logado com sucesso', resp);

      // Clears up the form
      this.username = '';
      this.password = '';

      this.toastCtrl.create({
        message: 'Conta criada com sucesso',
        duration: 2000
      }).present();
    }, err => {
      console.log('Erro ao logar-se', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }

  signIn() {
    Parse.User.logIn(this.username, this.password).then((resp) => {
      console.log('Logado com sucesso', resp);

      // If you app has Tabs, set root to TabsPage
      this.navCtrl.setRoot(HomePage)
    }, err => {
      console.log('Erro ao logar', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }
  showMsg() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: 'Contate o administrador do sistema',
      buttons: ['OK']
    });
    alert.present();
  }
}

