// Calendar data with daily content
const calendarData = {
  1: { content: '🎄 Welcome to December! Time to start the countdown to Christmas!', emoji: '🎄' },
  2: { content: "❄️ Snowflakes are nature's tiny miracles", emoji: '❄️' },
  3: { content: "🎅 Santa's elves are busy in the workshop", emoji: '🎅' },
  4: { content: '🦌 Rudolph is practicing his flying', emoji: '🦌' },
  5: { content: '🎁 The art of gift wrapping begins', emoji: '🎁' },
  6: { content: '⭐ Stars shine brighter in December', emoji: '⭐' },
  7: { content: "🍪 Cookie baking day! Don't forget the milk", emoji: '🍪' },
  8: { content: '🕯️ Light a candle for peace and joy', emoji: '🕯️' },
  9: { content: '🎨 Time to decorate the tree', emoji: '🎨' },
  10: { content: '🧦 Hang up your stockings with care', emoji: '🧦' },
  11: { content: '🎵 Caroling time! Fa la la la la', emoji: '🎵' },
  12: { content: '☃️ Would you like to build a snowman?', emoji: '☃️' },
  13: { content: '🎭 Christmas pageant rehearsal day', emoji: '🎭' },
  14: { content: '📝 Time to write your letter to Santa', emoji: '📝' },
  15: { content: '🛷 Sledding down snowy hills', emoji: '🛷' },
  16: { content: '🧤 Keep warm with mittens and hot cocoa', emoji: '🧤' },
  17: { content: '🎪 Visit the Christmas market', emoji: '🎪' },
  18: { content: '🕊️ Peace on Earth, goodwill to all', emoji: '🕊️' },
  19: { content: '🎸 Rock around the Christmas tree', emoji: '🎸' },
  20: { content: '🎮 Indoor games and festive fun', emoji: '🎮' },
  21: { content: '❤️ Share love with family and friends', emoji: '❤️' },
  22: { content: '🌟 Follow the Star of Bethlehem', emoji: '🌟' },
  23: { content: '🔔 Hear the Christmas bells ring', emoji: '🔔' },
  24: { content: '🎉 Christmas Eve is here! Magic is in the air!', emoji: '🎉' },
};

// Theme data
const themes = {
  'winter-wonderland': {
    '--background': '#ffffff',
    '--foreground': '#1a365d',
    '--muted': '#e2e8f0',
    '--muted-foreground': '#64748b',
    '--border': '#e2e8f0',
    '--input': '#f8fafc',
    '--card': '#f8fafc',
    '--accent': '#f1f5f9',
  },
  'cozy-cabin': {
    '--background': '#fef3c7',
    '--foreground': '#78350f',
    '--muted': '#fde68a',
    '--muted-foreground': '#92400e',
    '--border': '#f59e0b',
    '--input': '#fef3c7',
    '--card': '#fffbeb',
    '--accent': '#fcd34d',
  },
  'festive-magic': {
    '--background': '#fee2e2',
    '--foreground': '#7f1d1d',
    '--muted': '#fecaca',
    '--muted-foreground': '#991b1b',
    '--border': '#f87171',
    '--input': '#fee2e2',
    '--card': '#fff1f2',
    '--accent': '#fca5a5',
  },
  'nordic-night': {
    '--background': '#1e293b',
    '--foreground': '#f8fafc',
    '--muted': '#334155',
    '--muted-foreground': '#94a3b8',
    '--border': '#475569',
    '--input': '#1e293b',
    '--card': '#0f172a',
    '--accent': '#334155',
  },
};

const themeEmojis = {
  'winter-wonderland': ['❄️', '⛄', '🌨️', '🎿', '🧊', '🏔️'],
  'cozy-cabin': ['🏡', '🔥', '🧦', '☕', '🍪', '📚'],
  'festive-magic': ['✨', '🎄', '🎁', '🎅', '🦌', '🔔'],
  'nordic-night': ['🌟', '🌙', '🌠', '🦊', '🐺', '🌲'],
};

// DOM Elements
const modal = document.getElementById('dayModal');
const modalContent = document.getElementById('modalContent');
const calendarGrid = document.getElementById('calendarGrid');
const themeToggle = document.getElementById('themeToggle');
const themeSelect = document.getElementById('themeSelect');
const weekStartSelect = document.getElementById('weekStartSelect');
const shareCalendarBtn = document.getElementById('shareCalendar');
const timer = document.getElementById('timer');
const bgContainer = document.getElementById('bg-emojis');

let currentDay = null;

// Update countdown timer
function updateCountdown() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timer.textContent = `${hours}h ${minutes}m ${seconds}s`;
}

