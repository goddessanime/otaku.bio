const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const getUser = require('./getUser');
const EnvService = require('./service/env');
const envService = new EnvService();

let headers = envService.makeArrayWithName("headers");

// Middleware Connections

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Set the 'X-Powered-By' header to 'Express'
app.use((req, res, next) => {
    res.set('X-Powered-By', 'goddessanime.com');
    res.set("Referer", "https://goddessanime.com/");
    res.set("Owner", "https://zenithlive.lol/")
    next();
});


// Routes
app.get('/:username', async (req, res) => {
    const username = req.params.username;
    const data = await getUser(username, req.hostname);
    
    const findBotHeader = () => {
        const botHeader = headers.find(header => header.toLowerCase() === req.headers['user-agent'].toLowerCase());

        if (botHeader) return true;
        else return false;
    };

    const botHeader = findBotHeader();
    
    if (data.error) {
        if (botHeader) return res.status(data.status).json(data);
    
        res.redirect(`${process.env.URL}/error`);
    }
    else {
        if (botHeader) return res.json(data);

        res.redirect(`${process.env.URL}/user/${data.id}`);
    }
});

app.get('*', (req, res) => {
    res.redirect(`${process.env.URL}`)
});

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.clear();
    console.log(`Server started on port ${PORT}`);

    console.log(`Press CTRL + C to stop the server`);
});