// Constantes
const display = document.querySelector(".display");
const botoes = document.querySelectorAll("button");
const audio = new Audio('audio.mp3');

// Variáveis
let valorAntigo = "";
let valor = "0";
let operadorAntigo = "";
let operador = "";
let calculo = [];
let calculototal = [];

// Funções
// Operações básicas
function soma(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function multi(x, y) {
    return x * y;
}

function divisao(x, y) {
    // Testa se o segundo valor é igual a zero, se for, limpa e atualiza o display
    if (y == 0) {
        alert("Can't divide by zero");
        limpar();
        atualizar();
        return null;
    } else {
        return x / y;
    }
}

// Função operar, recebe um operador, num1 e num2 e testa qual operação deve ser feita
function operar(operador, x, y) {
    if (operador == "/") {
        return divisao(x, y);
    } else if (operador == "*") {
        return multi(x, y);
    } else if (operador == "+") {
        return soma(x, y);
    } else {
        return sub(x, y);
    }
}

// Atualiza o display para o valor
function atualizar() {
    // Testa se o valor tem 8 caracteres ou mais, se tiver, corte para 8 caracteres
    if (valor.length >= 8) {
        valor = valor.substring(0, 8);
    }
    display.textContent = valor;
}


// Adiciona o número selecionado à variável valor
function numstr(numstr) {
    if (valor == "0") {
        valor = numstr;
    } else {
        valor += numstr;
    }
    atualizar();
}

// Função que apaga o último número
function del() {
    // Faz o valor mudar para 0 caso tente apagar o último dígito
    if (valor.length == "1") {
            valor = "0";
    } else {
        valor = valor.slice(0, -1);
    }
    atualizar();
}

// Função para funcionamento do ponto flutuante corretamente
function ponto() {
    // Impede que seja colocado mais de 1 .
    if (!valor.includes(".")) {
        // Se o valor for igual a zero, o valor será 0. senão, adicionará um ponto no valor atual
        if (valor == "0") {
            valor = "0.";
        } else {
            valor += ".";
        }
    }
    atualizar();
}

// HONK
Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
};

function honk() {
    if (audio.duration > 0 && !audio.paused) {
        audio.stop();
    }
    audio.play();
}

// Reseta todas as variáveis para o valor inicial
function limpar() {
    valorAntigo = "";
    valor = "0";
    operadorAntigo = "";
    operador = "";
    calculo = [];
    calculototal = [];
}

// Testa o valor do operador digitado, chamando a função correta
function operacoes(operstr) {
    if (operstr == "C") {
        del();
    } else if (operstr == ".") {
        ponto();
    } else if (operstr == "📢") {
        honk();
    } else if (operstr == "AC") {
        limpar();
        atualizar();
    } else if (operstr == "=") {
        igual();
    } else {
        equacaoadi(operstr);
    }
}

// Adiciona os valores na lista de calculototal e faz o calculo atual
function equacaoadi(oper) {
    operadorUso();
    // Testa se o operador é (=) para evitar (=) na lista do calculototal
    if (operador != "=") {
        // Salva os valores para cálculo
        valorAntigo = valor;
        operadorAntigo = oper;
        operador = "";

        // Adiciona os valores em calculototal
        calculototal.push(valorAntigo);
        calculototal.push(operadorAntigo);
        valor = "0";

        // Adiciona os valores na lista de calculos pela primeira vez
        if (calculo.length == 0) {
            calculo.push(valorAntigo);
            calculo.push(operadorAntigo);
        }
    }
}

// Faz o calculo atual quando as operações são selecionadas
function operadorUso() {
    // Testa se a lista de calculo é maior que zero para poder calcular
    if (calculo.length > 0) {
        // Adiciona o valor atual na lista de calculo para completar a lista
        calculo.push(valor);

        // Opera o calculo atual, atribuindo o valor à variável resultado
        let resultado = operar(
            calculo[1],
            parseFloat(calculo[0]),
            parseFloat(calculo[2])
        ).toString();

        // Remove os valores antigos e adiciona o resultado à lista
        calculo.splice(0, 7, resultado);
        if (calculo[0].length >= 8) {
            calculo[0] = calculo[0].substring(0, 8);
        }

        // Atualiza o display
        display.textContent = calculo[0];

        // Adiciona o operador na lista de calculo
        calculo.push(operador);
    }
}

// Faz o calculototal ao clicar no igual
function operarTotal(operador1, operador2) {

    // Testa cada item da lista por * e / e depois por + e -, realizando as contas, chegando ao resultado final.
    while (calculototal.includes(operador1) || calculototal.includes(operador2)) {
        calculototal.forEach((item) => {
            if (item == operador1 || item == operador2) {
                let i = calculototal.indexOf(item);
                let resultado = operar(
                    item,
                    parseFloat(calculototal[i - 1]),
                    parseFloat(calculototal[i + 1])
                ).toString();
                calculototal.splice(i - 1, 3, resultado);
            }
        });
    }
    return calculototal;
}

// Se a lista de calculototal não for vazia, chama a função operartotal para realizar o calculo final e mostra o resultado
function igual() {
    if (calculototal.length > 0) {
        calculototal.push(valor);
        calculototal = operarTotal("*", "/");
        calculototal = operarTotal("+", "-");
        if (operador != '=') {
            calculototal.push(operador);
        }
    }
    // Se a lista não estiver vazia, atualiza o display com o valor de calculototal
    if (calculototal != '') {
        display.textContent = calculototal[0];
    }
    limpar();
}

// addEventListener para cada botão da calculadora
for (let elemento of botoes) {
    elemento.addEventListener("click", (e) => {
        if (isNaN(e.target.textContent)) {
            operador = e.target.textContent;
            operacoes(operador);
        } else {
            numstr(e.target.textContent);
        }
    });
}
