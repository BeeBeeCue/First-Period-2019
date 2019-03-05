import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';
import { User } from '../../interfaces/media';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  template: `
    <ion-tabs [selectedIndex]="1">
      <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [show]="!mediaProvider.loggedIn" [root]="tab2Root"
               tabTitle="Login" tabIcon="log-in"></ion-tab>
      <ion-tab [show]="mediaProvider.loggedIn" [root]="tab3Root"
               tabTitle="Profile" tabIcon="person"></ion-tab>
    </ion-tabs>`,
})
export class MenuPage {

  constructor(
    public mediaProvider: MediaProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.checkToken().subscribe((user: User) => {
        this.mediaProvider.user = user;
        this.mediaProvider.loggedIn = true;
      });
    }
  }

  tab1Root = HomePage;
  tab2Root = LoginRegisterPage;
  tab3Root = ProfilePage;

}
