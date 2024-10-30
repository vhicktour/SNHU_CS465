const fs = require('fs');
const path = require('path');

// Load meals data from meals.json
const mealsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/meals.json'), 'utf8'));

const meals = (req, res) => {
    const pageTitle = 'Travlr Getaways - Meals';
    res.render('meals', {
        title: pageTitle,
        meals: mealsData
    });
};

module.exports = {
    meals
};
