// Validação e formatação do telefone internacional
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', function(e) {
    // Remove tudo que não é número, +, espaço, hífen ou parênteses
    let value = e.target.value.replace(/[^\d\+\s\-\(\)]/g, '');
    e.target.value = value;
});

// Validação adicional no blur (quando sai do campo)
telefoneInput.addEventListener('blur', function(e) {
    const value = e.target.value.trim();
    const onlyNumbers = value.replace(/\D/g, '');
    
    // Verifica se tem pelo menos 10 dígitos (mínimo aceitável)
    if (onlyNumbers.length > 0 && onlyNumbers.length < 10) {
        alert('Por favor, insira um número de telefone válido com pelo menos 10 dígitos.');
        e.target.focus();
    }
});

// Manipulação do formulário
const form = document.getElementById('inscricaoForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nome || !telefone || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Valida se o telefone tem pelo menos 10 dígitos
    const onlyNumbers = telefone.replace(/\D/g, '');
    if (onlyNumbers.length < 10) {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }
    
    // Coleta dos dados
    const formData = {
        nome: nome,
        telefone: telefone,
        email: email,
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