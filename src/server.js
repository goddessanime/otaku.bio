const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const getUser = require('./getUser');
const EnvService = require('./service/env');
const envService = new EnvService();
const domains = require('./domains');

let headers = envService.makeArrayWithName("headers");

// Middleware Connections

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.set('X-Powered-By', 'srv.goddessanime.com');
    res.set("Referer", "https://goddessanime.com/");
    res.set(`Shard-Id`, `${process.env.SHARD_ID}`);
    next();
});

const getHostname = (req) => {
    const hostname = req.hostname;

    if (hostname === 'localhost') return 'otaku.bio';

    return hostname;
};


// Routes
app.get('/:username', async (req, res) => {
    const username = req.params.username;
    const data = await getUser(username, getHostname(req));
    
    const findBotHeader = () => {
        const botHeader = headers.find(header => header.toLowerCase() === req.headers['user-agent'].toLowerCase());

        if (botHeader) return true;
        else return false;
    };

    const botHeader = findBotHeader();
    
    if (data.error) {
        if (botHeader) return res.status(data.status).json(data);

        console.log(data);
    
        res.redirect(`${process.env.URL}/error`);
    }
    else {
        if (botHeader) return res.json(data);

        res.redirect(`${process.env.URL}/user/${data.id}`);
    }
});

app.get("/api/domains", (req, res) => {
    res.json(domains);
});

app.get('*', (req, res) => {
    const path = req.path;
    const query = req.query;

    let url = `${process.env.URL}${path ? path : ''}${query ? Object.keys(query).map(key => `${key}=${query[key]}`).join('&') : ''}`;

    res.redirect(url);
});

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.clear();
    console.log(`Server started on port ${PORT}`);

    console.log(`Press CTRL + C to stop the server`);
});