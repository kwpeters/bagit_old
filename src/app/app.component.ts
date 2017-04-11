import {Component} from '@angular/core';
import * as firebase from 'firebase';
import Auth = firebase.auth.Auth;
import {LoginService} from './login/login.service';


@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.css']
})
export class AppComponent {

    constructor(private _loginService: LoginService) {
    }

    public onLogin() {
        this._loginService.login();
    }

    public onLogout() {
        this._loginService.logout();
    }
}
