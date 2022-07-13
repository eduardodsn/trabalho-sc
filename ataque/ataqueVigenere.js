// ATAQUE DE VIGENÈRE
const TAMANHO_MAXIMO_CHAVE = 15;

export default function calcularSequenciasRepetidas(texto) {
    let ocorrencias = {};
    let sequencias = [];

    for(let i = 0; i < texto.length - 3; i++) {
        let sequencia = texto.substring(i, i + 3);

        for(let j = i + 3; j < texto.length; j++) {
            let sequenciaInterna = texto.substring(j, j + 3)

            if(sequencia === texto.substring(j, j + 3)) {
                sequencias.push([sequenciaInterna, j - i]);
            }
        }
    }

    sequencias.map(sequencia => {
        let divisores = retornaFatores(sequencia[1]);

        divisores.map(divisor => {
            ocorrencias[divisor] ? ocorrencias[divisor]++ : ocorrencias[divisor] = 1;
        });
    })

    let tamanhosChavePossiveis =  Object.entries(ocorrencias).sort((a, b) => b[1]-a[1]).map(e => e[0]);
    let tamanhosChaveMaisProvaveis = tamanhosChavePossiveis.slice(0, 3);

    return tamanhosChaveMaisProvaveis;
}

function calcularFrequenciaPorPosicao(texto, tamanhoChave, posicaoLetra) {

}

function retornaFatores(numero){
	let divisores = [];

	for(var i = 2; i <= TAMANHO_MAXIMO_CHAVE; i++){
        numero % i === 0 ? divisores.push(i) : '';
	}

	return divisores;
}