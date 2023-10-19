# Passo a Passo para executar o projeto

- Copie e renomeie o arquivo .env.example para .env
- rode o comando docker-compose up -d
- rode o comando npm i
- rode o comando npx prisma migrate dev
- no seu gerenciador de banco o PostgreSQL é executado na porta 5432 com o username e password "teste"
- rode o comando npm run dev
- pronto para utilizar a aplicação

# Link da Documentação

- https://documenter.getpostman.com/view/10580830/2s9YR85Z4s

# Titulo do Teste

Hotel Reservation

## Requisitos Funcionais

- [x] Deve ser possível cadastrar um Hotel
- [x] Deve ser possível editar um Hotel
- [x] Deve ser possível remover um Hotel
- [x] Deve ser possível ver os dados de um Hotel
- [x] Deve ser possível cadastrar um usuário
- [x] Deve ser possível editar um usuário
- [x] Deve ser possível remover um usuário
- [x] Deve ser possível ver os dados de um usuário
- [x] Deve ser possível obter o número de vagas restantes daquele hotel
- [x] Deve ser possível obter os Hotéis que aquele usuário está inscrito
- [x] Deve ser possível vincular um usuário a um Hotel

## Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um e-mail e cpf duplicado
- [x] Não será permitido o cadastro de pessoas em um hotel se o número de quartos forem esgotados
- [x] Não pode ser possível registrar 2 hotéis com o mesmo CNPJ

## Requisitos Não Funcionais

- [x] O Id de cada registro na tabela deve ser um UUID
- [x] Os dados ficarão em um banco PostgreSQL
- [x] Para o Gerenciamento das regras de negócio utilizar respository
- [x] Para cada recurso da regra de neǵocio criar um use case
- [x] Para cada caso de uso realizar um teste unitário
- [x] Para a representação dos repositories nos testes utilizar um repository em memória
- [x] Adicionar decorators para validar as requests do controller

## ⚠️ Obs ⚠️
- Para fins de forma para facilitar a execução dos testes irei colocar a execução dos teste no momento de run do projeto com o seguinte comando "npm run dev"