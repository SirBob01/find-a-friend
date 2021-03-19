import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyD4Qp_ZXLrgmexyAJxraCd6uc5QCw8xgAk",
    authDomain: "s1-web.firebaseapp.com",
    databaseURL: "https://s1-web-default-rtdb.firebaseio.com",
    projectId: "s1-web",
    storageBucket: "s1-web.appspot.com",
    messagingSenderId: "139175075604",
    appId: "1:139175075604:web:c7d37b32664274e315ac01",
    measurementId: "G-8MZ1T28H35"
};

app.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        this.database = app.database();
        this.storage = app.storage();
        this.auth = app.auth();
    }

    debugError(error) {
        alert(`${error.code} error has occurred - ${error.message}`);
    }

    writeDatabase(root, json) {
        this.database.ref(root).set(json)
            .catch(this.debugError);
    }

    readDatabase(root, event, callback) {
        // Listens to any events that may occur to the database
        // If the specified event occurs, execute the callback function
        var reference = this.database.ref(root);
        reference.on(event, callback);
    }

    onUserActive(callback, fallback=null) {
        this.auth.onAuthStateChanged((userInstance) => {
            if(userInstance != null) {
                callback(userInstance.uid);
            }
            else if(fallback != null) {
                fallback();
            }
        });
    }
}

export default Firebase;