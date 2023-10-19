# FullCycleRocks  

Projeto desafio do curso Full Cycle 3.0. Proxy reverso com nginx que roteia para app em node que gera cria nomes randomicos num databse mysql e retorna uma lista dos nomes gerados

  - A imagem do nginx é construída utilizando diretório local com a configuração para 
  As imagem do nginx é construída utilizando diretório local com a configuração para 

## Project scaffolding
  - docker-compose.yaml: arquivo de montagem da composição docker para montar e configurar as imagens do nginx, node e mysql 
  - nginx: volume externo do nginx no docker
  -- Dockerfile: arquivo de instruções do docker para gerar a imagem nginx
  -- nginx.conf: arquivo de configuração do nginx
  - node: diretório da aplicação em node
  -- create_database.js: script para criação do database e da tabela da aplicação 
  -- healtchek.js: script chamado pelo docker para avaliar o healtcheck da aplicação. o arquivo chama um endpoint da aplicação em si para verificar se já está rodando (poderia chamar diretamente a aplicação também)
  -- node/index.js: aplicação principal
  - mysql: folder para montar o volume externo do doker


## Build
Para gerar as imagens utilizar o comando `docker-compose build`

## Run
- Para rodar a imagem: `docker-compose up`
- OBS: o container do nginx depende do node para subir, então pode levar uns 10 a 20 segundos para o nginx responder
- Acessar localhost:8080 
