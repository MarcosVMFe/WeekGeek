var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var corpo = req.body || {};
    var email = corpo.emailServer;
    var senha = corpo.senhaServer;

    if (typeof email != "string" || email.trim() == "") {
        res.status(400).send("Seu email está undefined!");
    } else if (typeof senha != "string" || senha == "") {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email.trim(), senha)
            .then(
                function (resultadoAutenticar) {
                    console.log("Resultados encontrados: " + resultadoAutenticar.length);

                    if (resultadoAutenticar.length == 1) {
                        req.session.usuarioId = resultadoAutenticar[0].id;

                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage || erro);
                    res.status(500).json("Erro ao realizar o login.");
                }
            );
    }
}

function cadastrar(req, res) {
    var corpo = req.body || {};
    var nome = corpo.nomeServer;
    var email = corpo.emailServer;
    var senha = corpo.senhaServer;

    if (typeof nome != "string" || nome.trim() == "") {
        res.status(400).send("Seu nome está undefined!");
    } else if (typeof email != "string" || email.trim() == "") {
        res.status(400).send("Seu email está undefined!");
    } else if (typeof senha != "string" || senha == "") {
        res.status(400).send("Sua senha está undefined!");
    } else if (nome.trim().length > 100 || email.trim().length > 120 || senha.length > 255) {
        res.status(400).send("Algum campo passou do tamanho permitido.");
    } else {

        usuarioModel.cadastrar(nome.trim(), email.trim(), senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage || erro);

                    if (erro.code == "ER_DUP_ENTRY") {
                        res.status(409).json("Este e-mail já está cadastrado.");
                    } else {
                        res.status(500).json("Erro ao realizar o cadastro.");
                    }
                }
            );
    }
}

function sair(req, res) {
    req.session.destroy(function () {
        res.json({ ok: true });
    });
}

module.exports = {
    autenticar,
    cadastrar,
    sair
};