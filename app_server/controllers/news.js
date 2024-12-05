const fs = require('fs');
const path = require('path');

// Load news data from news.json
const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/news.json'), 'utf8'));

const news = (req, res) => {
    const pageTitle = 'Travlr Getaways - News';
    res.render('news', {
        title: pageTitle,
        news: newsData
    });
};

module.exports = {
    news
};
