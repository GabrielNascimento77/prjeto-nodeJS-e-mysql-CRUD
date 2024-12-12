//Importar módulo mysql
const mysql = require('mysql2');

//Configuração de conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gs@@2019',
    database: 'projeto',
    port: '3307'
});

//Teste de conexão
conexao.connect((erro) => {
    if (erro) throw erro;
    console.log('Conexão efetuada com sucesso!')
});

module.exports = conexao;