# Joker Service

Сервис позволяет получать отборные шутки посредством Graphql.

## Документация

[Читать документацию!](https://www.apollographql.com/docs/)

## Как начать работу с данным сервисом

### Выполнение нескольких команды:

- 1 - `git clone https://github.com/ArtemGuzhov/ilink-service.git`
- 2 - `cd ilink-service`
- 3 - `npm start or yarn start`

### Используя Docker:

Убедитесь, что на вашем компьютере установлен docker.

Документацию по Docker:
[Docker](https://docs.docker.com/install/).

- 1 - `docker build -t ilink .`

Запустить образ в интерактивном режиме:

- 2.1 - `docker run -it -p 8008:8008 ilink`

Или запустить образ в тихом(daemon) режиме:

- 2.2 - `docker run -d -p 8008:8008 ilink`
