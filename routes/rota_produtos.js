//importar módulo express
const express = require('express');

//Extraindo a função Router do módulo express
const router = express.Router();

//Importar módulo de serviços
const servico = require('../servicos/produtos_servico');

// **** ROTAS

//Rota principal
router.get('/', (req, res) => {
    servico.formularioCadastro(req, res);
});

//Rota principal contendo situação
router.get('/:situacao', (req, res) => {
    servico.formularioCadastroComSituacao(req, res);
});

//Rota de cadastro
router.post('/cadastrar', (req, res) => {
    servico.cadastrarProduto(req, res);
});

//Rota para remover produtos
router.get('/remover/:codigo&:imagem', (req, res) => {
    servico.removerProduto(req, res);
});

//Rota para redirecionar para o formulário de alteração/edição
router.get('/formularioEditar/:codigo', (req, res) => {
    servico.formularioEditar(req, res);    
});

//Rota editar produtos
router.post('/editar', (req, res) => {
    servico.editarProduto(req, res);
});

//Rota de listagem
router.get('/listar/:categoria', (req, res) => {
    servico.listagemProdutos(req, res);
});

//Rota de pesquisa
router.post('/pesquisa', (req, res) => {
    servico.pesquisa(req, res);
});


//Exportar o router
module.exports = router;