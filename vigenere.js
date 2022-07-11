// CIFRAÇÃO/DECIFRAÇÃO DE VIGENÈRE
const alfabeto = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function cifrarTexto(chave, texto) {
    let resultadoCifra = ''
    let posicaoChave = 0
    
    for(let letra of texto) {
        if(letra === ' ' || /[^A-Z]/.test(letra)) {
            resultadoCifra += letra;
        } else {
            let novoIndice = alfabeto.indexOf(chave[posicaoChave]) + alfabeto.indexOf(letra);
            novoIndice = novoIndice >= 26 ? novoIndice % 26 : novoIndice;

            resultadoCifra += alfabeto[novoIndice];
            posicaoChave = posicaoChave < chave.length - 1 ? ++posicaoChave : 0;
        }
    }
        
    return resultadoCifra;
}

function decifrarTexto(chave, texto) {
    let resultadoDecifracao = ''
    let posicaoChave = 0
    
    for(let letra of texto) {
        if(letra === ' ' || /[^A-Z]/.test(letra)) {
            resultadoDecifracao += letra;
        } else {
            let novoIndice = 26 - alfabeto.indexOf(chave[posicaoChave]) + alfabeto.indexOf(letra);
            console.log(chave[posicaoChave], letra, alfabeto.indexOf(chave[posicaoChave]), alfabeto.indexOf(letra), novoIndice)
            novoIndice = novoIndice > 26 ? novoIndice % 26 : novoIndice;

            resultadoDecifracao += alfabeto[novoIndice];
            posicaoChave = posicaoChave < chave.length - 1 ? ++posicaoChave : 0;
        }
    }

    return resultadoDecifracao;
}


// DOM
let campoChave = document.querySelector('#input-chave');
let campoTextoOrigem = document.querySelector('#textarea-texto-origem');
let campoTextoDestino = document.querySelector('#textarea-texto-destino');

document.querySelector('#botao-cifrar').addEventListener('click', (e) => eventoDOMCifrarDecifrar(e, 'cifrar'));
document.querySelector('#botao-decifrar').addEventListener('click', (e) => eventoDOMCifrarDecifrar(e, 'decifrar'));
document.querySelector('#botao-limpar').addEventListener('click', limparCampos);


function eventoDOMCifrarDecifrar(event, operacao) {
    let chave = tratarTexto(campoChave.value).replaceAll(' ', '');
    let texto = tratarTexto(campoTextoOrigem.value);

    event.preventDefault();

    if(!chave || !texto) {
        alert('Informe a chave e o texto.');
        return
    }

    if(/([0-9])$/.test(chave)) {
        alert('Chave não pode conter números.')
        return
    }

    if(operacao === 'cifrar') {
        campoTextoDestino.value = cifrarTexto(chave, texto);
        return
    }
    
    campoTextoDestino.value = decifrarTexto(chave, texto);
}

function limparCampos(e) {
    campoChave.value = '';
    campoTextoOrigem.value = '';
    campoTextoDestino.value = '';

    e.preventDefault();
}

function tratarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}