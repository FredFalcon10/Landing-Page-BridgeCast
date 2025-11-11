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
    
    // Desabilita o botão para evitar duplo envio
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Envia os dados para o webhook do Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxiDwdwQY61mBAHWq_DlmXOXcWKYWK0oyz-mnW4ic7CvcfHCb3HSjykWPIofoXuOpSyeg/exec', {
        method: 'POST',
        mode: 'no-cors', // Necessário para Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        console.log('Dados enviados com sucesso!');
        
        // Mostra mensagem de sucesso
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    .catch((error) => {
        console.error('Erro ao enviar:', error);
        
        // Reabilita o botão em caso de erro
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Inscrição';
        
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    });
});