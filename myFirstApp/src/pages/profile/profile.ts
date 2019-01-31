import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';
import { selector } from 'rxjs/operator/publish';
import { RegisterPage } from '../register/register';
import { LoginRegisterPage } from '../login-register/login-register';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.profile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  profile() {
    this.navCtrl.push(LoginRegisterPage).catch(err => console.log(err));
    this.mediaProvider.loggedIn = false;
    console.log(this.mediaProvider.loggedIn);
    this.storage.clear().catch(err => console.log(err));
    console.log(this.storage);
  }

  logout() {
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.navCtrl.parent.select(0);
  }
}
