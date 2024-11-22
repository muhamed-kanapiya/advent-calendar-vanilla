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
calendarTheme.addEventListener('change', e => {
  currentTheme = e.target.value;
  localStorage.setItem('calendarTheme', currentTheme);
  updateFloatingEmojis();
  updateThemeDescription();
  renderCalendar();
});

// Week Start Day Change
weekStartDay.addEventListener('change', e => {
  localStorage.setItem('weekStart', e.target.value);
  renderCalendar();
});

// Popup Close
closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
  history.replaceState(null, null, window.location.href.split('#')[0]); // Remove hash
});

// Share Functionality
shareButton.addEventListener('click', async () => {
  try {
    await navigator.share({
      title: 'Interactive SEO Advent Calendar',
      text: 'Check out this amazing SEO learning calendar!',
      url: window.location.href.split('#')[0], // Share base URL without hash
    });
  } catch (err) {
    console.log('Share failed:', err);
  }
});

shareDayButton.addEventListener('click', async () => {
  if (selectedDay) {
    try {
      const shareUrl = new URL(window.location.href.split('#')[0]); // Get base URL
      shareUrl.hash = `day${selectedDay}`; // Add day hash
      await navigator.share({
        title: `${calendarContent[selectedDay].title} - SEO Advent Calendar`,
        text: 'Learn about SEO with this interactive calendar!',
        url: shareUrl.toString(),
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
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', x + '%');
  document.documentElement.style.setProperty('--mouse-y', y + '%');
});

// Touch move effect for mobile
document.addEventListener('touchmove', e => {
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
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const countdownContainer = document.createElement('div');
  countdownContainer.className = 'countdown-container';

  const title = document.createElement('div');
  title.className = 'countdown-title';
  title.textContent = 'Next Day Unlocks In';

  const timer = document.createElement('div');
  timer.className = 'countdown-timer';

  const segments = [
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  segments.forEach((segment, index) => {
    const segmentDiv = document.createElement('div');
    segmentDiv.className = 'countdown-segment';

    const number = document.createElement('div');
    number.className = 'countdown-number';
    number.textContent = segment.value.toString().padStart(2, '0');

    // Add flip animation when number changes
    const prevValue = number.getAttribute('data-value');
    if (prevValue !== null && prevValue !== segment.value.toString()) {
      number.classList.remove('flip');
      void number.offsetWidth; // Trigger reflow
      number.classList.add('flip');
    }
    number.setAttribute('data-value', segment.value.toString());

    const label = document.createElement('div');
    label.className = 'countdown-label';
    label.textContent = segment.label;

    segmentDiv.appendChild(number);
    segmentDiv.appendChild(label);

    timer.appendChild(segmentDiv);

    // Add separator except after the last segment
    if (index < segments.length - 1) {
      const separator = document.createElement('div');
      separator.className = 'countdown-separator';
      separator.textContent = ':';
      timer.appendChild(separator);
    }
  });

  countdownContainer.appendChild(title);
  countdownContainer.appendChild(timer);

  const existingCountdown = document.querySelector('.countdown-container');
  if (existingCountdown) {
    existingCountdown.replaceWith(countdownContainer);
  } else {
    const infoSection = document.querySelector('.info-section');
    infoSection.parentNode.insertBefore(countdownContainer, infoSection.nextSibling);
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

function createCalendarDay(day) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  dayElement.setAttribute('data-day', day);

  const dayNumber = document.createElement('div');
  dayNumber.className = 'day-number';
  dayNumber.textContent = day;

  const dayPreview = document.createElement('div');
  dayPreview.className = 'day-preview';
  if (calendarContent[day]) {
    dayPreview.textContent = calendarContent[day].title.split(':')[1] || 'Coming Soon';
  }

  dayElement.appendChild(dayNumber);
  dayElement.appendChild(dayPreview);

  // Check if the day is in the future
  const today = new Date();
  const currentDay = today.getDate();
  if (day > currentDay) {
    dayElement.classList.add('locked');
    dayPreview.textContent = 'Locked';
  } else {
    dayElement.addEventListener('click', () => showDayContent(day));
  }

  return dayElement;
}

function renderCalendar() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

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
    const dayElement = createCalendarDay(day);
    calendarGrid.appendChild(dayElement);
  }

  // Update today's content
  const todayData = calendarContent[today];  
  todayContent.innerHTML = `
        <h3>${todayData.title}</h3>
        <p>${todayData.content}</p>        
    `;
}

// Show day content
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
  
  // Update URL hash without triggering scroll
  history.replaceState(null, null, `#day${day}`);
}

// Handle URL hash changes
function handleHashChange() {
  const hash = window.location.hash;
  if (hash.startsWith('#day')) {
    const day = parseInt(hash.replace('#day', ''));
    if (day && calendarContent[day]) {
      showDayContent(day);
    }
  }
}

// Initialize accordion functionality
function renderFAQ() {
    const faqSection = document.querySelector('.faq-section');
    faqSection.innerHTML = `
        <h3>Frequently Asked Questions</h3>
        <div class="accordion">
            ${faqData.map((item, index) => `
                <div class="accordion-item">
                    <button class="accordion-header">${item.question}</button>
                    <div class="accordion-content">
                        <p>${item.answer}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Add click handlers to new accordion items
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// Initialize
function init() {
    renderCalendar();
    updateFloatingEmojis();
    updateThemeDescription();
    renderFAQ();
    
    // Check for day in URL hash on load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}

init();
