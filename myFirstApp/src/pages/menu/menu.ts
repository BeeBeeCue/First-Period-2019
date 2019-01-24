import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { LogoutPage } from '../logout/logout';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';

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
      <ion-tab [root]="tab1Root" tabIcon="home" tabTitle="Home"></ion-tab>
      <ion-tab [show]="!mediaProvider.loggedIn" [root]="tab2Root" tabIcon="log-in"
               tabTitle="Login"></ion-tab>
      <ion-tab [show]="mediaProvider.loggedIn" [root]="tab3Root" tabIcon="log-out" tabTitle="Logout" (onclick)="logout()"></ion-tab>
    </ion-tabs>`,
})
export class MenuPage {
  tab1Root = HomePage;
  tab2Root = LoginRegisterPage;
  tab3Root = LogoutPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


}
