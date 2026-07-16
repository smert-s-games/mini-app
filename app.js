const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const slots = [
  { id: 1, name: "Sugar Rush 1000", rtp: "96.5%", volatility: "High", image: "https://via.placeholder.com/300x200/ffcc00/000?text=Sugar+Rush", link: "https://1win.com?ref=WINARYA" },
  { id: 2, name: "Gates of Olympus 1000", rtp: "96.5%", volatility: "High", image: "https://via.placeholder.com/300x200/9933ff/fff?text=Gates", link: "https://1win.com?ref=WINARYA" },
  { id: 3, name: "Starlight Princess 1000", rtp: "96.5%", volatility: "High", image: "https://via.placeholder.com/300x200/00ff9f/000?text=Starlight", link: "https://1win.com?ref=WINARYA" },
  { id: 4, name: "The Dog House", rtp: "96.51%", volatility: "Medium", image: "https://via.placeholder.com/300x200/ff2d55/fff?text=Dog+House", link: "https://1win.com?ref=WINARYA" },
  { id: 5, name: "Joker Stoker", rtp: "98.07%", volatility: "High", image: "https://via.placeholder.com/300x200/ffd700/000?text=Joker", link: "https://1win.com?ref=WINARYA" },
  // Добавь ещё из Winarya
];

function renderSlots() {
  const grid = document.getElementById('slotGrid');
  grid.innerHTML = '';
  slots.forEach(slot => {
    const card = document.createElement('div');
    card.className = 'slot-card';
    card.innerHTML = `
      <img src="${slot.image}" alt="${slot.name}">
      <div class="slot-info">
        <div class="slot-name">${slot.name}</div>
        <div class="slot-rtp">RTP: ${slot.rtp}</div>
        <button onclick="playSlot(${slot.id})">Играть с бонусом WINARYA</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function playSlot(id) {
  const slot = slots.find(s => s.id === id);
  if (slot) tg.openLink(slot.link);
}

renderSlots();
