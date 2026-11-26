function doisDigitos(n) {
    return String(n).padStart(2, "0");
}

function soData(valor) {
    if (valor instanceof Date) {
        return valor.getFullYear() + "-" + doisDigitos(valor.getMonth() + 1) + "-" + doisDigitos(valor.getDate());
    }
    return String(valor).slice(0, 10);
}

function dataHora(d) {
    return soData(d) + " " + doisDigitos(d.getHours()) + ":" + doisDigitos(d.getMinutes()) + ":" + doisDigitos(d.getSeconds());
}

module.exports = {
    soData,
    dataHora
};