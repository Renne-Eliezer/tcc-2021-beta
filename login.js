firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    console.log('ok')


    var user = firebase.auth().currentUser;

    if(user != null){
      console.log('ok')
      window.location.href = 'index.html'


    }

  } else {
   

  }
});

function login(){

  var userEmail = document.getElementById("exampleInputEmail1").value;
  var userPass = document.getElementById("exampleInputPassword1").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

