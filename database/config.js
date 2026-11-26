var mysql = require("mysql2");

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 3306,
    dateStrings: true,               
    waitForConnections: true,
    connectionLimit: 5
});


function executar(instrucao, parametros) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU .env.dev OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        pool.query(instrucao, parametros, function (erro, resultados) {
            if (erro) {
                return reject(erro);
            }
            resolve(resultados);
        });
    });
}

module.exports = {
    executar
};