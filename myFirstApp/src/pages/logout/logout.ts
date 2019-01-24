import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';
import { selector } from 'rxjs/operator/publish';
import { RegisterPage } from '../register/register';
import { LoginRegisterPage } from '../login-register/login-register';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.logout();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LogoutPage');
  }

  logout() {
    this.navCtrl.push(LoginRegisterPage).catch(err => console.log(err));
    this.mediaProvider.loggedIn = false;
    console.log(this.mediaProvider.loggedIn);
    this.storage.clear().catch(err => console.log(err));
    console.log(this.storage);

  }

}
