# Sistema de Gestão de Estoque em Realidade Virtual (CRUD VR)

Este projeto consiste em uma aplicação de Realidade Virtual (RV) funcional que implementa as operações fundamentais de um CRUD (Create, Read, Update e Delete) integradas a um ambiente imersivo e a um banco de dados persistente.

## 1. Objetivo do Projeto
A aplicação simula um ambiente de almoxarifado industrial onde o usuário gerencia lotes de materiais representados por objetos 3D. O desafio técnico superado foi a integração de uma interface imersiva desenvolvida em A-Frame com um back-end em Node.js, garantindo que as interações no espaço 3D reflitam em tempo real no banco de dados.

## 2. Tecnologias Utilizadas
* **Frontend**: HTML5, JavaScript (ES6+), A-Frame.js (WebVR).
* **Backend**: Node.js, Express.js.
* **Banco de Dados**: JSON Server.
* **Ambiente de Execução**: Node.js (v16 ou superior).

## 3. Arquitetura do Sistema
O projeto foi estruturado seguindo a separação de responsabilidades para facilitar a manutenção:

* **index.html**: Definição da cena 3D, iluminação, cenário e interface de usuário (UI Panel).
* **app.js**: Lógica de negócio, manipulação do DOM 3D e controle de estados da aplicação.
* **db.js**: Camada de serviço (Service Layer) responsável pelas requisições assíncronas (Fetch API) aos endpoints.
* **server.js**: Servidor unificado que provê os arquivos estáticos e os middlewares da API REST.
* **db.json**: Arquivo de persistência onde os estados dos objetos são armazenados.

## 4. Funcionalidades (CRUD)
O sistema respeita rigorosamente os verbos HTTP para cada operação:

* **CREATE (POST)**: Gera um novo objeto 3D com forma aleatória e ID único. A posição é calculada via algoritmo de grid para evitar sobreposição automática.
* **READ (GET)**: Ao iniciar a cena, o sistema consulta o banco e renderiza todos os itens previamente salvos em suas coordenadas exatas.
* **UPDATE (PATCH)**: Permite a inspeção do material. Ao clicar em um objeto no modo de edição, sua cor é alterada e o novo estado é persistido no servidor.
* **DELETE (DELETE)**: Remove o objeto selecionado da cena 3D e deleta o registro correspondente no banco de dados.

## 5. Como Executar

1. Instale as dependências do projeto:
   npm install

2. Inicie o servidor unificado:
   npm start

3. Acesse a aplicaçao no navegador:
   http://localhost:3000


## 6. Diferenciais Implementados

* **Sistema de Grid Dinâmico**: Os itens são organizados automaticamente em colunas e linhas conforme a quantidade de registros.
* **Feedback Visual**: Efeitos de escalonamento (hover) ao interagir com os objetos para melhorar a experiência do usuário (UX).
* **Persistência de Forma**: O tipo de objeto (caixa, esfera, cone ou cilindro) é salvo no banco, garantindo que a cena permaneça idêntica após o recarregamento.

Desenvolvedor:Pedro Nascimento

Disciplina: Realidade Virtual