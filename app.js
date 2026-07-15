const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Sample slots data - later from JSON or backend
const slots = [
    {
        id: 1,
        name: "Sugar Rush",
        rtp: "96.5%",
        image: "https://via.placeholder.com/300x200/ffcc00/000?text=Sugar+Rush",
        link: "https://example-casino.com/register?ref=yourref&slot=sugarrush"
    },
    {
        id: 2,
        name: "Gates of Olympus",
        rtp: "96.5%",
        image: "https://via.placeholder.com/300x200/9933ff/fff?text=Gates+Olympus",
        link: "https://example-casino.com/register?ref=yourref&slot=gates"
    }
    // Add more
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
                <button onclick="playSlot(${slot.id})">Играть с бонусом</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function playSlot(id) {
    const slot = slots.find(s => s.id === id);
    if (slot) {
        tg.openLink(slot.link);
    }
}

// Init
renderSlots();

// Theme handling
if (tg.colorScheme === 'dark') {
    // already dark
}