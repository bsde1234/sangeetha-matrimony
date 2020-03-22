import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI

  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
  
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      }
    }

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

    this.ui.start('#login-auth', uiConfig);
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccessful(result) {
    this.ngZone.run(() => this.router.navigateByUrl('/admin-console'));
  }

  loginUser = (form: NgForm) => {
    console.log(form.value);
  }

}
