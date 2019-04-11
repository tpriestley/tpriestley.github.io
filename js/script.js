function handleSignUp() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
      		}
		if (password.length < 6) {
			alert('Please enter a longer password.');
			return;
			}
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
        // [START_EXCLUDE]
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
				}
	console.log(error);
        // [END_EXCLUDE]
	});
      // [END createwithemail]
}
    /**
     * Sends an email verification to the user.
     */

function dumbuser(){
// alert("adding user!");
var email = "w@w.ca"
var password = "asdfjkl"
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// Handle Errors here
var errorCode = error.code;
var errorMessage = error.message;
// alert("error"+ error.message);
// ...
});
}

function signIn(){
// alert("Signing In");
var email = document.getElementById("inputemail").value;
var password = document.getElementById("inputpassword").value;
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
alert("Error signing in");
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// ...
});
}

function signOut(){
firebase.auth().signOut().then(function() {
alert("You have successfully logged out");
}).catch(function(error) {
// An error happened.
});
}

function OnSignIn(){
    $("#signin").addClass("hiddenauthen");
    $("#createAcc").addClass("hiddenauthen");
    $("#signout").removeClass("hiddenauthen");
}

function OnSignOut(){
    $("#signin").removeClass("hiddenauthen");
    $("#createAcc").removeClass("hiddenauthen");
    $("#signout").addClass("hiddenauthen");
    $("#exblog").addClass("hiddenauthen");
}


firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	OnSignIn();

// User is signed in.
// alert("Signed into " + user.email);
console.log(user.toJSON());
} else {
	OnSignOut();
// No user is signed in.
// alert("user not signed in");
}
});
