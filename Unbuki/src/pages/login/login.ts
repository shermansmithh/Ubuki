import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Location } from "@angular/common";
import {RegisterPage} from '../register/register'
import {ForgetPage} from '../forget/forget'
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = ""
  password: string = ""
  error: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, private location: Location, public toast : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {
    var ref = firebase.database().ref();

    var vm = this
    const { username, password } = this
    try {
      // kind of a hack. 
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)

      if (res.user) {
        vm.error = false
     
      
        var ref = firebase.database().ref();
        var logins = ref.child('onlinestatus').child(res.user.uid);
        logins.once('value', function(snapshot) {

            var init
            var amount = snapshot.val().amount
            var totalamount = snapshot.val().totalamount;

            if(amount < totalamount){
              var amount = snapshot.val().amount+ 1;
              vm.navCtrl.setRoot(HelloIonicPage);
            } else{
              vm.toast.create({ message: "Logout of other devices (limit exceeded)", duration: 2000 }).present()
            }
            
            if(amount == undefined || null){
              init = 1
            }
          logins.update({
            uid: res.user.uid,
            time: firebase.database.ServerValue.TIMESTAMP,
            amount: amount ? amount: init,
          })
        });
  
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
  goToForgetPage(){
    this.navCtrl.push(ForgetPage);
  }
}
