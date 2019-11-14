<h2 align="center"><img height="80" src="https://scoring.mn/logo.png" /><br>Scoring.mn</h2>

В данном репозитории хранится код API (директория `api`) и веб-версии (`web-client`) Minter Scoring.

## Front-End

Для веб-версии используется Vue + Typescript.

Запуск разработки:

```
npm run serve
```

Собрать проект:

```
npm run build
```

## Back-End

NodeJS + Express + MongoDB;

Есть разделение на процессы:

**server.js**

Express Server + API

**bot-worker.js**

Приложение для работы Telegram-бота

**minterscan-worker**

Раз в 10 минут заносит в БД профили Minterscan

**genesis/set-genesis.js**

Необходимо запустить единожды перед стартом приложения для сохранения в БД данных генезис-блока
