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



var vetor = [0, 1, 15, 3, 4, 5, 6, 7, 8];   // Vetor que se deseja agrupar os elementos
var tam_grupo = 3;                          // Tamanho do grupo que será formado com os elementos do vetor

var grupos = agrupar(vetor, tam_grupo);

console.log(grupos);
