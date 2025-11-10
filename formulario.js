// Máscara para telefone
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    e.target.value = value;
});

// Manipulação do formulário
const form = document.getElementById('inscricaoForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const termos = document.getElementById('termos').checked;
    
    if (!nome || !email || !telefone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (!termos) {
        alert('Você precisa aceitar os termos para continuar.');
        return;
    }
    
    // Coleta dos dados
    const formData = {
        nome: nome,
        email: email,
        telefone: telefone,
        cidade: document.getElementById('cidade').value,
        experiencia: document.getElementById('experiencia').value,
        mensagem: document.getElementById('mensagem').value,
        timestamp: new Date().toISOString()
    };
    
    console.log('Dados do formulário:', formData);
    
    // Aqui você pode enviar os dados para um backend
    // Exemplo com fetch:
    /*
    fetch('/api/inscricao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    */
    
    // Simular envio bem-sucedido
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Scroll suave para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});