const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ussd', (req, res) => {
    res.send('USSD endpoint is working.');
});

app.post('/ussd', (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    switch (text) {
        case '':
            response = `CON Welcome to The Focal Media
1. Check Balance
2. Make Order`;
            break;

        case '1':
            response = `END Your balance is RWF 500`;
            break;

        case '2':
            response = `CON Select Services:
1. Instagram Followers
2. Facebook Likes
3. Twitter Followers`;
            break;

        case '2*1':
            response = `END You selected Instagram Followers. We’ll contact you soon.`;
            break;

        case '2*2':
            response = `END You selected Facebook Likes. We’ll contact you soon.`;
            break;

        case '2*3':
            response = `END You selected Twitter Followers. We’ll contact you soon.`;
            break;

        default:
            response = `END Invalid choice`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

app.listen(3000, () => {
    console.log('USSD app running on port 3000');
}); 
