#  "Mini-Banco-Central"

##  Tecnologias Utilizadas

- Node.js
  
- Express
  
- Sequelize ORM
  
- PostgreSQL (via [Neon.tech](https://neon.tech))
  
- dotenv


"dependencies": {

  "dotenv": "^16.4.7",
  
  "express": "^5.1.0",
  
  "pg": "^8.14.1",
  
  "pg-hstore": "^2.3.4",
  
  "sequelize": "^6.37.7",
  
  "sequelize-cli": "^6.6.2"
}

## Para usar este projeto

1. Clone o repositório

2. Instale as dependências

3. Configure o arquivo .env
   
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DATABASE_URL=postgres://<usuario>:<senha>@<host>.neon.tech/<nome_do_banco>?sslmode=require

Você pode obter essa URL diretamente do painel do Neon.tech.

4. Execute as migrations:
   
npx sequelize db:migrate

5. Inicie o servidor
   
node app.js

# Funcionalidades

 Cadastro de Usuários
 
 Cadastro de Instituições Financeiras
 
 Criação de Contas Bancárias
 
 Registro de Transações
 
 Consulta de Saldo Atual

# Exemplos de Endpoints

Método	        Rota	                          Descrição

POST	           /usuarios     	                Criar novo usuário

GET           	/usuarios	                      Listar usuários

POST	          /instituicoes 	                Criar nova instituição

GET	            /instituicoes	                  Listar instituições

POST           	/contas	                        Criar nova conta bancária

GET	             /contas/:id/saldo             	Consultar saldo atual da conta

POST	           /transacoes	                  Registrar nova transação

GET	            /transacoes/extrato	            Relatório de extrato consolidado

# Observações:
O projeto usa Sequelize ORM com migrations versionadas.

