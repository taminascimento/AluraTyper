$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


function fraseAleatoria() {
    $("#spinner").toggle();
    $.get(" http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle(); //ao falhar mostra a mensagem de erro
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){ //sempre escondendo o spinner
        $("#spinner").toggle();
    });          
}



function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}


//arquivo frase.js
function buscaFrase() {

    $("#spinner").toggle(); 
    var fraseId = $("frase-id").val();
   
    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId};
   
     //passando objeto como segundo parâmetro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}


//arquivo frase.js
function trocaFrase(data) {

    console.log(data);
   
    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

