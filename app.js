const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const slots = [
  { id: 1, name: 'Sugar Rush 1000', rtp: '96.5%', volatility: 'High', image: 'https://winarya.pro/images/...', link: 'https://1win.com?ref=WINARYA' },
  { id: 2, name: 'Gates of Olympus 1000', rtp: '96.5%', volatility: 'High', image: '...', link: '...' },
  // More from Winarya
];

function renderSlots(filter = 'all') {
  // logic with filters
}
// ... full updated code