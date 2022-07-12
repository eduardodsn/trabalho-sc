// ATAQUE DE VIGENÈRE

let campoTextoOrigem = document.querySelector('#textarea-texto-origem');

document.querySelector('#btn-calcular-frequencia').addEventListener('click', eventoDOMCalcularFrequencia);
// document.querySelector('#btn-resetar').addEventListener('click', limparCampos);

function eventoDOMCalcularFrequencia(event) {
    let textoTratado = tratarTexto(campoTextoOrigem.value);
    event.preventDefault();

    calcularSequenciasRepetidas(textoTratado);
}

function calcularSequenciasRepetidas(texto) {
    let sequenciasRepetidas = [];
    let count = 0;

    for(let i = 0; i < texto.length - 3; i++) {
        let sequencia = texto.substring(i, i+3);

        for(let j = i + 3; j < texto.length; j++) {
            if(sequencia == texto.substring(j, j + 3)) {
                sequenciasRepetidas[count] = [sequencia, j-i];
                count++;
            }
        }
    }

    console.log(sequenciasRepetidas);
}

function tratarTexto(texto) {
    return texto.normalize("NFD").replace(/[^A-Z]/g, '').replaceAll(" ", '').toUpperCase();
}