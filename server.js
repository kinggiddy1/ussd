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

    let textValue = text.split('*');
    switch (textValue[0]) {
        case '':
            response = `CON Welcome to The Focal Media
1. Check Balance
2. Buy Airtime`;
            break;
        case '1':
            response = `END Your balance is RWF 500`;
            break;
        case '2':
            response = `END You have bought airtime successfully`;
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
