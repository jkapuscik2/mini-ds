import app from 'firebase/app';
import 'firebase/auth';
import {firebaseConfig} from "../../config/firebase";

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    registerEmail = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    loginEmail = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    authUserListener = (login, logout) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    providerData: authUser.providerData,
                };

                login(authUser);
            } else {
                logout();
            }
        });

    logOut = () => this.auth.signOut();

    recoverPassword = (email) =>
        this.auth.sendPasswordResetEmail(email)

    reautenticate = (email, password) => {
        const credential = app.auth.EmailAuthProvider.credential(
            email,
            password
        );

        return this.auth.currentUser.reauthenticateWithCredential(credential)
    }

    changePassword = (newPassword) =>
        this.auth.currentUser.updatePassword(newPassword);

}

export default Firebase;