const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(__dirname));

// Middleware para processar JSON (caso você adicione um endpoint de API)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir a landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir a página de formulário
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario.html'));
});

// Endpoint para receber os dados do formulário (opcional)
app.post('/api/inscricao', (req, res) => {
    const dados = req.body;
    
    // Aqui você pode salvar em banco de dados, enviar e-mail, etc.
    console.log('Inscrição recebida:', dados);
    
    // Responder com sucesso
    res.json({ 
        success: true, 
        message: 'Inscrição recebida com sucesso!',
        data: dados 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});