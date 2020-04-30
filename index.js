const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const scraper = () => {
    //let quotesData = null;
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
                //console.log(quotes);

                // quotesData = quotes.filter(n => n != undefined)
                // fs.writeFile('quotes.json', 
                //               JSON.stringify(quotes, null, 4), 
                //               (err)=> console.log('File successfully written!'))

                //quotesData = JSON.stringify(quotes, null, 4);
                //console.log(quotesData);

            }
        })
        .catch(error => console.log(error));

    return quotes;

};

const app = express();

let quotesData = [];
quotesData = scraper();
//console.log(scraper());
console.log(quotesData);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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

// app.get('/api/cow/', cors(), async(req, res, next) => {
//     try {
//         const moo = cowsay.say({ text: 'Hello World!' })
//         res.json({ moo })
//     } catch (err) {
//         next(err)
//     }
// })

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Backend listening on ${port}`);