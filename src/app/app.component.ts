import {Component} from "@angular/core";
import * as firebase from "firebase";
import Auth = firebase.auth.Auth;

@Component({
    selector:    "app-root",
    templateUrl: "./app.component.html",
    styleUrls:   ["./app.component.css"]
})
export class AppComponent {

    private _firebaseAuth: firebase.auth.Auth;

    public userEmail: string;
    public userPassword: string;

    constructor() {

        // Initialize Firebase
        const config = {
            apiKey:            "AIzaSyAz94XC84SMI931J1whgZvd-DshZ0KiO8U",
            authDomain:        "bagit-e8c02.firebaseapp.com",
            databaseURL:       "https://bagit-e8c02.firebaseio.com",
            storageBucket:     "bagit-e8c02.appspot.com",
            messagingSenderId: "147809261454"
        };
        firebase.initializeApp(config);

        this._firebaseAuth = firebase.auth();

    }

    public onSignUp() {
    }

    public onLogin() {

        const googleAuthProvider: firebase.auth.GoogleAuthProvider  =  new firebase.auth.GoogleAuthProvider();
        this._firebaseAuth.signInWithPopup(googleAuthProvider)
        .then((result) => {
            console.log("\n\n----- result -----");
            console.log(JSON.stringify(result, undefined, 4) + "\n\n");
        })
        .catch((err) => {
            console.log("\n\n----- err -----");
            console.log(JSON.stringify(err, undefined, 4) + "\n\n");
        });
    }

}
