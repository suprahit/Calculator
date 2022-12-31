const display = document.querySelector(".display");
const botoes = document.querySelectorAll("button");
const audio = new Audio('audio.mp3');

let valorAntigo = "";
let valor = "0";
let operadorAntigo = "";
let operador = "";
let calculo = [];
let calculototal = [];

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
    if (y == 0) {
        alert("Can't divide by zero");
        limpar();
        atualizar();
        return null;
    } else {
        return x / y;
    }
}

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

function atualizar() {
    if (valor.length >= 8) {
        valor = valor.substring(0, 8);
    }
    display.textContent = valor;
}

function numstr(numstr) {
    if (valor == "0") {
        valor = numstr;
    } else {
        valor += numstr;
    }
    atualizar();
}

function del() {
    // If current value length is equal one, to maintain it.
    if (valor.length == "1") {
        // If current value is different than zero, change it to zero.
        if (valor != "0") {
            valor = "0";
        }
    } else {
        // Slices the last number of currentValue
        valor = valor.slice(0, -1);
    }
    atualizar();
}

function ponto() {
    if (!valor.includes(".")) {
        if (valor == "0") {
            valor = "0.";
        } else {
            valor += ".";
        }
    }
    atualizar();
}

function honk() {
    audio.play();
}

function limpar() {
    valorAntigo = "";
    valor = "0";
    operadorAntigo = "";
    operador = "";
    calculo = [];
    calculototal = [];
}

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

function equacaoadi(oper) {
    operadorUso();
    if (operador != "=") {
        valorAntigo = valor;
        operadorAntigo = oper;
        operador = "";
        calculototal.push(valorAntigo);
        calculototal.push(operadorAntigo);
        valor = "0";
        if (calculo.length == 0) {
            calculo.push(valorAntigo);
            calculo.push(operadorAntigo);
        }
    }
}

function operadorUso() {
    if (calculo.length > 0) {
        calculo.push(valor);
        let resultado = operar(
            calculo[1],
            parseFloat(calculo[0]),
            parseFloat(calculo[2])
        ).toString();
        calculo.splice(0, 7, resultado);
        if (calculo[0].length >= 8) {
            calculo[0] = calculo[0].substring(0, 8);
        }
        display.textContent = calculo[0];
        calculo.push(operador);
    }
}

function operarTotal(operador1, operador2) {
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

function igual() {
    if (calculototal.length > 0) {
        calculototal.push(valor);
        calculototal = operarTotal("*", "/");
        calculototal = operarTotal("+", "-");
        if (operador != '=') {
            calculototal.push(operador);
        }
    }
    if (calculototal != '') {
        display.textContent = calculototal[0];
    }
    limpar();
}

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
