import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import app from 'firebase/app';
import {firebaseConfig} from "../../config/firebase";

const DEVICES_COLLECTION = 'devices'
const FILES_COLLECTION = 'files'

class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig);

        this.db = app.firestore()
        this.storage = app.storage().ref()
        this.auth = app.auth();
    }

    registerEmail = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    loginEmail = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    authUserListener = (login, fallback) =>
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
                fallback();
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
        return this.db.collection(DEVICES_COLLECTION)
            .where('user_uid', '==', userUid)
            .orderBy("date_created", "desc")
    }

    fetchDevice = (deviceUid) => {
        return this.db.collection('devices')
            .where(app.firestore.FieldPath.documentId(), '==', deviceUid)
    }

    createDevice = (name, description, userUid) => {
        return this.db.collection(DEVICES_COLLECTION).add({
            name: name,
            description: description,
            user_uid: userUid,
            date_created: app.firestore.FieldValue.serverTimestamp(),
            is_updated: true,
            last_update: app.firestore.FieldValue.serverTimestamp()
        })
    }

    updateDevice = async (name, description, uid) => {
        return this.db.collection(DEVICES_COLLECTION).doc(uid).update({
            name: name,
            description: description,
            last_update: app.firestore.FieldValue.serverTimestamp()
        })
    }

    removeDevice = (device) => {
        return this.db.collection(DEVICES_COLLECTION).doc(device.uid).delete()
    }

    addFile = (file, userUid) => {
        const img = this.storage.child(`/user/${userUid}/${Math.random()}-${file.name}`)

        return img.put(file)
    }

    saveFileInfo = (userUid, fileUrl, type) => {
        return this.db.collection(FILES_COLLECTION).add({
            url: fileUrl,
            user_uid: userUid,
            type: type,
            date_created: app.firestore.FieldValue.serverTimestamp()
        })
    }

    fetchFiles = (userUid) => {
        return this.db.collection(FILES_COLLECTION)
            .where('user_uid', '==', userUid)
            .orderBy("date_created", "desc")
    }

}

export default Firebase;