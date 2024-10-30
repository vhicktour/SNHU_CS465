const fs = require('fs');
const path = require('path');

// Load contact data if needed (optional)
const contactData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/contact.json'), 'utf8'));

const contact = (req, res) => {
    const pageTitle = 'Travlr Getaways - Contact Us';
    res.render('contact', {
        title: pageTitle,
        contact: contactData
    });
};

module.exports = {
    contact
};
