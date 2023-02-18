const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const _port = 8080;
const _endPoint = 'http://localhost:8080/';
const _clientId = 'generated_client_id_for_merchant';
const _redirectUri = _endPoint + 'testOAuth/callback';

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// test passed headers from postman
app.get('/checkAuthHeader', (req, res) => {
    res.send(req.headers);
});

// test passed query from postman
app.get('/checkAuthQuery', (req, res) => {
    res.send({ originalUrl: req.originalUrl, query: req.query });
});

// нэвтрэх хүсэлт үүсгэж байна
app.get('/testOAuth', (req, res) => {
    var queryParams = {
        client_id: _clientId,
        redirect_uri: _redirectUri,
        scope: 'GET,POST'
    }
    res.redirect(_endPoint + 'testOAuth/authorize?' + new URLSearchParams(queryParams).toString())
});

// Энд бүртгэлтэй client_id эсэхийг шалгах ёстой
app.get('/testOAuth/authorize', (req, res) => {
    // тухайн үед үүсгэсэн код байх ёстой ингэснээр дундуур нь хүсэлт дуурайж явуулах боломжгүй хамгаалагдана
    var code = Buffer.from(req.query.client_id).toString('base64');
    var redirect_uri = req.query.redirect_uri;
    if (!req.query.scope || req.query.scope.indexOf('GET') < 0) res.status(400).end('Bad Request');
    else {
        // web interface ашиглаад өөрийн системийн хэрэглэгчийг нэвтрүүлж болно
        // нэвтэрч орсны дараа кодыг илгээнэ
        res.redirect(redirect_uri + '?code=' + code);
    }
});

// тухайн үед үүсгэсэн кодыг хүлээн авч хандах эрх авах хүсэлт явуулж байна
app.get('/testOAuth/callback', (req, res) => {
    var data = {
        grant_type: 'authorization_code',
        code: req.query.code,
        client_id: _clientId,
        redirect_uri: _redirectUri
    };
    axios.post(_endPoint + 'testOAuth/token', data).then(response => {
        res.json(response.data);
    }).catch(err => {
        res.status(500).end(err.message);
    });
});

// хандах эрх буцаана
app.post('/testOAuth/token', (req, res) => {
    var data = {
        originalUrl: req.originalUrl,
        grant_type: req.body.grant_type,
        code: req.body.code,
        client_id: req.body.client_id,
        redirect_uri: req.body.redirect_uri
    };
    console.log('*token', data, Buffer.from(JSON.stringify(data)).toString('base64'));
    var result = {
        access_token: Buffer.from(JSON.stringify(data)).toString('base64')
    }
    res.json(result);
});

app.listen(_port, () => {
    console.log(`Up and Running on port ${_port}`);
});