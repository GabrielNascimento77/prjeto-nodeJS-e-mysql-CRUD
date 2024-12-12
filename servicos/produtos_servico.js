//importar módulo de conexão
const conexao = require('../bd/conexao');

//File system
const fs = require('fs');

//Função para exibir o formulário para cadastro de produtos
function formularioCadastro(req, res) {
    res.render('formulario');
}

//Função para exibir o formulário para cadastro de produtos e a situação
function formularioCadastroComSituacao(req, res){
    res.render('formulario', { situacao: req.params.situacao });
}

//Função para exibir a listagem de produtos
function listagemProdutos(req, res) {

    //Obter categoria
    let categoria = req.params.categoria;

    //SQL
    let sql = '';

    if(categoria == 'todos'){
        sql = 'SELECT * FROM produtos ORDER BY RAND()';
    } else {
        sql = `SELECT * FROM produtos WHERE categoria = '${categoria}' ORDER BY codigo DESC`;
    }

    //Executar comando SQL
    conexao.query(sql, (erro, result) => {
        res.render('lista', { produtos: result });
    });
}

//Função para realizar a pesquisa de produtos
function pesquisa(req, res) {
    //Obter o termo pesquisado
    let termo = req.body.termo;

    //SQL
    let sql = `SELECT * FROM produtos WHERE nome LIKE '%${termo}%'`;

    //Executar comando SQL
    conexao.query(sql, (erro, result) => {

        let semRegistros = result.length == 0 ? true : false;
        res.render('lista', { produtos: result, semRegistros : semRegistros });
    });
}

//Função para realizar o cadastro de produtos
function cadastrarProduto(req, res) {
    try {
        //Obter os dados que serão utilizados para o cadastro
        let nome = req.body.nome;
        let valor = req.body.valor;
        let imagem = req.files.imagem.name;
        let categoria = req.body.categoria;

        // Validar o nome do produto e o valor
        if (nome == '' || valor == '' || isNaN(valor) || categoria == '') {
            res.redirect('/falhaCadastro');
        } else {

            //SQL
            let sql = `INSERT INTO produtos (nome, valor, imagem, categoria)
            VALUES ('${nome}', ${valor}, '${imagem}', '${categoria}')`;

            //Executar comando SQL
            conexao.query(sql, (erro, result) => {
                //Caso ocorra algum erro
                if (erro) throw erro;

                //Caso ocorra o cadastro
                req.files.imagem.mv(__dirname + '/images/' + req.files.imagem.name);
                console.log(result);
            });

            //Retornar para a rota principal
            res.redirect('/sucessoCadastro');
        }


    } catch (e) {
        res.redirect('/falhaCadastro');
    }
}

//Função para realizar a remoção de produtos
function removerProduto(req, res) {
     //Tratamento de excessão
     try {

        //SQL
        let sql = `DELETE FROM produtos WHERE codigo = ${req.params.codigo}`;

        //Executar o comando SQL
        conexao.query(sql, (erro, result) => {
            //Caso falha
            if (erro) throw erro;

            //Caso sucesso
            fs.unlink(__dirname + '/images/' + req.params.imagem, (erro_imagem) => {
                console.log('Falha ao remover a imagem');
            });
        });

        res.redirect('/sucessoRemover');
    } catch (e) {
        res.redirect('/falhaRemover')
    }
}

//Função para exibir o formulário para edição de produtos
function formularioEditar(req, res) {
    //SQL
    let sql = `SELECT * FROM produtos WHERE codigo = ${req.params.codigo}`;

    //Executar comando SQL
    conexao.query(sql, (erro, result) => {
        //Se erro
        if (erro) throw erro;

        //Se sucesso
        res.render('formularioEditar', { produto: result[0] });
    });
}

//Função responsável para edição de produtos
function editarProduto(req, res) {
    //Obter os dados do formulário
    let nome = req.body.nome;
    let valor = req.body.valor;
    let codigo = req.body.codigo;
    let nomeImagem = req.body.nomeImagem;

    //Validar nome do produto e valor
    if (nome == '' || valor == '' || isNaN(valor)) {
        res.redirect('/falhaEdicao');
    } else {

        //Definir o tipo de edição
        try {

            //Objeto imagem
            let imagem = req.files.imagem;

            //SQL
            let sql = `UPDATE produtos SET nome='${nome}', valor=${valor}, imagem='${imagem.name}'
            WHERE codigo = ${codigo}`;

            //Executar comando SQL
            conexao.query(sql, (erro, result) => {
                //SE ERRO
                if (erro) throw erro;

                //Remover imagem antiga
                fs.unlink(__dirname + '/images/' + nomeImagem, (erro) => {
                    console.log('Falha ao remover a imagem!')
                });

                //cadastrar nova imagem
                imagem.mv(__dirname + '/images/' + imagem.name);
            });

        } catch (e) {

            //SQL
            let sql = `UPDATE produtos SET nome='${nome}', valor=${valor} WHERE codigo = ${codigo}`;

            //Executar comando SQL
            conexao.query(sql, (erro, result) => {
                //SE ERRO
                if (erro) throw erro;
            });
        }

        //Redirecionamento
        res.redirect('/sucessoEdicao');
    }
}

//Exportar funções
module.exports = {
    formularioCadastro,
    formularioCadastroComSituacao,
    formularioEditar,
    listagemProdutos,
    pesquisa,
    cadastrarProduto,
    removerProduto,
    editarProduto
};