import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Location } from "@angular/common";
import {RegisterPage} from '../register/register'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = ""
  password: string = ""
  error: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, private location: Location) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {
    var vm = this
    const { username, password } = this
    try {
      // kind of a hack. 
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)

      if (res.user) {
        vm.error = false
        this.navCtrl.setRoot(HelloIonicPage);
      }


    } catch (err) {
      vm.error = true
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("User not found")
      }
    }
  }

  myBackButton() {
    this.navCtrl.setRoot(HelloIonicPage);
  }

  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }
}
