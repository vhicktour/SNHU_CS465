const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const travel = async (req, res) => {
    const pageTitle = 'Travlr Getaways - Travel Packages';
    const tripsEndpoint = 'http://localhost:3000/api/trips';

    try {
        // Fetch trips data from the API
        const response = await fetch(tripsEndpoint);

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`Failed to fetch trips data: ${response.status} ${response.statusText}`);
        }

        const tripsData = await response.json();

        // Render the page with data from the API
        res.render('travel', {
            title: pageTitle,
            trips: tripsData
        });
    } catch (error) {
        console.error("Error fetching trips data:", error.message);
        res.render('travel', {
            title: pageTitle,
            error: 'Failed to load travel packages.'
        });
    }
};

module.exports = {
    travel
};
