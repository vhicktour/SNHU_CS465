const fs = require('fs');
const path = require('path');

// Load travel data from trips.json
const tripsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

const travel = (req, res) => {
    const pageTitle = 'Travlr Getaways - Travel Packages';
    res.render('travel', {
        title: pageTitle,
        trips: tripsData
    });
};

module.exports = {
    travel
};
