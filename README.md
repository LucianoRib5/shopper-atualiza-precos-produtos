# shopper-atualiza-precos-produtos

## Ferramenta para atualização em massa de preços de produtos

### ⚙️ Features

- [x] Selecionar um arquivo CSV, contendo os dados para atualização
- [x] Validação do arquivo:
- Todos os campos necessários existem?
- Os códigos de produtos informados existem?
- Os preços estão preenchidos e são valores numéricos válidos?
- Os preços de venda dos produtos estão acima do custo deles?
- Os reajustes, respeitão a regra: maior ou menor do que 10% do preço atual do produto ?
- [x] Mostrar as informações que foram enviadas no formato: Codigo, Nome, Preço Atual, Novo Preço 
- [x] O sistema também deve ter um botão ATUALIZAR. Que só ficará habilitado se todos os produtos dos arquivos estiverem validados e sem regras quebradas.
- [ ] Caso uma ou mais regras de validação tenham sido quebradas, o sistema exibe ao lado de cada produto qual regra foi quebrada. (pendente)

### 🛠 Tecnologias

Ferramentas utilizadas na construção do projeto:

- [Node.js](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [MUI](https://mui.com/)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com/), [Node.js](https://nodejs.org/en).
 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Instruções gerais

```bash
# Clone este repositório
$ git clone <https://github.com/LucianoRib5/shopper-atualiza-precos-produtos.git>
```

### 🎲 Rodando o Back End (servidor)

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd shopper-atualiza-precos-produtos

# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install

# Crie um arquivo .env na raiz do projeto, com as seguintes informações (complete as aspas com seu acesso a sua database(MySQL)):
DB_HOST = ""
DB_USER = ""
DB_PASSWORD = ""
DB_SCHEMA = ""

# Execute o script dev
$ npm run dev

# O servidor iniciará na porta:3003.
```

### 🖥️ Rodando o Front end

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd shopper-atualiza-precos-produtos

# Vá para a pasta frontend
$ cd frontend

# Instale as dependências
$ npm install

# Execute o script dev
$ npm run dev

# O servidor iniciará na porta:5173 ou acesse http://localhost:5173/.
```


### Autor
---
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/89327618?v=4" width="100px;" alt=""/>
 
 <sub><b>Luciano Ribeiro</b></sub>


Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Luciano-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/luciano-ribeiro-santos/)
