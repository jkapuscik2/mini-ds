import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import app from 'firebase/app';
import {firebaseConfig} from "../../config/firebase";

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.db = app.firestore()
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

    fetchDevices = (userUid) => {
        return this.db.collection('devices').where('user_uid', '==', userUid).orderBy("date_created", "desc")
    }

    createDevice = (name, description, userUid) => {
        return this.db.collection('devices').add({
            name: name,
            description: description,
            user_uid: userUid,
            date_created: app.firestore.FieldValue.serverTimestamp(),
            is_updated: false,
            last_update: app.firestore.FieldValue.serverTimestamp()
        })
    }
}

export default Firebase;