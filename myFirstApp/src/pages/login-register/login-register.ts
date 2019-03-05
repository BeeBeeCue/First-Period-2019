import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginResponse } from '../../interfaces/media';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { NgForm } from '@angular/forms';
import { User } from '../../interfaces/media';
import { MenuPage } from '../menu/menu';

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

  userAlert = false;

  @ViewChild('lf') loginForm: NgForm;
  @ViewChild('rf') registerForm: NgForm;

  user: User = { username: null };

  showRegister = false;
  confirmPassword = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    private storage: Storage,
    public alertCtrl: AlertController) {
  }

  swapLoginRegisterForms() {
    this.showRegister = !this.showRegister;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  showAlert(message: string): void {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK'],
    });
    alert.present().catch();
  }

  login(automatic = false): void {
    console.log('logging in:', this.user.username);
    this.mediaProvider.login(this.user).subscribe((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.mediaProvider.token = data.token;
      this.mediaProvider.user = data.user;
      this.mediaProvider.loggedIn = true;
      this.navCtrl.setRoot(MenuPage);
      // Reset form only if it exists
      if (!automatic) this.loginForm.reset();
      this.navCtrl.parent.select(0);
    }, error => {
      console.log(error);
      this.showAlert(error.statusText);
    });
  }

  // TODO: Create alert function that pops up when register form is incorrect

  /**
   * Change input validation status to ´invalid´ if no match
   */

  checkUserExists(): void {
    this.mediaProvider.checkUser(this.user.username).
      subscribe((data) => {
        console.log('username free:', data['available']);
        if (!data['available']) {
          this.registerForm.form.controls['username'].setErrors(
            { 'incorrect': true });
          this.registerForm.form.controls['username'].markAsTouched();
          this.userAlert = true;
        } else {
          this.userAlert = false;
        }
      });
  }

  /**
   * Change input validation status to ´invalid´ if no match
   */
  checkPasswordMatch(): void {
    if (this.user.password !== this.confirmPassword) {
      this.registerForm.form.controls['confirmPassword'].setErrors(
        { 'incorrect': true });
      this.registerForm.form.controls['confirmPassword'].markAsTouched();
    }
  }

  /*
    register(): void {
      if (this.user.password !== this.confirmPassword) {
        this.showAlert('Passwords do not match!');
        return;
      }
      this.mediaProvider.register(this.user).subscribe((data) => {
        this.login(true);
        this.registerForm.reset();
      }, error => {
        console.log(error);
        this.showAlert(error.error.message);
      });
    }
    */
}
