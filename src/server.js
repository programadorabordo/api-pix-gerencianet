if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');

const cert = fs.readFileSync(
  path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: ''
});

const credentials = Buffer.from(
  `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
).toString('base64');

axios({
  method: 'POST',
  url: `${process.env.GN_ENDPOINT}/oauth/token`,
  headers: {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json'
  },
  httpsAgent: agent,
  data: {
    grant_type: 'client_credentials'
  }
}).then((response) => console.log(response.data));

/*
curl --request POST \
  --url https://api-pix-h.gerencianet.com.br/oauth/token \
  --header 'Authorization: Basic Q2xpZW50X0lkX2E0Y2Y5ZGNjOGYwZmFhYTk2NmJlOGI1YTg2MTczMmZjZDRkYzgwZWQ6Q2xpZW50X1NlY3JldF8yMzMxZTdlZjBiNjM3ZWI3ODZiOWFhMDQzNDJkMmE4Zjk0ZjdkMDVh' \
  --header 'Content-Type: application/json' \
  --data '{
	"grant_type": "client_credentials"
}'*/