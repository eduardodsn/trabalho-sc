import {
    calcularSequenciasRepetidas,
    calcularFrequenciaPorPosicao
} from './ataqueVigenere.js';

// DOM
const frequenciaLetrasIngles = {
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

const frequenciaLetrasPortugues = {
    'a': 14.63,
    'b': 1.04,
    'c': 3.88,
    'd': 4.99,
    'e': 12.57,
    'f': 1.02,
    'g': 1.30,
    'h': 1.28,
    'i': 6.18,
    'j': 0.40,
    'k': 0.02,
    'l': 2.78,
    'm': 4.74,
    'n': 5.05,
    'o': 10.73,
    'p': 2.52,
    'q': 1.20,
    'r': 6.53,
    's': 7.81,
    't': 4.34,
    'u': 4.63,
    'v': 1.67,
    'w': 0.01,
    'x': 0.21,
    'y': 0.01,
    'z': 0.47
}

let tamanhoChaveSelecionada;
let textoCifrado;

document.querySelector('#btn-calcular-frequencia-ingles')
    .addEventListener('click', (e) => eventoDOMCalcularFrequencia(e, 'en-US'));
document.querySelector('#btn-calcular-frequencia-portugues')
    .addEventListener('click', (e) => eventoDOMCalcularFrequencia(e, 'pt-BR'));

function eventoDOMCalcularFrequencia(e, tipo) {
    let campoTextoOrigem = document.querySelector('#textarea-texto-origem');
    let textoTratado = tratarTexto(campoTextoOrigem.value);
    
    e.preventDefault();
    
    if(textoTratado.length === 0) {
        alert('Insira o texto cifrado!');
        return
    }
    textoCifrado = textoTratado;
    
    let tamanhosChaveMaisProvaveis = calcularSequenciasRepetidas(textoTratado);
    gerarCamposTamanhoChave(tamanhosChaveMaisProvaveis, tipo)
}

function gerarCamposTamanhoChave(tamanhosChave, tipo) {
    let containerTamanhosChave = document.querySelector('#tamanhos-chaves');
    
    containerTamanhosChave.innerHTML = '';
    tamanhosChave.forEach(tamanhoChave => {
        containerTamanhosChave.innerHTML += `
            <div class="tamanho-chave" id=>${tamanhoChave}</div>
        `;
    });
    
    document.querySelector('#tamanhos-chave-provaveis').removeAttribute('hidden');
    document.querySelector('#dica').removeAttribute('hidden');
    let botoesTamanhoChave = document.querySelectorAll('.tamanho-chave');

    botoesTamanhoChave.forEach(botaoTamanhoChave => botaoTamanhoChave.addEventListener('click', () => gerarCamposChave(botaoTamanhoChave.innerText)));
    mostrarTabelaFrequencia(tipo);
}

function gerarCamposChave(tamanhoChave) {
    let camposChaveContainer = document.querySelector('#campos-chave-container');
    tamanhoChaveSelecionada = tamanhoChave;
    camposChaveContainer.innerHTML = '';

    for(let i = 0; i < parseInt(tamanhoChave); i++) {
        camposChaveContainer.innerHTML += `
            <div class="campo-chave" id="campo-chave-${i+1}">C${i+1}</div>
        `;
    }

    let camposChave = document.querySelectorAll('.campo-chave');

    camposChave.forEach(campoChave => {
        campoChave.addEventListener('click', () => calcularFrequenciaPorPosicaoDOM(parseInt(campoChave.id.split('chave-')[1])));
    })
}

function mostrarTabelaFrequencia(tipo) {
    let taxaFrequenciaContainer;
    let colunasFrequencia;
    let frequenciaUtilizada; 

    if(tipo === 'en-US') {
        taxaFrequenciaContainer = document.querySelectorAll('#taxa-frequencia-ingles');
        colunasFrequencia = document.querySelector('#letras-frequencia-ingles');
        frequenciaUtilizada = frequenciaLetrasIngles;

        //esconde a outra tabela, caso esteja em tela
        document.querySelector('#frequencia-portugues').style.display = 'none';
    } else {
        taxaFrequenciaContainer = document.querySelectorAll('#taxa-frequencia-portugues');
        colunasFrequencia = document.querySelector('#letras-frequencia-portugues');
        frequenciaUtilizada = frequenciaLetrasPortugues;
        document.querySelector('#frequencia-ingles').style.display = 'none';
    }

    resetarTabela(tipo);

    for(let letra of Object.entries(frequenciaUtilizada)) {
        colunasFrequencia.innerHTML+= `
            <td class="letra">${letra[0].toUpperCase()}</td>
        `
    }

    taxaFrequenciaContainer.forEach(taxaFrequencia => {
        for(let letra of Object.entries(frequenciaUtilizada)) {
            taxaFrequencia.innerHTML += `
            <td class="barras">
                <div class="barra" style="height: ${letra[1]*10}px">
                </div>
                <span>${letra[1].toFixed(1)}%</span>
            </td>
            `
        }
    });

    if(tipo === 'en-US') {
        document.querySelector('#frequencia-ingles').style.display = '';
    } else {
        document.querySelector('#frequencia-portugues').style.display = ''
    }

}

function calcularFrequenciaPorPosicaoDOM(posicaoLetra) {
    let frequencia = calcularFrequenciaPorPosicao(textoCifrado, tamanhoChaveSelecionada, posicaoLetra);
    let taxaFrequenciaContainer = document.querySelector('#taxa-frequencia-selecionada');
    let letrasFrequenciaContainer = document.querySelector('#letras-frequencia-selecionada');

    for(let item of Object.keys(frequencia)) {
        console.log(item, frequencia[item])
        taxaFrequenciaContainer.innerHTML += `
        <td class="barras">
            <div class="barra" style="height: ${frequencia[item]*10}px">
            </div>
            <span>${frequencia[item].toFixed(1)}%</span>
        </td>
        `;

        letrasFrequenciaContainer.innerHTML += `
        <td class="letra">${item.toUpperCase()}</td>
        `;
    }
}

function resetarTabela(tipo) {
    document.querySelectorAll(`#taxa-frequencia-${tipo === 'en-US' ? 'ingles' : 'portugues'}`).forEach(e => e.innerHTML = '');
    document.querySelector(`#letras-frequencia-${tipo === 'en-US' ? 'ingles' : 'portugues'}`).innerHTML = '';
}

function tratarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g, '').replaceAll(" ", '').toUpperCase();
}