// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const weekStartDay = document.getElementById('weekStartDay');
const calendarTheme = document.getElementById('calendarTheme');
const currentMonthElement = document.getElementById('currentMonth');
const weekdaysContainer = document.getElementById('weekdaysContainer');
const calendarGrid = document.getElementById('calendarGrid');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const closePopup = document.querySelector('.close-popup');
const todayContent = document.getElementById('todayContent');
const countdown = document.getElementById('countdown');
const shareButton = document.getElementById('shareButton');
const shareDayButton = document.getElementById('shareDayButton');
const floatingEmojis = document.getElementById('floatingEmojis');

// State
let currentTheme = 'advent';
let selectedDay = null;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Calendar Theme Change
calendarTheme.addEventListener('change', (e) => {
    currentTheme = e.target.value;
    updateFloatingEmojis();
    renderCalendar();
});

// Week Start Day Change
weekStartDay.addEventListener('change', () => {
    renderCalendar();
});

// Popup Close
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Share Functionality
shareButton.addEventListener('click', async () => {
    try {
        await navigator.share({
            title: 'Interactive Advent Calendar',
            text: 'Check out this amazing interactive calendar!',
            url: window.location.href
        });
    } catch (err) {
        console.log('Share failed:', err);
    }
});

shareDayButton.addEventListener('click', async () => {
    if (selectedDay) {
        try {
            const shareUrl = new URL(window.location.href);
            shareUrl.searchParams.set('day', selectedDay);
            await navigator.share({
                title: `Day ${selectedDay} - Interactive Calendar`,
                text: `Check out day ${selectedDay} in this amazing interactive calendar!`,
                url: shareUrl.toString()
            });
        } catch (err) {
            console.log('Share failed:', err);
        }
    }
});

// Floating Emojis
function updateFloatingEmojis() {
    floatingEmojis.innerHTML = '';
    const emojis = themeData[currentTheme].emojis;
    
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDelay = `${Math.random() * 20}s`;
        floatingEmojis.appendChild(emoji);
    }
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        const speed = 0.5;
        emoji.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled / 10}deg)`;
    });
});

// Calendar Functions
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function isWeekend(dayOfWeek) {
    return dayOfWeek === 0 || dayOfWeek === 6;
}

function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdown.textContent = `${hours}h ${minutes}m ${seconds}s`;
}

function showDayContent(day) {
    const today = new Date().getDate();
    if (day > today) {
        return;
    }

    selectedDay = day;
    const content = themeData[currentTheme].content[day];
    popupContent.innerHTML = `
        <h2>${content.title}</h2>
        <p>${content.content}</p>
        <div class="emoji-display">${content.emoji}</div>
    `;
    popup.style.display = 'block';
}

function renderCalendar() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const today = now.getDate();

    currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Render weekdays
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const startDay = parseInt(weekStartDay.value);
    const orderedWeekdays = [...weekdays.slice(startDay), ...weekdays.slice(0, startDay)];
    
    weekdaysContainer.innerHTML = orderedWeekdays
        .map(day => `<div class="weekday">${day}</div>`)
        .join('');

    // Render days
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    let firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    firstDay = (firstDay - startDay + 7) % 7;

    calendarGrid.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const dayOfWeek = (firstDay + day - 1) % 7;
        if (isWeekend(dayOfWeek)) {
            dayElement.classList.add('weekend');
        }

        if (day === today) {
            dayElement.classList.add('active');
        }

        if (day > today) {
            dayElement.classList.add('locked');
        } else {
            dayElement.addEventListener('click', () => showDayContent(day));
        }

        calendarGrid.appendChild(dayElement);
    }

    // Update today's content
    const todayData = themeData[currentTheme].content[today];
    todayContent.innerHTML = `
        <h3>${todayData.title}</h3>
        <p>${todayData.content}</p>
    `;
}

// Initialize
function init() {
    renderCalendar();
    updateFloatingEmojis();
    setInterval(updateCountdown, 1000);

    // Check for shared day in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedDay = urlParams.get('day');
    if (sharedDay) {
        showDayContent(parseInt(sharedDay));
    }
}

init();
