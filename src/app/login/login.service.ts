import {Injectable} from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class LoginService {

    private _firebaseAuth: firebase.auth.Auth;
    private _curFirebaseUser: firebase.User;
    private _authInitializedPromise: Promise<void>;
    private _resolveAuthInitializedPromise: () => void;

    constructor() {

        //
        // Initialize Firebase
        //
        const config = {
            apiKey:            'AIzaSyAz94XC84SMI931J1whgZvd-DshZ0KiO8U',
            authDomain:        'bagit-e8c02.firebaseapp.com',
            databaseURL:       'https://bagit-e8c02.firebaseio.com',
            storageBucket:     'bagit-e8c02.appspot.com',
            messagingSenderId: '147809261454'
        };
        firebase.initializeApp(config);

        //
        // Setup to handle authentication state changes.
        //
        this._authInitializedPromise = new Promise((resolve, reject) => {
            // Hang on to the resolve function so that we can call it once the
            // initial auth state change happens.
            this._resolveAuthInitializedPromise = resolve;

        });
        this._firebaseAuth = firebase.auth();
        this._firebaseAuth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }


    private onAuthStateChanged(firebaseUser: firebase.User): void {

        // http://stackoverflow.com/questions/37673616/firebase-android-onauthstatechanged-called-twice

        if (this._curFirebaseUser === undefined) {
            // Got initial listener registration invocation.
            console.log('Got initial listener registration callback.');
            this._curFirebaseUser = firebaseUser;
            this._resolveAuthInitializedPromise();
            return;
        }

        if (firebaseUser === null) {
            console.log('The user has logged off.');
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

    public login() {
        const googleAuthProvider: firebase.auth.GoogleAuthProvider  =  new firebase.auth.GoogleAuthProvider();
        this._firebaseAuth.signInWithPopup(googleAuthProvider)
        // .then((result) => {
        //     console.log('\n\n----- result -----');
        //     console.log(JSON.stringify(result, undefined, 4) + '\n\n');
        // })
        .catch((err) => {
            console.log('\n\n----- Error logging in -----');
            console.log(JSON.stringify(err, undefined, 4) + '\n\n');
        });
    }

    public logout() {
        this._firebaseAuth.signOut();
    }

    public getUser(): Promise<firebase.User> {

        // We have to wait for Firebase's first onAuthStateChanged invocation in
        // order to successfully determine the current authorization state.
        return this._authInitializedPromise
        .then(() => {
            return this._curFirebaseUser;
        });
    }
}
