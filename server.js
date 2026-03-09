const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();
const PORT = 3000;

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(express.static(__dirname));

app.use('/api', middlewares, router); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 SERVIDOR VR TUDO-EM-UM RODANDO`);
    console.log(`🌍 Frontend: http://localhost:${PORT}`);
    console.log(`📊 API Banco: http://localhost:${PORT}/api/itens`);
    console.log(`Pressione CTRL+C para parar.\n`);
});