# Link da Documentação

- https://documenter.getpostman.com/view/10580830/2s9YR85Z4s

# Titulo do Teste

Hotel Reservation

## RFs Requisitos Funcionais

- [] Deve ser possível cadastrar um Hotel
- [] Deve ser possível cadastrar um usuário
- [] Dever ser possível ver os dados de um usuário
- [] Deve ser possível ver os dados de um Hotel
- [] Deve ser possível obter o numero de vagas restantes daquele hotel
- [] Deve ser possível obter os Hotéis que aquele usuário está inscrito
- [] Deve ser possível buscar os Hotéis próximos
- [] Deve ser possível pesquisar um Hotel pelo nome

## Regras de Negócio

- [] O usuário não deve pode se cadastrar com um e-mail duplicado
- [] O usuário não pode reservar uma vaga no Hotel se já estiver com uma vaga vigente
- [] Não será permitido o cadastro de pessoas em um hotel se o número de quartos forem esgotados
- [] Não pode ser possível registrar 2 hotéis com o mesmo CNPJ

## Requisitos Não Funcionais

- [] O Id de cada registro na tabela deve ser um UUID
- [] Os dados ficarão em um banco PostgreSQL
- [] Todas listas de dados precisam estar paginadas com 20 itens por página
- [] Para o Gerenciamento das regras de negócio utilizar respositorie
- [] Para cada recurso da regra de neǵocio criar um use case
- [] Para cada caso de uso realizar um teste unitário
- [] Para a representação dos repositories nos testes utilizar um repository em memória