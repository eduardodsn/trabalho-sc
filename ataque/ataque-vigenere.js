// ATAQUE DE VIGENÈRE
const TAMANHO_MAXIMO_CHAVE = 15;

function calcularSequenciasRepetidas(texto) {
    let ocorrencias = [];
    let espacos = [];

    for(let i = 0; i < texto.length - 3; i++) {
        let sequencia = texto.substring(i, i + 3);

        for(let j = i + 3; j < texto.length; j++) {
            let sequenciaInterna = texto.substring(j, j+3)

            if(sequencia === texto.substring(j, j + 3)) espacos.push([sequenciaInterna, j - i]);
        }
    }
    
    espacos.map(numero => {
        let divisores = retornaDivisores(numero[1]);

        divisores.map((divisor, index) => {
            ocorrencias[index] ? ocorrencias[index][1]++ : ocorrencias.push([divisor, 1]); 
        });
    })

    ocorrencias.sort((a, b) => a[1] > b[1]);
    console.log(ocorrencias);
    console.log('Tamanho de chave mais provável: ', ocorrencias[0][0]);
}

function retornaDivisores(numero) {
    let divisores = [];

    for(let i = 2; i < numero; i++) {
        if(numero % i === 0 && i < TAMANHO_MAXIMO_CHAVE) divisores.push(i); 
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