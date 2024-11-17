console.log("Arquivo site.js carregado com sucesso.");

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-upload');
const fileList = document.getElementById('file-list');
const uploadButton = document.querySelector('.upload-button');
const cancelButton = document.querySelector('.cancel-button');

// Variável para armazenar arquivos arrastados ou selecionados
let selectedFiles = [];

// Função para exibir os arquivos na interface
function handleFiles(files) {
    fileList.innerHTML = ''; // Limpa a lista de arquivos exibida
    selectedFiles = []; // Limpa a lista de arquivos armazenados

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        selectedFiles.push(file); // Armazena o arquivo na lista global
        const listItem = document.createElement('p');
        listItem.textContent = `Arquivo: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fileList.appendChild(listItem);
        console.log('Arquivo:', file.name);
    }
}

// Eventos de Drag and Drop
uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadArea.style.backgroundColor = '#e9e9e9';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = '#f9f9f9';
});

uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadArea.style.backgroundColor = '#f9f9f9';

    const files = event.dataTransfer.files;
    handleFiles(files);
});

// Evento de seleção de arquivo pelo botão
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

// Função para o botão "Cancelar"
cancelButton.addEventListener('click', () => {
    fileList.innerHTML = '';
    fileInput.value = '';
    selectedFiles = []; // Limpa a lista de arquivos armazenados
    console.log("Upload cancelado.");
});

// Função para o botão "Fazer Upload"
uploadButton.addEventListener('click', () => {
    if (selectedFiles.length === 0) {
        alert("Nenhum arquivo selecionado para upload.");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('arquivos', selectedFiles[i]);
    }

    // Envia os arquivos para o servidor usando fetch
    fetch('/Arquivo/Upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            fileList.innerHTML = ''; // Limpa a lista de arquivos após upload
            fileInput.value = ''; // Reseta o campo de seleção de arquivos
            selectedFiles = []; // Limpa a lista de arquivos armazenados
        } else {
            alert("Falha ao enviar os arquivos: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao enviar arquivos:", error);
        alert("Erro ao enviar arquivos. Verifique o console para mais detalhes.");
    });
});
