# Sistema de Gestão de Estoque em Realidade Virtual (CRUD VR)

Este projeto consiste em uma aplicação de Realidade Virtual (RV) funcional que implementa as operações fundamentais de um CRUD (Create, Read, Update e Delete) integradas a um ambiente imersivo e a um banco de dados em tempo real na nuvem.

## 1. Objetivo do Projeto
A aplicação simula um ambiente de almoxarifado industrial onde o usuário gerencia lotes de materiais representados por objetos 3D. O desafio técnico superado foi a evolução de uma interface baseada em mouse para uma imersão 100% VR (Interação pelo Olhar), integrada a uma arquitetura Serverless para garantir que as interações no espaço 3D reflitam em tempo real e de forma persistente para qualquer usuário.

## 2. Tecnologias Utilizadas
* **Frontend**: HTML5, JavaScript Vanilla (ES Modules), A-Frame.js (WebVR).
* **Backend / Banco de Dados**: Firebase Realtime Database (BaaS - Backend as a Service).
* **Hospedagem**: Vercel (Static Site).

## 3. Arquitetura do Sistema
O projeto foi reestruturado para uma abordagem 100% Front-end consumindo serviços em nuvem:

* **index.html**: Definição da cena 3D, iluminação, assets (áudio) e interface de usuário (UI Panel). Implementa a câmera com sistema Fuse (Gaze Timer).
* **app.js**: Lógica de negócio, manipulação do DOM 3D e controle de estados da aplicação.
* **db.js**: Camada de serviço (Service Layer) que utiliza o SDK do Firebase via CDN para realizar requisições assíncronas diretamente ao Realtime Database.

## 4. Funcionalidades (CRUD)
O sistema interage perfeitamente com a árvore JSON do Firebase:

* **CREATE (POST)**: Gera um novo objeto 3D com forma aleatória e ID único. A posição é calculada via algoritmo de grid e o nó é criado no banco.
* **READ (GET)**: Ao iniciar a cena, o sistema consulta o Firebase e renderiza todos os itens previamente salvos em suas coordenadas e estados exatos.
* **UPDATE (PATCH)**: Permite a alteração visual do material. Ao focar em um objeto nos modos de edição, sua cor ou forma geométrica é alterada e o novo estado é persistido na nuvem.
* **DELETE (DELETE)**: Remove o objeto selecionado da cena 3D e deleta o registro correspondente no nó do banco de dados.

## 5. Como Executar
Como o projeto agora é uma aplicação estática consumindo uma API em nuvem, não é necessária a instalação de dependências locais ou servidores Node.

1. Basta clonar o repositório e abrir o arquivo index.html no seu navegador (recomendado o uso da extensão Live Server no VS Code).
   

## 6. Diferenciais Implementados

* **nteração 100% VR (Gaze Interaction)**: Substituição do clique tradicional por um Reticle Pointer (Mira). As ações são confirmadas ao manter o olhar sobre os elementos (sistema Fuse), permitindo o uso em headsets VR reais ou mobile sem controles extras.
* **Feedback Visual**: Efeitos de animação na mira e feedback sonoro (bipes) ao confirmar uma ação, compensando a falta de feedback tátil e melhorando drasticamente a UX.
* **Sistema de Grid Dinâmico**: O tipo de objeto (caixa, esfera, cone ou cilindro) é salvo no banco, garantindo que a cena permaneça idêntica após o recarregamento.
* **Arquitetura Cloud/Serverless**: Substituição do banco de dados local por persistência global em tempo real via Firebase, permitindo acesso multiplataforma sem perda de dados.

Desenvolvedores: Pedro H. A. Nascimento, Yago Barbosa de Andrade Oliveira,  Laila Maria Silva Pereira e José Luiz Henrique Pereira

Disciplina: Realidade Virtual
