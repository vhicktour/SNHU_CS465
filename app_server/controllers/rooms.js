const fs = require('fs');
const path = require('path');

// Load rooms data from rooms.json
const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/rooms.json'), 'utf8'));

const rooms = (req, res) => {
    const pageTitle = 'Travlr Getaways - Rooms';
    res.render('rooms', {
        title: pageTitle,
        rooms: roomsData
    });
};

module.exports = {
    rooms
};
