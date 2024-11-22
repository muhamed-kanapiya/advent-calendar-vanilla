// Calendar data with content for each day
const calendarData = {
    1: { emoji: "🎄", content: "Start decorating for Christmas! Here's a DIY ornament idea...", isHoliday: false },
    2: { emoji: "🎅", content: "Write a letter to Santa with your Christmas wishes...", isHoliday: false },
    3: { emoji: "🦌", content: "Learn about Rudolph and other reindeer traditions...", isHoliday: true }, // Sunday
    4: { emoji: "🎁", content: "Start your Christmas shopping list...", isHoliday: false },
    5: { emoji: "⭐", content: "Put up your Christmas tree and decorate it...", isHoliday: false },
    6: { emoji: "🍪", content: "Bake some Christmas cookies...", isHoliday: false },
    7: { emoji: "🎨", content: "Make Christmas cards for your loved ones...", isHoliday: false },
    8: { emoji: "🕯️", content: "Light a candle and enjoy some quiet time...", isHoliday: false },
    9: { emoji: "🎶", content: "Listen to your favorite Christmas carols...", isHoliday: false },
    10: { emoji: "❄️", content: "Make paper snowflakes to decorate your windows...", isHoliday: true }, // Sunday
    11: { emoji: "🧦", content: "Hang up your Christmas stockings...", isHoliday: false },
    12: { emoji: "🎭", content: "Watch a classic Christmas movie...", isHoliday: false },
    13: { emoji: "🎪", content: "Plan a Christmas party...", isHoliday: false },
    14: { emoji: "🎼", content: "Go caroling with friends...", isHoliday: false },
    15: { emoji: "🍫", content: "Make hot chocolate with marshmallows...", isHoliday: false },
    16: { emoji: "🎮", content: "Play Christmas-themed games...", isHoliday: false },
    17: { emoji: "📚", content: "Read a Christmas story...", isHoliday: true }, // Sunday
    18: { emoji: "🎹", content: "Learn to play a Christmas song...", isHoliday: false },
    19: { emoji: "🎬", content: "Create a Christmas video message...", isHoliday: false },
    20: { emoji: "🎯", content: "Do a Christmas-themed puzzle...", isHoliday: false },
    21: { emoji: "🎲", content: "Have a Christmas game night...", isHoliday: false },
    22: { emoji: "🎭", content: "Practice your Christmas performance...", isHoliday: false },
    23: { emoji: "🎪", content: "Wrap your Christmas presents...", isHoliday: false },
    24: { emoji: "🌟", content: "Christmas Eve celebration!", isHoliday: true }
};

// DOM Elements
const calendarGrid = document.getElementById('calendarGrid');
const modal = document.getElementById('dayModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');
const themeToggle = document.getElementById('themeToggle');
const themeSelect = document.getElementById('themeSelect');
const weekStartSelect = document.getElementById('weekStartSelect');
const shareCalendarBtn = document.getElementById('shareCalendar');
const shareDayBtn = document.getElementById('shareDay');
const todayCard = document.getElementById('todayCard');
const timer = document.getElementById('timer');
const monthHeader = document.querySelector('.month-header h2');

let currentDay = null;

// Theme management
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function setDecorationTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('decoration-theme', theme);
    generateBackgroundDecorations();
}

function generateBackgroundDecorations() {
    const theme = document.body.getAttribute('data-theme') || 'winter';
    const decorations = {
        winter: ['❄️', '⛄', '❅', '🌨️', '🧊', '🧣', '🧤', '🎿'],
        cozy: ['🏠', '🔥', '☕', '🍪', '📚', '🕯️', '🧦', '🛋️'],
        festive: ['🎄', '🎁', '🎅', '🦌', '🤶', '🔔', '🎉', '🍬'],
        nordic: ['🦌', '🌲', '🌟', '🏔️', '🌙', '✨', '🏰', '🗻']
    };

    const layers = document.querySelectorAll('.decoration-layer');
    layers.forEach((layer, index) => {
        const icons = decorations[theme];
        layer.innerHTML = '';
        
        // Create a grid of icons
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.textContent = icons[Math.floor(Math.random() * icons.length)];
            span.style.position = 'absolute';
            span.style.left = `${Math.random() * 100}%`;
            span.style.top = `${Math.random() * 100}%`;
            span.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;
            layer.appendChild(span);
        }
    });
}

