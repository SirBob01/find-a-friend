import Firebase from './firebase';

class ProfileFunctions extends Firebase {
    fetchUserData(component, uid) {
        // Should be caled on componentDidMount()
        // When a new value is detected, read the user's data
        // and save it in the parent component
        this.readDatabase(`${uid}`, "value", (snapshot) => {
            component.setState({ user: snapshot });
        });
    }
}

const profileFunctions = new ProfileFunctions();
export default profileFunctions;