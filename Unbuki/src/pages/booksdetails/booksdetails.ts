import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { AngularFireAuth } from '@angular/fire/auth';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/';
import firebase from 'firebase';
import { LoginPage } from '../login/login'
import { FontprovProvider } from '../../providers/fontprov/fontprov';
import { Observable } from 'rxjs/Observable';
import { e } from '@angular/core/src/render3';
/**
 * Generated class for the BooksdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-booksdetails',
  templateUrl: 'booksdetails.html',
})
export class BooksdetailsPage {

  selectedBook: any;
  currentBookCurrentPageData: any
  currentPage: number
  pages: any
  totalpages: any
  logged: any
  currency: string = 'USD';
  userId: any
  purchased: any
  bpurchased: boolean
  readbook: boolean
  fontset: any
  fontsize : any
  user: any

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private angularFireAuth: AngularFireAuth, private payPal: PayPal,
    public font: FontprovProvider) {
    var vm = this
    // If we navigated to this page, we will have an item available as a nav param
    vm.selectedBook = navParams.get('item');
    vm.currentPage = 1
    vm.pages = vm.selectedBook.pages
    vm.currentBookCurrentPageData = vm.selectedBook.pages[vm.currentPage]
    vm.totalpages = vm.pages.length

    platform.ready().then(() => {
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          vm.logged = true
        } else {
          vm.logged = false
        }

        if (firebase.auth().currentUser !== null) {
          this.userId = firebase.auth().currentUser.uid;
          vm.getPurchased()
        }

      });
      this.getFont()
      this.getFontSize()
      this.initUser()
    })
  }

  previousPage() {
    var vm = this
    this.currentPage = this.currentPage - 1
    vm.currentBookCurrentPageData = vm.selectedBook.pages[vm.currentPage]
  }


  nextPage() {
    var vm = this
    this.currentPage++
    vm.currentBookCurrentPageData = vm.selectedBook.pages[vm.currentPage]
  }


  payWithPaypal() {
    var vm = this
    var ref = firebase.database().ref();
    vm.payPal.init({
      PayPalEnvironmentProduction: 'AZRdPOP5s3UL_KjdvRoUStzJE4lr9qxUznW5Lq6n0w4ppHVnzgQ4XwKsZTsWiWWR6nGzxenwJB8U1WkW',
      PayPalEnvironmentSandbox: 'ASWcU1Ssk6MJiidXo75mFRFx10Iu3YrueFsSVtzbWIuERSgL66WNdrXs8LHTQ6dOIVm1op2u7oGO-5LS'
    }).then(() => {
      console.log("then")
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      vm.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let key = vm.selectedBook.bookId
        let payment = new PayPalPayment('2', this.currency, 'Description', 'sale');
        vm.payPal.renderSinglePaymentUI(payment).then((res) => {
          var userRequestRef = ref.child('purchased');

          userRequestRef.child(vm.userId).child(key).set({
            res: res
          })
        }, () => {
          console.log("Error or render dialog closed without being successful")
          // Error or render dialog closed without being successful
        });
      }, () => {
        console.log("Error in configuration")
        // Error in configuration
      });
    }, () => {
      console.log("Error in initialization, maybe PayPal isn't supported or something else")
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  getPurchased() {
    var vm = this

    var ref = firebase.database().ref()

    var hid = ref.child('purchased').child(vm.userId).child(vm.selectedBook.bookId)

    hid.on('value', function (snapshot) {
      if (snapshot.exists()) {
        vm.purchased = snapshot.val()
        vm.bpurchased = true
      } else {
        vm.bpurchased = false
        vm.purchased = {}
      }
    })
  }

  readBook() {
    var vm = this
    vm.readbook = false
    if (vm.bpurchased) {
      vm.readbook = true
    } else {
      vm.readbook = false
    }

  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  getFont() {
    var vm = this
    this.font.getFont().subscribe((fontset) => {
      console.log(fontset)
      vm.fontset = fontset
    })

  }

  getFontSize() {
    var vm = this
    this.font.getFontSize().subscribe((fontsetsize) => {
      vm.fontsize = fontsetsize
    })

  }

  initUser() {
    var vm = this
    //Realtime database tracking of actual user 
    firebase.database().ref('/profiles/' + this.userId).on('value', function (snapshot) {
      vm.user = snapshot.val()
    });

    
  }
}
