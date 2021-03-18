import Firebase from './firebase';

class AuthFunctions extends Firebase {
    signUp(firstname, lastname, email, pwd) {
        this.auth.createUserWithEmailAndPassword(email, pwd)
            .then((userCred) => {
                this.writeDatabase(`${userCred.user.uid}`, {
                    name: {
                        first: firstname,
                        last: lastname
                    },
                    email: email,
                    profile_pic: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg",
                    posts: {},
                    following: {
                        [userCred.user.uid] : 0
                    }
                });
            })
            .catch(this.debugError);
    }

    logIn(email, pwd) {
        this.auth.signInWithEmailAndPassword(email, pwd)
            .catch(this.debugError);
    }

    logOut(callback) {
        this.auth.signOut()
            .then(callback)
            .catch(this.debugError);
    }
}

const authFunctions = new AuthFunctions();
export default authFunctions;