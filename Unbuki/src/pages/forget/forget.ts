import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController, LoadingController, Platform } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  email;
  signupError;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  showToast(message) {
    this.toast.create({ message: message, duration: 2000 }).present()
  }


  reset() {
    if (this.email) {
      firebase.auth().sendPasswordResetEmail(this.email)
        .then(data => {
          this.showToast('Please Check inbox')
        })
        .catch(err => {
          this.signupError = err
          this.showToast(err.message)
        });
    }
  }
  
}
