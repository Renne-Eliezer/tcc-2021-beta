
function cadastro() {
        var useremail = document.getElementById('exampleInputEmail1').value;
        var userpass = document.getElementById('exampleInputPassword1').value;
        var userpass2 = document.getElementById('exampleInputPassword2').value;
        console.log('ok')
        firebase.auth().createUserWithEmailAndPassword(useremail, userpass2)
        .then((userCredential) => {
            console.log('ok')
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        })
        console.log('ok')
        if (userpass.length < 7 || userpass2.length < 7) {
            alert('A senha deve ter pelo menos 7 caracteres!')
        }
        if (userpass2 == '') {
            alert("Confirme sua Senha!")
        }else if (userpass != userpass2 ) {
            alert("As senhas digitadas são diferentes!")                
        }else{
            alert('Cadastrado! Volte para a pagina de Login.')

        }

}














