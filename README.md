# Interactive SEO Advent Calendar 🎄

A beautiful, interactive advent calendar focused on SEO learning, built with pure vanilla JavaScript. Features a modern, responsive design with light/dark modes, customizable themes, and daily SEO content.

## 🌟 Features

- 📱 Responsive design for all devices
- 🌓 Light/Dark mode toggle
- 🎨 Multiple theme options (Advent, Winter, Space, Ocean)
- 📅 Customizable week start (Sunday/Monday)
- 🔗 Hash-based navigation for sharing specific days
- 💾 Local storage for user preferences
- 📚 Rich SEO learning content
- 🎯 Interactive UI elements

## 🛠️ Tech Stack

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Local Storage API
- Web Share API

No external frameworks or dependencies required!

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/muhamed-kanapiya/advent-calendar-vanilla.git
```

2. Open in your preferred server:
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node.js's http-server:
     ```bash
     npx http-server
     ```
   - Using VS Code's Live Server extension
   - Or any other local server solution

3. Access the calendar at `http://localhost:8000` (or your server's URL)

## 📝 Customization

### Modifying Content

1. Edit daily content in `calendar-data.js`:
```javascript
const calendarContent = {
    1: {
        title: "Your Title",
        content: "Your HTML content here"
    },
    // Add more days...
};
```

2. Update FAQ content in `calendar-data.js`:
```javascript
const faqData = [
    {
        question: "Your Question?",
        answer: "Your detailed answer here"
    },
    // Add more FAQ items...
];
```

### Adding Themes

Add new themes in `calendar-data.js`:
```javascript
const themeData = {
    yourTheme: {
        emojis: ['emoji1', 'emoji2', ...],
        description: 'Theme description'
    }
};
```

## 🎯 Future Enhancements

- [ ] User progress tracking
- [ ] Interactive SEO quizzes
- [ ] Social sharing statistics
- [ ] More theme options
- [ ] Detailed SEO tutorials
- [ ] Achievement system
- [ ] Custom animations
- [ ] Multilingual support

## 💼 Custom Development

Need a customized version of this calendar for your business or organization? I offer custom development services to tailor the calendar to your specific needs:

- Custom themes and branding
- Specialized content integration
- Advanced features and analytics
- Performance optimization
- Technical support

Contact me for custom development:
- Twitter: [@Qazbiz](https://x.com/Qazbiz)
- Telegram: [@muhamed_kanapiya](https://t.me/muhamed_kanapiya)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Created with ❤️ by [Muhamed-Kanapiya](https://x.com/Qazbiz)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/muhamed-kanapiya/advent-calendar-vanilla/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
