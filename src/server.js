if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const GNRequest = require('./apis/gerencianet');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

const reqGNAlready = GNRequest({
  clientID: process.env.GN_CLIENT_ID,
  clientSecret: process.env.GN_CLIENT_SECRET
});

app.get('/', async (req, res) => {
  const reqGN = await reqGNAlready;
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '100.00'
    },
    chave: '126bec4a-2eb6-4b79-a045-78db68412899',
    solicitacaoPagador: 'Cobrança dos serviços prestados.'
  };

  const cobResponse = await reqGN.post('/v2/cob', dataCob);
  const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

  res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
});

app.get('/cobrancas', async(req, res) => {
  const reqGN = await reqGNAlready;

  const cobResponse = await reqGN.get('/v2/cob?inicio=2021-02-15T16:01:35Z&fim=2021-02-22T23:59:00Z');

  res.send(cobResponse.data);
});

app.listen(8000, () => {
  console.log('running');
})