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
const themeDescription = document.querySelector('.theme-description');

// State
let currentTheme = localStorage.getItem('calendarTheme') || 'advent';
let selectedDay = null;
const isDarkMode = localStorage.getItem('darkMode') === 'true';
const weekStart = localStorage.getItem('weekStart') || '0';

// Initialize theme and preferences
if (isDarkMode) {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}
weekStartDay.value = weekStart;
calendarTheme.value = currentTheme;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-theme'));
});

// Calendar Theme Change
calendarTheme.addEventListener('change', (e) => {
    currentTheme = e.target.value;
    localStorage.setItem('calendarTheme', currentTheme);
    updateFloatingEmojis();
    updateThemeDescription();
    renderCalendar();
});

// Week Start Day Change
weekStartDay.addEventListener('change', (e) => {
    localStorage.setItem('weekStart', e.target.value);
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
    
    for (let i = 0; i < 40; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji parallax';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        
        // Stagger the initial animation start
        const initialDelay = Math.random() * 20;
        const animationDuration = 15 + Math.random() * 10;
        emoji.style.animation = `float ${animationDuration}s linear ${initialDelay}s infinite`;
        
        // Randomize initial position
        const startProgress = Math.random();
        const initialY = -50 + (window.innerHeight + 100) * startProgress;
        emoji.style.transform = `translateY(${initialY}px)`;
        
        emoji.style.setProperty('--direction', Math.random() > 0.5 ? '1' : '-1');
        floatingEmojis.appendChild(emoji);
    }
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach((emoji, index) => {
        const speed = 0.2 + (index % 3) * 0.1;
        const rotation = scrolled / (10 + (index % 5) * 2);
        const scale = 1 + Math.sin(scrolled * 0.002 + index) * 0.2;
        const baseTransform = emoji.style.transform.match(/translateY\(([-\d.]+)px\)/) || ['', '0'];
        const baseY = parseFloat(baseTransform[1]);
        emoji.style.transform = `translateY(${baseY + scrolled * speed}px) rotate(${rotation}deg) scale(${scale})`;
    });
});

// Mouse move effect for radial background
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', x + '%');
    document.documentElement.style.setProperty('--mouse-y', y + '%');
});

// Touch move effect for mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
        const x = (e.touches[0].clientX / window.innerWidth) * 100;
        const y = (e.touches[0].clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', x + '%');
        document.documentElement.style.setProperty('--mouse-y', y + '%');
    }
});

// Update theme description
function updateThemeDescription() {
    const description = themeData[currentTheme].description;
    themeDescription.innerHTML = `<p>${description}</p>`;
}

// Calendar Functions
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function isWeekend(dayOfWeek) {
    // 6 is Saturday, 0 is Sunday
    return dayOfWeek === 6 || dayOfWeek === 0;
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
    const content = calendarContent[day];
    popupContent.innerHTML = `
        <h2>${content.title}</h2>
        <p>${content.content}</p>
        
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
        .map((day, index) => {
            const originalIndex = (index + startDay) % 7;
            const isWeekendDay = originalIndex === 0 || originalIndex === 6;
            return `<div class="weekday${isWeekendDay ? ' weekend' : ''}">${day}</div>`;
        })
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
        const actualDayOfWeek = (dayOfWeek + startDay) % 7;
        if (isWeekend(actualDayOfWeek)) {
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
    const todayData = calendarContent[today];
    const themeEmoji = themeData[currentTheme].emojis[today % themeData[currentTheme].emojis.length];
    todayContent.innerHTML = `
        <h3>${todayData.title}</h3>
        <p>${todayData.content}</p>
        <div class="emoji-display">${themeEmoji}</div>
    `;
}

// Initialize
function init() {
    renderCalendar();
    updateFloatingEmojis();
    updateThemeDescription();
    setInterval(updateCountdown, 1000);

    // Check for shared day in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedDay = urlParams.get('day');
    if (sharedDay) {
        showDayContent(parseInt(sharedDay));
    }
}

init();
