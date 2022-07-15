// ATAQUE DE VIGENÈRE
const TAMANHO_MAXIMO_CHAVE = 15;

export function calcularSequenciasRepetidas(texto) {
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

function retornaFatores(numero){
	let divisores = [];

	for(var i = 2; i <= TAMANHO_MAXIMO_CHAVE; i++){
        numero % i === 0 ? divisores.push(i) : '';
	}

	return divisores;
}

export function calcularFrequenciaPorPosicao(texto, tamanhoChave, posicaoLetra) {
    let frequencia = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0,
        'F': 0,
        'G': 0,
        'H': 0,
        'I': 0,
        'J': 0,
        'K': 0,
        'L': 0,
        'M': 0,
        'N': 0,
        'O': 0,
        'P': 0,
        'Q': 0,
        'R': 0,
        'S': 0,
        'T': 0,
        'U': 0,
        'V': 0,
        'W': 0,
        'X': 0,
        'Y': 0,
        'Z': 0
    }
    let totalOcorrencias = 0;
    tamanhoChave = parseInt(tamanhoChave)

    for(let i = posicaoLetra - 1; i < texto.length; i+=tamanhoChave) {
        frequencia[texto[i]] > 0 ? frequencia[texto[i]]++ : frequencia[texto[i]] = 1;
    }

    for(let letra of Object.keys(frequencia)) {
        totalOcorrencias += frequencia[letra];
    }

    for(let letra of Object.keys(frequencia)) {
        frequencia[letra] = +(((frequencia[letra] / totalOcorrencias) * 100).toFixed(1));
    }
    
    return frequencia
}