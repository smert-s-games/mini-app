/**
 * One-shot setup: description, short description, commands, menu button (WebApp).
 * Usage:
 *   export BOT_TOKEN=...
 *   export MINIAPP_URL=https://smert-s-games.github.io/mini-app/
 *   node setup.js
 */

const TOKEN = process.env.BOT_TOKEN;
const MINIAPP_URL = (process.env.MINIAPP_URL || 'https://smert-s-games.github.io/mini-app/').replace(/\/?$/, '/');

if (!TOKEN) {
  console.error('Set BOT_TOKEN env var. Do not hardcode the token in files.');
  process.exit(1);
}

const API = `https://api.telegram.org/bot${TOKEN}`;

async function api(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error(method, data);
    throw new Error(data.description || method);
  }
  console.log('OK', method);
  return data.result;
}

async function main() {
  await api('setMyName', {
    name: '1WIN Зеркало',
  });

  await api('setMyDescription', {
    description:
      'Официальное зеркало 1WIN.\n'\n +
      'Быстрый вход · промокод на 500% к первому пополнению · топ-слоты.\n'\n +
      '18+ · Играйте ответственно.',
  });

  await api('setMyShortDescription', {
    short_description: 'Зеркало 1WIN · 500% бонус · вход в 1 клик',
  });

  await api('setMyCommands', {
    commands: [
      { command: 'start', description: 'Открыть зеркало и забрать бонус' },
      { command: 'bonus', description: 'Промокод 500%' },
      { command: 'play', description: 'Популярные слоты' },
      { command: 'privacy', description: 'Политика конфиденциальности' },
    ],
  });

  // Blue menu button opens Mini App
  await api('setChatMenuButton', {
    menu_button: {
      type: 'web_app',
      text: 'Открыть 1WIN',
      web_app: { url: MINIAPP_URL },
    },
  });

  console.log('\nSetup done.');
  console.log('Menu button URL:', MINIAPP_URL);
  console.log('Run: node bot.js');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
