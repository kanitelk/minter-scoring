<h2 align="center"><img height="80" src="https://scoring.mn/logo.png" /><br>Scoring.mn</h2>

В данном репозитории хранится код API (директория `api`) и веб-версии (`web-client`) Minter Scoring.

Для установки зависимостей выполните `npm install` в нужных директориях.

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

Стэк: NodeJS + Express + MongoDB

Есть разделение на процессы:

**server.js**

Express Server + API

**bot-worker.js**

Приложение для работы Telegram-бота

**minterscan-worker**

Раз в 10 минут заносит в БД профили Minterscan

**genesis/set-genesis.js**

Необходимо запустить единожды перед стартом приложения для сохранения в БД данных генезис-блока

Для работы API создайте `config.js` файл в директории `api` следующего содержания (скоро это будет перенесено в переменные окружения):

```js
const config = {
  db: "mongodb://localhost:27017/scoring",
  port: process.env.PORT || 3003,
  nodeURL: "https://api.minter.one",
  explorerURL: "https://explorer-api.minter.network/api/v1",
  botToken: "{TELEGRAM BOT TOKEN}",
  updateDuration: 60, // scoring cache time in seconds
  socksHost: "185.232.232.232", // socks for telegram bot
  socksPort: 9999,
  socksUsername: "name",
  socksPassword: "pass",
  apiRateLimit: 100, // API request limit per hour
  blackListSecret: "mysecret"
};

module.exports = config;

```
