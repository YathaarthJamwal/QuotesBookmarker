const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

const scraper = () => {

    let quotes = [];

    axios.get('https://www.brainyquote.com/topics/scrape-quotes')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                $('.clearfix').each(function(i, elem) {
                    quotes[i] = {
                        id: i + 1,
                        text: $(this).find('.b-qt').text().trim(),
                        author: $(this).find('.bq-aut').text().trim()
                    }
                });
            }
        })
        .catch(error => console.log(error));

    return quotes;

};

let quotesData = [];
quotesData = scraper();

console.log(quotesData);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Put all API endpoints under '/api'
app.get('/api/quotes', cors(), async(req, res, next) => {
    // Return them as json
    try {
        res.json(quotesData);
        console.log(quotesData);
        console.log(`Sent ${quotesData.length} quotes`);
    } catch (err) {
        next(err);
    }
});


app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname + '/client/build/index.html'));
    console.log("Error Logged");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Backend listening on ${port}`);