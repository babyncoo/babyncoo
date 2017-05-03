'use strict';

// Initializes Babyncoo.
function Babyncoo() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.userPic = document.getElementById('bncUserPic');
  this.userName = document.getElementById('bncUserName');
  this.signInButton = document.getElementById('bncSignInBtn');
  this.signOutButton = document.getElementById('bncSignOutBtn');

  // Add event listeners.
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
Babyncoo.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in.
Babyncoo.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out.
Babyncoo.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
Babyncoo.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // Do something for the signed-in user.

  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userPic.style.backgroundImage = '';
    this.userName.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
Babyncoo.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
};

window.onload = function() {
  window.babyncoo = new Babyncoo();
};
