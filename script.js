// Calendar data with daily content
const calendarData = {
    1: { content: "🎄 Welcome to December! Time to start the countdown to Christmas!", emoji: "🎄" },
    2: { content: "❄️ Snowflakes are nature's tiny miracles", emoji: "❄️" },
    3: { content: "🎅 Santa's elves are busy in the workshop", emoji: "🎅" },
    4: { content: "🦌 Rudolph is practicing his flying", emoji: "🦌" },
    5: { content: "🎁 The art of gift wrapping begins", emoji: "🎁" },
    6: { content: "⭐ Stars shine brighter in December", emoji: "⭐" },
    7: { content: "🍪 Cookie baking day! Don't forget the milk", emoji: "🍪" },
    8: { content: "🕯️ Light a candle for peace and joy", emoji: "🕯️" },
    9: { content: "🎨 Time to decorate the tree", emoji: "🎨" },
    10: { content: "🧦 Hang up your stockings with care", emoji: "🧦" },
    11: { content: "🎵 Caroling time! Fa la la la la", emoji: "🎵" },
    12: { content: "☃️ Would you like to build a snowman?", emoji: "☃️" },
    13: { content: "🎭 Christmas pageant rehearsal day", emoji: "🎭" },
    14: { content: "📝 Time to write your letter to Santa", emoji: "📝" },
    15: { content: "🛷 Sledding down snowy hills", emoji: "🛷" },
    16: { content: "🧤 Keep warm with mittens and hot cocoa", emoji: "🧤" },
    17: { content: "🎪 Visit the Christmas market", emoji: "🎪" },
    18: { content: "🕊️ Peace on Earth, goodwill to all", emoji: "🕊️" },
    19: { content: "🎸 Rock around the Christmas tree", emoji: "🎸" },
    20: { content: "🎮 Indoor games and festive fun", emoji: "🎮" },
    21: { content: "❤️ Share love with family and friends", emoji: "❤️" },
    22: { content: "🌟 Follow the Star of Bethlehem", emoji: "🌟" },
    23: { content: "🔔 Hear the Christmas bells ring", emoji: "🔔" },
    24: { content: "🎉 Christmas Eve is here! Magic is in the air!", emoji: "🎉" }
};

// Theme data
const themes = {
    winter: {
        '--primary': '#0ea5e9',
        '--accent': '#e0f2fe',
        '--background': '#f0f9ff'
    },
    cozy: {
        '--primary': '#ea580c',
        '--accent': '#fff7ed',
        '--background': '#ffedd5'
    },
    festive: {
        '--primary': '#16a34a',
        '--accent': '#f0fdf4',
        '--background': '#dcfce7'
    },
    nordic: {
        '--primary': '#4b5563',
        '--accent': '#f8fafc',
        '--background': '#f1f5f9'
    }
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
    
    timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize Calendar
function initializeCalendar() {
    const today = new Date();
    const startDay = weekStartSelect.value === 'monday' ? 1 : 0;
    const firstDay = new Date(2023, 11, 1);
    const startingDay = (firstDay.getDay() + (7 - startDay)) % 7;

    // Add weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const orderedWeekdays = [...weekdays.slice(startDay), ...weekdays.slice(0, startDay)];
    
    orderedWeekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'weekday-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add empty cells for days before December 1st
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }

    // Add calendar days
    for (let day = 1; day <= 24; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.dataset.day = day;

        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;

        const dayEmoji = document.createElement('span');
        dayEmoji.className = 'day-emoji';
        dayEmoji.textContent = calendarData[day].emoji;

        dayElement.appendChild(dayNumber);
        dayElement.appendChild(dayEmoji);

        if (today.getMonth() === 11 && day <= today.getDate()) {
            dayElement.addEventListener('click', () => openDay(day));
            if (localStorage.getItem(`day-${day}-opened`)) {
                dayElement.classList.add('opened');
            }
        } else {
            dayElement.classList.add('locked');
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Open Day Modal
function openDay(day) {
    currentDay = day;
    modalContent.innerHTML = `
        <button class="close">&times;</button>
        <div class="modal-body">
            <p>${calendarData[day].content}</p>
        </div>
        <button class="share-button" onclick="shareDayContent(${day})">
            <i class="fas fa-share-alt"></i> Share Today
        </button>
    `;
    modal.classList.add('show');
    localStorage.setItem(`day-${day}-opened`, 'true');
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
    themeToggle.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Theme Select
themeSelect.addEventListener('change', (e) => {
    const theme = themes[e.target.value];
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
});

// Week Start Select
weekStartSelect.addEventListener('change', () => {
    calendarGrid.innerHTML = '';
    initializeCalendar();
});

// Share functionality
async function shareDayContent(day) {
    const shareData = {
        title: '🎄 Advent Calendar 2023',
        text: calendarData[day].content,
        url: `${window.location.href}?day=${day}`
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
        title: '🎄 Advent Calendar 2023',
        text: 'Check out this amazing Advent Calendar!',
        url: window.location.href
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

// Initialize everything
initializeCalendar();
updateCountdown();
setInterval(updateCountdown, 1000);

// Check URL for shared day
const urlParams = new URLSearchParams(window.location.search);
const sharedDay = urlParams.get('day');
if (sharedDay && !isNaN(sharedDay) && sharedDay >= 1 && sharedDay <= 24) {
    openDay(parseInt(sharedDay));
}
