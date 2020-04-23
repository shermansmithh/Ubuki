import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { FormGroup} from '@angular/forms';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name: string = "";
  email: string = "";
  password: string = "";
  signupError:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup() {
    var ref = firebase.database().ref();
  
	var vm = this
		firebase.auth().createUserWithEmailAndPassword(vm.email,vm.password).then(
			() =>{
        ref.child('profiles').child(firebase.auth().currentUser.uid).update({
          uid: firebase.auth().currentUser.uid,
          name: vm.name
        })
        this.navCtrl.setRoot(HelloIonicPage)
      } ,
			error => this.signupError = error.message
		);
  }
  
}
