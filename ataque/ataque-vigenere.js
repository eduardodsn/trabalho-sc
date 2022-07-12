// ATAQUE DE VIGENÈRE
const TAMANHO_MAXIMO_CHAVE = 15;

function calcularSequenciasRepetidas(texto) {
    let ocorrencias = {};
    let sequencias = [];

    for(let i = 0; i < texto.length - 3; i++) {
        let sequencia = texto.substring(i, i + 3);

        for(let j = i + 3; j < texto.length; j++) {
            let sequenciaInterna = texto.substring(j, j+3)

            if(sequencia === texto.substring(j, j + 3)) {
                sequencias.push([sequenciaInterna, j - i]);
            }
        }
    }
    
    sequencias.map(numero => {
        let divisores = retornaDivisores(numero[1]);

        divisores.map(divisor => {
            ocorrencias[divisor] ? ocorrencias[divisor]++ : ocorrencias[divisor] = 1;
        });
    })

    let tamanhoChave = Object.entries(ocorrencias).sort((a, b) => b[1]-a[1])[0][0];

   alert(`Tamanho de chave mais provável: ${tamanhoChave}`);
}

function retornaDivisores(numero){
	let divisores = [];

	for(var i = 2; i <= TAMANHO_MAXIMO_CHAVE; i++){
        numero % i === 0 ? divisores.push(i) : ''
	}
    
	return divisores;
}


function tratarTexto(texto) {
    return texto.normalize("NFD").replace(/[^A-Z]/g, '').replaceAll(" ", '').toUpperCase();
}


// DOM
let campoTextoOrigem = document.querySelector('#textarea-texto-origem');

document.querySelector('#btn-calcular-frequencia').addEventListener('click', eventoDOMCalcularFrequencia);
// document.querySelector('#btn-resetar').addEventListener('click', limparCampos);

function eventoDOMCalcularFrequencia(event) {
    let textoTratado = tratarTexto(campoTextoOrigem.value);
    event.preventDefault();

    calcularSequenciasRepetidas(textoTratado);
}