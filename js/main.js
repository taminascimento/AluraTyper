var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//atalho da função $(document).ready(function(){}
$(function(){

  //  $(document).ready(function(){
  // invoca as funções para que elas sejam executadas assim que  pág for carregada
        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaCronometro();
        inicializaMarcadores();
        $("#botao-reiniciar").click(reiniciaJogo);
        atualizaPlacar();

        $("#usuarios").selectize({
                create: true,
                sortField: 'text'
        });
        
        $(".tooltip").tooltipster({
            trigger: "custom"
        });
});


function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}



function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    // Função JQuery = $ = função seletora
    //A função .text() do jQuery serve para modificar o conteúdo de texto das tags
    var numPalavras = frase.split(" ").length;
    //split: quebra a frase em conteúdos vazios
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}


//var campo = $(".campo-digitacao");

function inicializaContadores() {
   campo.on("input", function() {
        var conteudo = campo.val(); /*val = value */
        //A função .val() é para alterar os valores dos campos de input

        var qtdPalavras = conteudo.split(/\s+/).length - 1;
        // (/\s+/) : conta a quebra de linha como espaço, foi usada p corrigir bug
        $("#contador-palavras").text(qtdPalavras);
       
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}



function inicializaMarcadores() {
   
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        /*substr pega só um parte da frase digitada, desde o início (0) até onde 
        consegui digitar */

        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}



function inicializaCronometro() {
   
    campo.one("focus", function() {        
    // Focus, usado para qnd entramos dentro de um campo 
    //a função one que garante que o evento será associado apenas uma vez.
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function() {
            tempoRestante--;
        // console.log(tempoRestante);

            $("#tempo-digitacao").text(tempoRestante);
        // $(".campo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
                //inserePlacar();
            }
    
        }, 1000);

    });
}


function finalizaJogo() {

    campo.attr("disabled", true); //attr: qnd queremos adicionar um atributo
    /*a função .attr(), como o próprio nome sugere é para alterar os atributos de elemento,
    como os atributos rows e col de uma textarea*/
    // para add o disabled colocamos true, se fosse para retira~lo, usríamos false
    
    /*campo.css("background-color", "lightgray"); função que permite alterar o CSS.
     Passo o que quero alterar e o valor da propriedade.*/
     /*campo.addClass("campo-desativado"); No formato anterior, eu teria que ficar 
     mexendo no Jquery caso houvessem mudanças, e isso não é boa prática. Então criamos 
     a função e alteramos no CSS */
     campo.toggleClass("campo-desativado"); // explicação na função abaixo
    inserePlacar();
} 
   





//Os eventos do Javascript que são mais comuns, como o click, blur(evento de sair de um campo), dblclick (clique duplo) tem funções próprias no jQuery, que são funções de atalho, evitando precisar chamar a função on() e chamando diretamente a função do próprio evento.

//$("#botao-reiniciar").click(reiniciaJogo)

function reiniciaJogo() {
        //A função .attr() nos permite colocar, retirar ou modificar valores de atributos de elementos HTML
        campo.attr("disabled", false);
        campo.val("");
        //Colocando o conteúdo .val() do campo como vazio(""), ele ficará zerado
        //Para zerar os contadores de palavras e cacarcteres:
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        //campo.removeClass("campo-desativado"); // remove o fundo cinza qnd reiniciamos o jogo
        campo.toggleClass("campo-desativado");
        /*toggleClass(). Ela funciona da seguinte maneira: se no momento que a função for chamada, o elemento possuir a classe, ela será removida. Mas se o elemento não possuir a classe, ela será adicionada.*/

        campo.removeClass("borda-vermelha"); // Para que a borda fique preta qnd reiniciarmos o jogo
        campo.removeClass("borda-verde"); 
}
