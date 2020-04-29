import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import firebase from 'firebase';
import {AccesdetailsPage} from '../accesdetails/accesdetails'
import {LoginPage} from'../login/login'
import  {AcsdetailsPage } from '../acsdetails/acsdetails'
/**
 * Generated class for the AccesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-acces',
  templateUrl: 'acces.html',
})
export class AccesPage {
  users: any
  usersarray: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.fetchUsers()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccesPage');
  }


  fetchUsers(){
    var vm = this
    firebase.database().ref('/profiles/').once('value', function (snapshot) {
      vm.users = snapshot.val()
      var arr = Array.from(Object.keys(snapshot.val()), k => snapshot.val()[k]);
      vm.usersarray = arr;
    });
  }

  changeAcces(user){
console.log(user)
    this.navCtrl.push(AcsdetailsPage, {
      user: user
    });



  }


}
