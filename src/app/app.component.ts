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
    private _curFirebaseUser: firebase.User;

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

        this._firebaseAuth.onAuthStateChanged(this.onUserChange.bind(this));

    }

    private onUserChange(firebaseUser: firebase.User) {

        // http://stackoverflow.com/questions/37673616/firebase-android-onauthstatechanged-called-twice

        if (this._curFirebaseUser === undefined) {
            // Got initial listener registration invocation.
            console.log("Got initial listener registration callback.");
            this._curFirebaseUser = firebaseUser;
            return;
        }

        if (firebaseUser === null) {
            console.log("The user has logged off.");
            this._curFirebaseUser = null;
            return;
        }

        if (this._curFirebaseUser === null) {
            console.log(`User ${firebaseUser.uid} has logged in.`);
            this._curFirebaseUser = firebaseUser;
            return;
        }

        if (firebaseUser.uid === this._curFirebaseUser.uid) {
            console.log("The current user's token has been refreshed.");
            this._curFirebaseUser = firebaseUser;  // Don't need to update, but get the latest user info.
            return;
        } else {
            console.log(`User ${firebaseUser.uid} has logged in.`);
            this._curFirebaseUser = firebaseUser;
            return;
        }

    }

    public onSignUp() {
    }

    public onLogin() {

        const googleAuthProvider: firebase.auth.GoogleAuthProvider  =  new firebase.auth.GoogleAuthProvider();
        this._firebaseAuth.signInWithPopup(googleAuthProvider)
        // .then((result) => {
        //     console.log("\n\n----- result -----");
        //     console.log(JSON.stringify(result, undefined, 4) + "\n\n");
        // })
        .catch((err) => {
            console.log("\n\n----- err -----");
            console.log(JSON.stringify(err, undefined, 4) + "\n\n");
        });

    }

    public onLogout() {
        this._firebaseAuth.signOut();
    }
}
