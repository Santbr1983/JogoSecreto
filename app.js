//let titulo = document.querySelector ('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector ('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let numerosSorteados = [];

function habilitarChute() {
    document.getElementById('chutar').removeAttribute('disabled');
}

habilitarChute();


function gerarNumero () {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let tamanhoLista = numerosSorteados.length;
    if (tamanhoLista == 10) {
        numerosSorteados = []
    }

    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados)
        return numeroEscolhido;
    }
}

let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector (tag)
    campo.innerHTML = texto
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-br';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial () {
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector ('input').value;
    
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled',true);
    } else {
        exibirTexto('h1', 'Você Errou!')
        if (chute > numeroSecreto) {
            exibirTexto('p', `Tente novamente! O Número Secreto é menor que ${chute}.`)
        } else {
            exibirTexto('p', `Tente novamente! O Número Secreto é maior que ${chute}.`)
        }
        tentativas ++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    habilitarChute();
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

