import { Component } from '@angular/core';
import {NavController, Platform} from'ionic-angular';
import {LoginPage} from '../login/login'
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  logged: boolean

  constructor(platform: Platform, public navCtrl: NavController, private angularFireAuth: AngularFireAuth) {
    var vm = this
    platform.ready().then(() => {
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          vm.logged= true
        } else {
          vm.logged= false
        }
      });

    })
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  logout(){
    firebase.auth().signOut()
  }


}
