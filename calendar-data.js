const themeData = {
    advent: {
        emojis: ['🎄', '🎅', '🎁', '⛄', '🦌', '🔔', '❄️', '🕯️', '🎨', '🍪'],
        content: {
            1: { title: 'Christmas Tree', content: 'Decorate your virtual Christmas tree! 🎄', emoji: '🎄' },
            2: { title: 'Santa\'s Workshop', content: 'Visit Santa\'s busy workshop! 🎅', emoji: '🎅' },
            3: { title: 'Gift Wrapping', content: 'Learn creative gift wrapping techniques 🎁', emoji: '🎁' },
            4: { title: 'Snowman Building', content: 'Build a virtual snowman ⛄', emoji: '⛄' },
            // Add content for remaining days...
        }
    },
    winter: {
        emojis: ['❄️', '⛄', '🏂', '🎿', '🧊', '🧣', '🧤', '☃️', '🏔️', '🌨️'],
        content: {
            1: { title: 'Winter Wonderland', content: 'Explore a magical winter landscape ❄️', emoji: '❄️' },
            2: { title: 'Snowball Fight', content: 'Join the virtual snowball fight! ⛄', emoji: '⛄' },
            3: { title: 'Skiing Adventure', content: 'Hit the virtual slopes 🎿', emoji: '🎿' },
            4: { title: 'Ice Skating', content: 'Glide on virtual ice ⛸️', emoji: '⛸️' },
            // Add content for remaining days...
        }
    },
    space: {
        emojis: ['🚀', '🛸', '🌎', '🌙', '⭐', '👨‍🚀', '🌠', '🪐', '☄️', '🌌'],
        content: {
            1: { title: 'Rocket Launch', content: 'Watch today\'s rocket launch! 🚀', emoji: '🚀' },
            2: { title: 'Space Station', content: 'Tour the International Space Station 🛸', emoji: '🛸' },
            3: { title: 'Earth View', content: 'See Earth from space 🌎', emoji: '🌎' },
            4: { title: 'Moon Landing', content: 'Relive the moon landing 🌙', emoji: '🌙' },
            // Add content for remaining days...
        }
    },
    ocean: {
        emojis: ['🌊', '🐋', '🐬', '🐠', '🦈', '🐚', '🏊‍♂️', '🏖️', '🐡', '🦀'],
        content: {
            1: { title: 'Ocean Waves', content: 'Listen to the calming ocean waves 🌊', emoji: '🌊' },
            2: { title: 'Whale Watch', content: 'Spot magnificent whales! 🐋', emoji: '🐋' },
            3: { title: 'Dolphin Play', content: 'Play with dolphins 🐬', emoji: '🐬' },
            4: { title: 'Coral Reef', content: 'Explore the coral reef 🐠', emoji: '🐠' },
            // Add content for remaining days...
        }
    }
};

// Generate content for remaining days
Object.keys(themeData).forEach(theme => {
    const themeEmojis = themeData[theme].emojis;
    for (let day = 5; day <= 31; day++) {
        themeData[theme].content[day] = {
            title: `Day ${day}`,
            content: `Surprise content for day ${day}! ${themeEmojis[day % themeEmojis.length]}`,
            emoji: themeEmojis[day % themeEmojis.length]
        };
    }
});
