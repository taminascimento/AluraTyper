$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);


function inserePlacar() {
    
    var corpoTabela = $(".placar").find("tbody");
    /*Quando queremos buscar filhos de um elemento que já selecionamos previamente, podemos utilizar a função .find() do jQuery, que funciona de modo semelhante a função seletora ($), porém fazendo a busca apenas do filho do elemento:  e o tbody foi usando pq é onde está os dados que eu quero na tabela*/  
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();
   // var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);// linha criada no corpo da tabela
    //corpoTabela.prepend(linha); // adicionar a nova linha como primeiro item da tabela
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
   var posicaoPlacar = $(".placar").offset().top; //retorna a distância que o elemento está do topo e da esquerda da pág

   $("body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}


function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}


function removeLinha() {

    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000); // elemento vai ficando transparente até desaparecer. Desaparece da tela, mas continua no HTML
    setTimeout(function() { // aguardar
        linha.remove(); // Para remover o item que não foi removido com o fadeOut
    }, 1000);
}


function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}


function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

        linhas.each(function(){
            var usuario = $(this).find("td:nth-child(1)").text();
            var palavras = $(this).find("td:nth-child(2)").text();

            var score = {
                usuario: usuario,
                pontos: palavras            
            };

            placar.push(score);

            var dados = {
                placar: placar
            };
    

            $.post("http://localhost:3000/placar", dados, function(){
                console.log("Placar sincronizado com sucesso");
                $(".tooltip").tooltipster("open");
            }).fail(function(){
                $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
            }).always(function(){ //novo
                setTimeout(function() {
                $(".tooltip").tooltipster("close"); 
            }, 1200);

        });
    });

}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);


            $("tbody").append(linha);
        });
    });
}