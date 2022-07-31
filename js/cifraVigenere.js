// CIFRAÇÃO/DECIFRAÇÃO DE VIGENÈRE
const alfabeto = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function cifrarTexto(chave, texto) {
    let resultadoCifra = '';
    let posicaoChave = 0;
    texto = texto.toUpperCase();
    
    for(let letra of texto) {
        if(!alfabeto.includes(letra)) {
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
    let resultadoDecifracao = '';
    let posicaoChave = 0;
    texto = texto.toUpperCase();
    
    for(let letra of texto) {
        if(!alfabeto.includes(letra)) {
            resultadoDecifracao += letra;
        } else {
            let novoIndice = 26 - alfabeto.indexOf(chave[posicaoChave]) + alfabeto.indexOf(letra);
            novoIndice = novoIndice >= 26 ? novoIndice % 26 : novoIndice;

            resultadoDecifracao += alfabeto[novoIndice];
            posicaoChave = posicaoChave < chave.length - 1 ? ++posicaoChave : 0;
        }
    }

    return resultadoDecifracao;
}


// DOM
const $ = document.querySelector.bind(document);
let campoChave = $('#input-chave');
let campoTextoOrigem = $('#textarea-texto-origem');
let campoTextoDestino = $('#textarea-texto-destino');

$('#botao-cifrar').addEventListener('click', (e) => eventoDOMCifrarDecifrar(e, 'cifrar'));
$('#botao-decifrar').addEventListener('click', (e) => eventoDOMCifrarDecifrar(e, 'decifrar'));
$('#botao-limpar').addEventListener('click', limparCampos);


function eventoDOMCifrarDecifrar(event, operacao) {
    let chave = tratarTexto(campoChave.value).replaceAll(' ', '');
    let texto = campoTextoOrigem.value;

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
    campoChave.focus();
    
    e.preventDefault();
}

function tratarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}