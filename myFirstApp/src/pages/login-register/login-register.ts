import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginResponse, User } from '../../interfaces/pic';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  user: User = { username: null };

  showRegister = false;
  confirmPassword = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    private storage: Storage) {
  }

  swapLoginRegisterForms() {
    this.showRegister = !this.showRegister;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        this.storage.set('token', response.token).
          catch(err => console.log(err));
        this.navCtrl.parent.select(0);
        console.log('The token is: ' + response.token);
      },
      error => {
        console.log(error);
      });

  }
  // TODO: Create alert function that pops up when register form is incorrect

  register() {
    this.navCtrl.push(RegisterPage).catch(err => console.log(err));
    if (this.user.password !== this.confirmPassword) {
      // show alert if the passwords don't match
    }
  }

  // TODO: register method
}