function updateMonthHeader() {
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    monthHeader.textContent = `${month} ${year}`;
}

// Initialize themes from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
const savedDecoration = localStorage.getItem('decoration-theme') || 'winter';
setTheme(savedTheme === 'dark');
setDecorationTheme(savedDecoration);
themeSelect.value = savedDecoration;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    setTheme(isDark);
});

// Decoration Theme Change
themeSelect.addEventListener('change', (e) => {
    setDecorationTheme(e.target.value);
});

// Parallax effect for decorations
document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.decoration-layer');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.01;
        const x = deltaX * speed;
        const y = deltaY * speed;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deltaX * 0.02}deg)`;
    });
});

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
    
    // Update month header
    updateMonthHeader();
    
    // Clear existing calendar
    calendarGrid.innerHTML = '';
    
    // Add weekday headers
    const weekdays = startDay === 1 
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    weekdays.forEach(day => {
        const headerCell = document.createElement('div');
        headerCell.className = 'weekday-header';
        headerCell.textContent = day;
        calendarGrid.appendChild(headerCell);
    });
    
    // Add empty cells for days before December 1st
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    let firstDayOfWeek = firstDay.getDay();
    
    if (startDay === 1) { // Adjust for Monday start
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    }
    
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add calendar days
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const maxDays = Math.min(24, daysInMonth);
    
    for (let day = 1; day <= maxDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.dataset.day = day;
        
        const currentDate = new Date(currentYear, currentMonth, day);
        const isLocked = currentDate > today;
        const isOpened = localStorage.getItem(`day-${day}-opened`);
        const isHoliday = calendarData[day]?.isHoliday;
        
        dayElement.classList.add(isLocked ? 'locked' : 'unlocked');
        if (isOpened) dayElement.classList.add('opened');
        if (isHoliday) dayElement.classList.add('holiday');
        
        dayElement.innerHTML = `
            <div class="day-content">
                <span class="day-number">${day}</span>
                ${!isLocked && calendarData[day] ? `<span class="day-emoji">${calendarData[day].emoji}</span>` : ''}
            </div>
        `;
        
        if (!isLocked && calendarData[day]) {
            dayElement.addEventListener('click', () => openDay(day));
        }
        
        calendarGrid.appendChild(dayElement);
    }
    
    updateTodayContent();
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
        todayCard.innerHTML = `
            <h3>Day ${day} ${calendarData[day].emoji}</h3>
            <p>${calendarData[day].content}</p>
        `;
    } else {
        todayCard.innerHTML = '<p>No advent calendar content for today</p>';
    }
}

// Share Functionality
shareCalendarBtn.addEventListener('click', async () => {
    try {
        await navigator.share({
            title: 'Advent Calendar 2023',
            text: 'Check out this awesome Advent Calendar!',
            url: window.location.href
        });
    } catch (err) {
        console.error('Share failed:', err);
    }
});

shareDayBtn.addEventListener('click', async () => {
    if (!currentDay) return;
    
    try {
        await navigator.share({
            title: `Advent Calendar - Day ${currentDay}`,
            text: `${calendarData[currentDay].emoji} ${calendarData[currentDay].content}`,
            url: `${window.location.href}?day=${currentDay}`
        });
    } catch (err) {
        console.error('Share failed:', err);
    }
});

// Week Start Change
weekStartSelect.addEventListener('change', initializeCalendar);

// Share Day Content
async function shareDayContent(day) {
    try {
        await navigator.share({
            title: `Day ${day} - Advent Calendar`,
            text: `${day} December: ${calendarData[day].content}`,
            url: window.location.href
        });
    } catch (err) {
        console.log('Error sharing:', err);
        alert('Sharing is not supported on this device/browser');
    }
}

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
