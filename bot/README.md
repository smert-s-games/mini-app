# Telegram-бот → Mini App 1WIN

Вход в преленд-приложение. Токен **только** в переменных окружения.

## Важно про токен

1. Если токен уже светился в чате/коде — в BotFather: `/revoke` и выпусти новый.
2. Не коммить `.env` и реальный `BOT_TOKEN`.
3. В репозитории только `.env.example`.

## Mini App URL

```
https://smert-s-games.github.io/mini-app/
```

(Если Pages на другом адресе — поменяй `MINIAPP_URL`.)

## Быстрый старт

```bash
cd bot
export BOT_TOKEN="НОВЫЙ_ТОКЕН_ОТ_BOTFATHER"
export MINIAPP_URL="https://smert-s-games.github.io/mini-app/"

# описание, команды, синяя кнопка меню WebApp
node setup.js

# бот в режиме polling
node bot.js
```

Нужен Node.js 18+.

## Что делает бот

| Команда / элемент | Действие |
|-------------------|----------|
| `/start` | Приветствие + кнопка WebApp «Открыть зеркало 1WIN» |
| `/bonus` | Промокод WINARYA + 500% |
| `/play` | Список слотов + вход в приложение |
| `/privacy` | Ссылка на политику |
| Menu button | Синяя кнопка слева в чате → Mini App |

## Хостинг

GitHub **не** держит polling 24/7. Варианты:

- VPS / Railway / Render / Fly.io — `node bot.js`
- или только `setup.js` (меню + описание), а трафик вести кнопкой меню без постоянного процесса

Для `start_param` (источник):  
`https://t.me/USERNAME_БОТА/app?startapp=ads1`  
(если подключил Mini App через BotFather → Bot Settings → Configure Mini App)

## BotFather

1. `/newbot` или существующий бот  
2. `/setmenubutton` — можно вручную, либо через `setup.js`  
3. Domain для WebApp должен совпадать с GitHub Pages (BotFather → Domain)
