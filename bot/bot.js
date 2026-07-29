/**
 * Polling bot — styled entry to Mini App.
 * Token ONLY from env. Never commit real token.
 *
 *   export BOT_TOKEN=...
 *   export MINIAPP_URL=https://smert-s-games.github.io/mini-app/
 *   node bot.js
 */

const TOKEN = process.env.BOT_TOKEN;
const MINIAPP_URL = (process.env.MINIAPP_URL || 'https://smert-s-games.github.io/mini-app/').replace(/\/?$/, '/');
const PRIVACY_URL = MINIAPP_URL + 'privacy.html';

if (!TOKEN) {
  console.error('Set BOT_TOKEN. Do not put the token in the repo.');
  process.exit(1);
}

const API = `https://api.telegram.org/bot${TOKEN}`;
let offset = 0;

async function api(method, body = {}) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error(method, data);
    return null;
  }
  return data.result;
}

function webAppKeyboard(extraRows = []) {
  return {
    inline_keyboard: [
      [
        {
          text: '🚀 Открыть зеркало 1WIN',
          web_app: { url: MINIAPP_URL },
        },
      ],
      ...extraRows,
    ],
  };
}

function startText(firstName) {
  const name = firstName ? `, ${firstName}` : '';
  return (
    `🎰 <b>1WIN — официальное зеркало</b>\n\n` +
    `Привет${name}!\n\n` +
    `Здесь быстрый и безопасный вход.\n` +
    `Промокод на <b>500% бонус</b> к первому пополнению.\n\n` +
    `🎁 Код: <code>WINARYA</code>\n\n` +
    `Жми кнопку ниже — откроется приложение.`
  );
}

function bonusText() {
  return (
    `💎 <b>Промокод</b>\n\n` +
    `<code>WINARYA</code>\n\n` +
    `500% бонус к первому пополнению.\n` +
    `Скопируй код и открой зеркало.`
  );
}

function playText() {
  return (
    `🔥 <b>Популярные игры</b>\n\n` +
    `• Sugar Rush 1000\n` +
    `• Gates of Olympus\n` +
    `• Starlight Princess\n` +
    `• The Dog House\n\n` +
    `Открой приложение и выбери слот.`
  );
}

async function send(chatId, text, reply_markup) {
  return api('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup,
  });
}

async function handleMessage(msg) {
  if (!msg || !msg.chat) return;
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim();
  const firstName = msg.from && msg.from.first_name;

  if (text.startsWith('/start')) {
    await send(chatId, startText(firstName), webAppKeyboard([
      [{ text: '📋 Промокод WINARYA', callback_data: 'bonus' }],
      [{ text: '📜 Политика', url: PRIVACY_URL }],
    ]));
    return;
  }

  if (text.startsWith('/bonus')) {
    await send(chatId, bonusText(), webAppKeyboard());
    return;
  }

  if (text.startsWith('/play')) {
    await send(chatId, playText(), webAppKeyboard());
    return;
  }

  if (text.startsWith('/privacy')) {
    await send(
      chatId,
      'Политика конфиденциальности — как мы обрабатываем данные в Mini App.',
      {
        inline_keyboard: [[{ text: 'Открыть политику', url: PRIVACY_URL }]],
      }
    );
    return;
  }

  // any other text → soft redirect to app
  await send(
    chatId,
    'Чтобы войти в 1WIN и забрать бонус — открой приложение 👇',
    webAppKeyboard()
  );
}

async function handleCallback(cq) {
  if (!cq || !cq.message) return;
  const chatId = cq.message.chat.id;
  if (cq.data === 'bonus') {
    await send(chatId, bonusText(), webAppKeyboard());
  }
  await api('answerCallbackQuery', { callback_query_id: cq.id });
}

async function loop() {
  console.log('Bot running. Mini App:', MINIAPP_URL);
  for (;;) {
    try {
      const updates = await api('getUpdates', {
        offset,
        timeout: 30,
        allowed_updates: ['message', 'callback_query'],
      });
      if (!updates) {
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      for (const u of updates) {
        offset = u.update_id + 1;
        if (u.message) await handleMessage(u.message);
        if (u.callback_query) await handleCallback(u.callback_query);
      }
    } catch (e) {
      console.error('loop error', e);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

loop();
