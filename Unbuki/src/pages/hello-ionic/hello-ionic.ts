import { Component } from '@angular/core';
import { NavController, Platform, UrlSerializer } from 'ionic-angular';
import { LoginPage } from '../login/login'
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FontprovProvider } from '../../providers/fontprov/fontprov';
import { v } from '@angular/core/src/render3';
import { AddbooksPage} from '../addbooks/addbooks'
import {AccesPage} from '../acces/acces'
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  logged: boolean
  fontset: String
  userId: any
  user: any
  admin : boolean

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

  edditAcces(){
    this.navCtrl.push(AccesPage);
  }

  addBook() {
    this.navCtrl.push(AddbooksPage);
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  logout() { 
    var vm = this 
    
    var ref = firebase.database().ref();
    var logins = ref.child('onlinestatus').child(vm.userId);
    logins.once('value', function(snapshot) {

        var init
        var amount = snapshot.val().amount - 1;
        if(amount == undefined || null){
          init = 1
        }
      logins.update({
        uid:  vm.userId,
        time: firebase.database.ServerValue.TIMESTAMP,
        amount: amount ? amount: init,
      })
    });
   
    firebase.auth().signOut()
  }

  initUser() {
    var vm = this
    //Realtime database tracking of actual user 
    firebase.database().ref('/profiles/' + this.userId).once('value', function (snapshot) {
      console.log(snapshot.val())
      vm.user = snapshot.val()
      if(vm.user.admin){
        vm.admin = true
      }else{
        vm.admin = false
      }
    });
  }
}
