import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the AcsdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acsdetails',
  templateUrl: 'acsdetails.html',
})
export class AcsdetailsPage {
user : any
userinfo:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController) {
    var vm = this
    
    this.user= navParams.get('user');
    this.getProfile(vm.user.uid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcsdetailsPage');
  }
 changeAmount(){

  var vm = this
  var ref = firebase.database().ref();
console.log("click at change")
  ref.child('onlinestatus').child(vm.user.uid).update({totalamount : vm.user.totalamount}).catch(function(error) {
    vm.toast.create({ message: "Error By Updating", duration: 2000 }).present()
  })
  ref.child('profiles').child(vm.user.uid).update({totalamount : vm.user.totalamount}).catch(function(error) {
    vm.toast.create({ message: "Error By Updating", duration: 2000 }).present()
  })
 }

 getProfile(uid) {
  var user
  var vm = this
  var ref = firebase.database().ref();
  ref.child('onlinestatus').child(uid).once('value', function (snapshot) {
    vm.userinfo = snapshot.val()
  });
  
}
 
}
