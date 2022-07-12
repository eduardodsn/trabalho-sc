// ATAQUE DE VIGENÈRE
const TAMANHO_MAXIMO_CHAVE = 15;

function calcularSequenciasRepetidas(texto) {
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
        let divisores = retornaDivisores(sequencia[1]);

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

const frequencia_ingles = {
    'a': 8.167,
    'b': 1.492,
    'c': 2.782,
    'd': 4.253,
    'e': 12.702,
    'f': 2.228,
    'g': 2.015,
    'h': 6.094,
    'i': 6.966,
    'j': 0.153,
    'k': 0.772,
    'l': 4.025,
    'm': 2.406,
    'n': 6.749,
    'o': 7.507,
    'p': 1.929,
    'q': 0.095,
    'r': 5.987,
    's': 6.327,
    't': 9.056,
    'u': 2.758,
    'v': 0.978,
    'w': 2.360,
    'x': 0.150,
    'y': 1.974,
    'z': 0.074
}


let colunas = document.querySelector('.colunas')
let frequencia_barra = document.querySelector('.frequencia_barra')

for(let letra of Object.entries(frequencia_ingles)) {
    colunas.innerHTML+= `
        <td id="alpha_${letra}" class="alphabet">${letra[0].toUpperCase()}</td>
    `
}

for(let letra of Object.entries(frequencia_ingles)) {
    frequencia_barra.innerHTML+= `
    <td id="graph_${letra[0]}" class="bars">
        <div id="bar_${letra[0]}" class="bar" style="width: 30px; height: ${letra[1]*10}px">
        </div>${(letra[1]).toFixed(2)}%
    </td>
    `
}