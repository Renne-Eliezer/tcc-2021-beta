$(document).ready(function(){
  var db = firebase.firestore();

  
  //Constantes do Questionário em si:
 
  const selectquests = document.getElementById("questions-selector")
  //--------------------------------------------------------------------

  const perg = []
 











      
  selectquests.addEventListener("submit", (e) =>{
    e.preventDefault()
    nq = document.getElementById('q-selector').value;
    const category = document.getElementById('m-selector').value;

    if (nq == 'null' ) {
      alert("Escolha a quantidade de questões")
      
    }else if (category == 0) {
      alert("Escolha o tema das questões")
      
    }else{
      db.collection("QuestoesENEM").where("categoria", "==", category).get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          perg.push([doc.data()])
          $('#placar').text('Questão:'+'1'+'/'+nq)
          $('#title-enunciado').text(perg[0][0].enunciado);
          $('#quest-categoria').text(perg[0][0].categoria);
          $('#R-A').text(perg[0][0].A);
          $('#R-B').text(perg[0][0].B);
          $('#R-C').text(perg[0][0].C);
          $('#R-D').text(perg[0][0].D);
          
          
          
        })
    })

    }
    
    
  

  })
  
  var conta = 0
  $('#nextq').click(function () {
    const ra = $('input:checked').val();
    if (conta <= nq - 2 && ra != null) { conta++
      $('#title-enunciado').text(perg[conta][0].enunciado);
      $('#quest-categoria').text(perg[conta][0].categoria);
      $('#R-A').text(perg[conta][0].A);
      $('#R-B').text(perg[conta][0].B);
      $('#R-C').text(perg[conta][0].C);
      $('#R-D').text(perg[conta][0].D);
      console.log(conta)

        
      }else if(ra == null){
          alert('Responda a questão antes de prosseguir!!!')
          
      
    }else{
      alert('Seu quiz acabou, essa foi sua ultima questão.')
    }
    $('#placar').text('Questão:'+(conta+1)+'/'+nq)
    $('#quiz').trigger('reset');
    
  })
  var qc = []
  var qe = []
  
  $("#btnsubmit").on("click", function(){
    const ra = $('input:checked').val();
    if(ra == perg[conta][0].gabarito  ){
      qc.push([perg[conta][0].enunciado, perg[conta][0].gabarito, conta+1])
      $("#placarcrts").text("Questões certas: " + qc.length + "/" + nq )
  
    }else if(ra == null){
      alert("Escolha uma das alternativas!!")
      
    }else{
      qe.push([perg[conta][0].enunciado, perg[conta][0].gabarito, conta+1])
      $("#placarerds").text("Questões erradas: " + qe.length + "/" + nq )

    
    }
    
    console.log(qc)
    console.log(qe)  
  })
  var contresults = 0
  $("#btncertas").click(function(){
      document.getElementById('divresultscor').style.border = 'thick solid #65c368';
      document.getElementById('divresultscor').style.backgroundColor = '#bbffb9'
      $("#enunciadocor").text(qc[0][0])
      $("#categoriacor").text("Gabarito: " + qc[0][1])
      $("#questcorrect").text("Questão - " + qc[0][2])
      $("#nextresult").click(function(){
        contresults++
        $("#enunciadocor").text(qc[contresults][0])
        $("#categoriacor").text("Gabarito: " + qc[contresults][1])
        $("#questcorrect").text("Questão - " + qc[contresults][2])

      })
  })
  $("#btnerradas").click(function(){
    document.getElementById('divresultscor').style.border = 'thick solid #ff0000';
    document.getElementById('divresultscor').style.backgroundColor = '#ffbfaa'
    $("#enunciadocor").text(qe[0][0])
      $("#categoriacor").text("Gabarito: " + qe[0][1])
      $("#questcorrect").text("Questão - " + qe[0][2])
      $("#nextresult").click(function(){
        contresults++
        $("#enunciadocor").text(qe[contresults][0])
        $("#categoriacor").text("Gabarito: " + qe[contresults][1])
        $("#questcorrect").text("Questão - " + qe[contresults][2])
      })
  })

 


})


// Fazer a autebticação para poder usar o banco de dados!!


       


    

