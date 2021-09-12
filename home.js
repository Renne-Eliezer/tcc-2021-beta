firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      console.log(email_id)
      document.getElementById('userview').innerHTML = "Bem-vindo: "+ email_id;
    }
  }
  
})




function logout(){
  firebase.auth().signOut();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    }else{
      window.location.href = 'login.html'

    }
})
}