// Initialize Calendar
function initializeCalendar() {
  const today = new Date();
  const startDay = weekStartSelect.value === 'monday' ? 1 : 0;
  const firstDay = new Date(2024, 11, 1);
  const firstDayOfWeek = (firstDay.getDay() - startDay + 7) % 7;

  // Clear grid
  calendarGrid.innerHTML = '';

  // Add empty cells for the first week
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'day empty';
    calendarGrid.appendChild(emptyDay);
  }

  // Add calendar days
  for (let day = 1; day <= 24; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';

    const date = new Date(2024, 11, day);
    const isLocked = date > today;

    if (isLocked) {
      dayElement.classList.add('locked');
    }

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;

    const dayEmoji = document.createElement('div');
    dayEmoji.className = 'day-emoji';
    dayEmoji.textContent = calendarData[day].emoji;

    dayElement.appendChild(dayNumber);
    dayElement.appendChild(dayEmoji);

    if (!isLocked) {
      dayElement.addEventListener('click', () => openDay(day));
    }

    calendarGrid.appendChild(dayElement);
  }
}

// Open Day Modal
function openDay(day) {
  currentDay = day;

  modalContent.innerHTML = `
        <h2>December ${day}</h2>
        <p>${calendarData[day].content}</p>
        <button class="share-button" onclick="shareDayContent(${day})">
            <i class="fas fa-share-alt"></i> Share Today
        </button>
    `;
  modal.classList.add('show');
  document.querySelector(`[data-day="${day}"]`)?.classList.add('opened');
}

// Close Modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    currentDay = null;
  }
});

// Add close button event listener
document.addEventListener('click', (e) => {
  if (e.target.matches('.close')) {
    modal.classList.remove('show');
    currentDay = null;
  }
});

// Update Today's Content
function updateTodayContent() {
  const today = new Date();
  const day = today.getDate();
  if (today.getMonth() === 11 && day <= 24) {
    const todayCard = document.getElementById('todayCard');
    todayCard.innerHTML = `
            <h2>Today's Surprise</h2>
            <p>${calendarData[day].content}</p>
        `;
  }
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.documentElement.setAttribute(
    'data-theme',
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  );
  themeToggle.innerHTML =
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
});

// Theme Select
themeSelect.addEventListener('change', (e) => {
  const theme = themes[e.target.value];
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  createBackgroundEmojis();
});

// Week Start Select
weekStartSelect.addEventListener('change', () => {
  calendarGrid.innerHTML = '';
  initializeCalendar();
});

// Share functionality
async function shareDayContent(day) {
  const shareData = {
    title: '🎄 Advent Calendar 2024',
    text: calendarData[day].content,
    url: `${window.location.href}?day=${day}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      );
      alert('Link copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
}

shareCalendarBtn.addEventListener('click', async () => {
  const shareData = {
    title: '🎄 Advent Calendar 2024',
    text: 'Check out this amazing Advent Calendar!',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      );
      alert('Link copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
});

function createBackgroundEmojis() {
  const bgContainer = document.getElementById('bg-emojis');
  if (!bgContainer) return;

  bgContainer.innerHTML = '';

  const currentThemeKey = themeSelect.value;
  const emojis = themeEmojis[currentThemeKey];

  // Create emojis in different layers
  const layers = ['layer-1', 'layer-2', 'layer-3'];
  layers.forEach((layer, index) => {
    for (let i = 0; i < 5; i++) {
      const emoji = document.createElement('div');
      emoji.className = `bg-emoji ${layer}`;
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      // Random initial positions
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      emoji.style.left = `${x}vw`;
      emoji.style.top = `${y}vh`;

      // Set parallax speed based on layer
      const speed = 0.5 - (index * 0.2); // 0.5, 0.3, 0.1
      emoji.dataset.speed = speed;
      emoji.dataset.x = x;
      emoji.dataset.y = y;

      bgContainer.appendChild(emoji);
    }
  });
}

// Handle parallax scrolling
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
  const emojis = document.querySelectorAll('.bg-emoji');
  const scrolled = window.scrollY;
  const delta = scrolled - lastScrollY;

  emojis.forEach(emoji => {
    const speed = parseFloat(emoji.dataset.speed);
    const x = parseFloat(emoji.dataset.x);
    const y = parseFloat(emoji.dataset.y) + (delta * speed);

    emoji.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
    emoji.dataset.y = y;
  });

  lastScrollY = scrolled;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initializeCalendar();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Set initial theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    themeSelect.value = savedTheme;
    const theme = themes[savedTheme];
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  createBackgroundEmojis();
});

// Check URL for shared day
const urlParams = new URLSearchParams(window.location.search);
const sharedDay = urlParams.get('day');
if (sharedDay && !isNaN(sharedDay) && sharedDay >= 1 && sharedDay <= 24) {
  openDay(parseInt(sharedDay));
}
