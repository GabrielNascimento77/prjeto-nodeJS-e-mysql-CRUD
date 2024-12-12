//importar módulo express
const express = require('express');

//importar módulo express fileupload
const fileupload = require('express-fileupload');

//importar módulo express handlebars
const { engine } = require('express-handlebars');

//Importar o módulo de rotas
const rota_produto = require('./routes/rota_produtos');

//App
const app = express();

//Habilitando o upload de arquivos
app.use(fileupload());

//Adicionar bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

//Adicionar css
app.use('/css', express.static('./css'));

//Referenciar a pasta de imagens
app.use('/images', express.static('./images'));

//Configuração do express-handlebars
app.engine('handlebars', engine({
    helpers: {
        //Função auxiliar para verificar igualdade
        condicionalIgualdade: (param1, param2, options) => {
            return param1 === param2 ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Manupulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas
app.use('/', rota_produto);

//Servidor
app.listen(8080);