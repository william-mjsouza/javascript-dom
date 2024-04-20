//======================================================================================================
//                                               Funções 
//======================================================================================================
// Função para agrupar sequencialmente os elementos de um vetor
function agrupar(vetor, tam_grupo) {
    // Array grupos cujo tamanho depente da quantidade de elementos do array vetor 
    var grupos = [];

    // Array grupo cujo tamanho depende da quantidade de elementos sequenciais o que o usuário quer agrupar do array vetor
    var grupo = [];

    // Variável para atualizar o intervalo de agrupamento
    var j = 0;
    // Percorre o array vetor
    for (var i = 0; i < vetor.length; i++) {
        // Adiciona o elemento caso ele esteja no intervalo de agrupamento
        if ((i >= (tam_grupo * j)) && (i < (tam_grupo * (j + 1)))) {
            grupo.push(vetor[i]);
        }

        // Atualiza o intervalo após ser formado um grupo
        if (grupo.length == tam_grupo) {
            grupos.push(grupo);
            grupo = [];
            j++
        }
    }

    return grupos;
}

function clicar(botao) {
    /* 
    Se o mesmo botão for clicado novamente sem que outro botão tenha sido clicado entre os cliques, o código 
    dentro da função clicar não será executado
    */
    if (!cliques[botao]) {
        // Criação do vetor gruposDeTres cujos elementos são vetores com 3 imagens sequenciais do banner em cada um deles
        var grupoDeTres = agrupar(imagens, numImgsExibidas);

        // Controla a exibição do display das imagens ao apertar os botões
        // grupoDeTres = [[img1, img2, img3],
        //                [img4, img5, img6],
        //                [img7, img8, img9]]
        
        for (i = 0; i < grupoDeTres.length; i++) {
            for (var j = 0; j < numImgsExibidas; j++) {
                switch (botao) {
                    // Se o botão clicado for o 1º
                    case 0:
                        // Muda a cor do botao pra cinza
                        botoes[botao].style.backgroundColor = 'gray';
                        botoes[1].style.backgroundColor = 'white';
                        botoes[2].style.backgroundColor = 'white';

                        // Só exibe as 3 primeiras (grupo 0)
                        if (i == 0) {
                            grupoDeTres[i][j].style.display = 'inline-block';
                        }
                        else {
                            grupoDeTres[i][j].style.display = 'none';
                        }
                        break;
                    // Se o botão clicado for o 2º
                    case 1:
                        // Muda a cor do botao pra cinza
                        botoes[0].style.backgroundColor = 'white';
                        botoes[botao].style.backgroundColor = 'gray';
                        botoes[2].style.backgroundColor = 'white';

                        // Só exibe as 3 do meio (grupo 1)
                        if (j == 1) {
                            grupoDeTres[i][j].style.display = 'inline-block';
                        }
                        else {
                            grupoDeTres[i][j].style.display = 'none';
                        }
                        break;
                    // Se o botão clicado for o 3º
                    case 2:
                        // Muda a cor do botao pra cinza
                        botoes[0].style.backgroundColor = 'white';
                        botoes[1].style.backgroundColor = 'white';
                        botoes[botao].style.backgroundColor = 'gray';

                        // Só exibe as 3 últimas (grupo 2)
                        if (j == 2) {
                            grupoDeTres[i][j].style.display = 'inline-block';
                        }
                        else {
                            grupoDeTres[i][j].style.display = 'none';
                        }
                        break;
                    // Para qulquer outro caso
                    default:
                        botoes[botao].style.display = 'none';
                        break;
                }
            }
        }
        
        /* 
        Garante que o código dentro da função clicar() seja executado apenas uma vez para cada conjunto de 3
        imagens correspondente a cada botão. Isso evita a execução repetida e desnecessária do código quando 
        o usuário já estiver visualizando o conjunto de imagens correspondente ao botão clicado
        */
        for (i = 0; i < cliques.length; i++) {
            if (i == botao) {
                cliques[i] = true;
            }
            else {
                cliques[i] = false;
            }
        }
    }
    
}

//======================================================================================================
//                                       Função Principal (main)
//======================================================================================================
// Variável para controlar o número n de imagens exibidas por vez no banner
const numImgsExibidas = 3;

// Seleciona todos os elementos img que estão dentro da div e que tem o id = "carrossel" e coloca na NodeList imagens
var imagens = document.querySelectorAll('div#carrossel>img');

// Forma os grupos de n imagens
var gruposFormados = agrupar(imagens, numImgsExibidas);

// Seleciona o elemento div de id = "controle" (pai dos botões)
var controle = document.querySelector('div#controle');

// Cria novos elementos (botões) pra cada grupo de 3 imagens que existir (máximo 5)
// Se o tamanho do vetor imagens for um múltiplo de 3
var numImgs = imagens.length;
var quantGrupos = gruposFormados.length;
var i;
if ((numImgs % numImgsExibidas == 0) && (quantGrupos != 5)) {
    for (i = 1; i < quantGrupos; i++) {
        // Cria mais um novo botão
        botao = document.createElement('span');

        // Adiciona uma classe ao novo botão
        botao.classList.add('controles');

        // Adiciona o novo botão como filho do elemento pai
        controle.appendChild(botao);
    }
}

// Seleciona todos os elementos de class = "controles" e coloca no vetor botoes
var botoes = document.querySelectorAll('.controles');

// Só as 3 primeiras imagens inicializam com display inline-block (as outras estão apagadas -> display none no CSS)
for (i = 0; i < imagens.length; i++) {
    if (i < numImgsExibidas) {
        imagens[i].style.display = 'inline-block';
    }
}

// Inicializa as variáves de controle de clique como false
var cliques = [false, false, false]

// Adiciona um escutador de eventos de clique em cada um dos botões do banner
for (i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', (function(i) {
            return function() {
                    clicar(i);
            }
    })(i));
}