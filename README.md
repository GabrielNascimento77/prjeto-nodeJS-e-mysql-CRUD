# CRUD de Produtos com Node.js e MySQL

Este projeto é uma aplicação de cadastro e gerenciamento de produtos utilizando Node.js, Express, MySQL e Express-Handlebars para a renderização de páginas dinâmicas. A aplicação também permite upload de imagens para os produtos.

---

## 🚀 Funcionalidades

- Cadastro de produtos com upload de imagens.
- Listagem de produtos por categorias ou todos.
- Pesquisa de produtos pelo nome.
- Remoção de produtos (incluindo a exclusão da imagem).
- Edição de produtos com ou sem alteração de imagens.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.
- **Banco de Dados:** MySQL.
- **Template Engine:** Express-Handlebars.
- **CSS Framework:** Bootstrap.
- **Upload de Arquivos:** express-fileupload.

---

## 📂 Estrutura do Projeto

```bash
|-- app.js                # Arquivo principal do servidor
|-- css/                  # Arquivos de estilo
|-- images/               # Imagens dos produtos
|-- node_modules/         # Dependências do projeto
|-- views/                # Templates Handlebars
|   |-- formulario.handlebars
|   |-- lista.handlebars
|   |-- formularioEditar.handlebars
|-- routes/               # Rotas da aplicação
|   |-- rota_produtos.js
|-- servicos/             # Lógica de negócios
|   |-- produtos_servicos.js
|-- bd/                   # Conexão com o banco de dados
|   |-- conexao.js
```

---

## 🔧 Configuração e Execução do Projeto

### 1. Clonar o Repositório

```bash
git clone git@github.com:seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar Dependências

Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, execute:

```bash
npm install
```

### 3. Configurar o Banco de Dados

- Crie um banco de dados no MySQL chamado `produtos`.
- Execute o seguinte script para criar a tabela:

```sql
CREATE TABLE produtos (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  imagem VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL
);
```
- Configure a conexão com o banco de dados no arquivo `bd/conexao.js`.

```javascript
const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'produtos'
});

module.exports = conexao;
```

### 4. Executar o Servidor

Inicie o servidor com o comando:

```bash
node app.js
```

O servidor estará disponível em: `http://localhost:8080`

---

## 🔄 Rotas da Aplicação

### Página Principal
- **Rota:** `/`
- **Descrição:** Exibe o formulário para cadastro de produtos.

### Cadastro de Produtos
- **Rota:** `/cadastrar`
- **Método:** `POST`
- **Descrição:** Realiza o cadastro de um produto.

### Listagem de Produtos
- **Rota:** `/listar/:categoria`
- **Método:** `GET`
- **Descrição:** Exibe os produtos de uma categoria específica ou todos.

### Pesquisa de Produtos
- **Rota:** `/pesquisa`
- **Método:** `POST`
- **Descrição:** Busca produtos pelo nome.

### Remoção de Produtos
- **Rota:** `/remover/:codigo&:imagem`
- **Método:** `GET`
- **Descrição:** Remove um produto pelo código e exclui a imagem associada.

### Edição de Produtos
- **Rota:** `/editar`
- **Método:** `POST`
- **Descrição:** Edita os detalhes de um produto.

### Formulário de Edição
- **Rota:** `/formularioEditar/:codigo`
- **Método:** `GET`
- **Descrição:** Exibe o formulário para editar um produto.

---

## 🖼️ Exemplos de Páginas

### 1. Página Inicial
Formulário para cadastro de produtos com os campos:
- Nome do Produto
- Valor
- Imagem
- Categoria

### 2. Listagem de Produtos
Exibe uma tabela com os produtos cadastrados, incluindo:
- Nome
- Valor
- Imagem
- Ações (Editar/Remover).

---

## 📝 Melhorias Futuras

- Implementar autenticação para maior segurança.
- Adicionar validações mais robustas para os formulários.
- Criar paginação para a listagem de produtos.
- Adicionar testes automatizados para validação das funcionalidades.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar issues ou pull requests para melhorias no projeto.

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
