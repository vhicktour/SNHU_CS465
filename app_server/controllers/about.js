const fs = require('fs');
const path = require('path');

// Load about content from about.json (optional)
const aboutData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/about.json'), 'utf8'));

const about = (req, res) => {
    const pageTitle = 'Travlr Getaways - About Us';
    res.render('about', {
        title: pageTitle,
        aboutContent: aboutData.content
    });
};

module.exports = {
    about
};
