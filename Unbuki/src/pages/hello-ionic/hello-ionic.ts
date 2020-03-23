import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login'
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FontprovProvider } from '../../providers/fontprov/fontprov';
import { v } from '@angular/core/src/render3';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  logged: boolean
  fontset: String
  userId: any
  user: any

  constructor(platform: Platform, public navCtrl: NavController, private angularFireAuth: AngularFireAuth, public font: FontprovProvider) {
    var vm = this
    platform.ready().then(() => {
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          vm.userId = user.uid
          vm.initUser()
          vm.logged = true
        } else {
          vm.logged = false
        }
      });
   
    })

    
  }

  

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  logout() {
    firebase.auth().signOut()
  }

  initUser() {
    var vm = this
    //Realtime database tracking of actual user 
    firebase.database().ref('/profiles/' + this.userId).once('value', function (snapshot) {
      console.log(snapshot.val())
      vm.user = snapshot.val()
    });
  }
}
