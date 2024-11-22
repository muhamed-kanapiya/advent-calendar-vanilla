const themeData = {
    advent: {
        emojis: ['🎄', '🎅', '🎁', '⛄', '🦌', '🔔', '❄️', '🕯️', '🎨', '🍪'],
        description: 'Welcome to the magical Advent Calendar! Count down the days until Christmas with festive surprises and holiday cheer. Each day brings you closer to the most wonderful time of the year! 🎄✨'
    },
    winter: {
        emojis: ['❄️', '⛄', '🏂', '🎿', '🧊', '🧣', '🧤', '☃️', '🏔️', '🌨️'],
        description: 'Embrace the winter wonderland! ❄️ Experience the beauty of snowy days, cozy moments, and winter adventures. Bundle up and enjoy the magical frost-filled journey! ⛄'
    },
    space: {
        emojis: ['🚀', '🛸', '🌎', '🌙', '⭐', '👨‍🚀', '🌠', '🪐', '☄️', '🌌'],
        description: 'Blast off into the cosmic adventure! 🚀 Explore the mysteries of the universe, discover distant planets, and journey through the stars. Your space odyssey awaits! 🌌'
    },
    ocean: {
        emojis: ['🌊', '🐋', '🐬', '🐠', '🦈', '🐚', '🏊‍♂️', '🏖️', '🐡', '🦀'],
        description: 'Dive into an oceanic journey! 🌊 Explore the depths of the sea, meet fascinating marine creatures, and discover the wonders beneath the waves. Let the adventure flow! 🐋'
    }
};

const calendarContent = {
    1: { title: 'Day 1', content: 'Welcome to the first day of December! 🎉' },
    2: { title: 'Day 2', content: 'Time for some holiday cheer! 🌟' },
    3: { title: 'Day 3', content: 'Making memories one day at a time ✨' },
    4: { title: 'Day 4', content: 'Another magical day begins! 🎈' },
    5: { title: 'Day 5', content: 'Halfway through the week! 🌈' },
    6: { title: 'Day 6', content: 'Weekend is approaching! 🎪' },
    7: { title: 'Day 7', content: 'Lucky number seven! 🍀' },
    8: { title: 'Day 8', content: 'Keep the magic going! ⭐' },
    9: { title: 'Day 9', content: 'Time flies when having fun! 🕰️' },
    10: { title: 'Day 10', content: 'Double digits day! 🎯' },
    11: { title: 'Day 11', content: 'Making progress! 🎨' },
    12: { title: 'Day 12', content: 'Dozen days of joy! 🎭' },
    13: { title: 'Day 13', content: 'Lucky day ahead! 🎲' },
    14: { title: 'Day 14', content: 'Two weeks of excitement! 🎪' },
    15: { title: 'Day 15', content: 'Halfway point reached! 🎯' },
    16: { title: 'Day 16', content: 'Sweet sixteen! 🍬' },
    17: { title: 'Day 17', content: 'Adventure continues! 🗺️' },
    18: { title: 'Day 18', content: 'Keep exploring! 🔭' },
    19: { title: 'Day 19', content: 'Almost at twenty! 📅' },
    20: { title: 'Day 20', content: 'Twenty days of wonder! 🌟' },
    21: { title: 'Day 21', content: 'Winter solstice day! ❄️' },
    22: { title: 'Day 22', content: 'Getting closer! 🎯' },
    23: { title: 'Day 23', content: 'Eve of the eve! 🌙' },
    24: { title: 'Day 24', content: 'Christmas Eve magic! 🎄' },
    25: { title: 'Day 25', content: 'Merry Christmas! 🎅' },
    26: { title: 'Day 26', content: 'Boxing Day fun! 🎁' },
    27: { title: 'Day 27', content: 'Holiday continues! 🎊' },
    28: { title: 'Day 28', content: 'Winter wonderland! ⛄' },
    29: { title: 'Day 29', content: 'Almost New Year! 🎆' },
    30: { title: 'Day 30', content: 'New Year\'s Eve Eve! 🎉' },
    31: { title: 'Day 31', content: 'New Year\'s Eve! 🎊' }
};

// Generate content for remaining days
Object.keys(themeData).forEach(theme => {
    const themeEmojis = themeData[theme].emojis;
    for (let day = 1; day <= 31; day++) {
        themeData[theme].content = themeData[theme].content || {};
        themeData[theme].content[day] = {
            title: calendarContent[day].title,
            content: calendarContent[day].content,
            emoji: themeEmojis[day % themeEmojis.length]
        };
    }
});
