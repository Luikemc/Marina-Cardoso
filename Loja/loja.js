class Loja { // Corrigido o nome da classe
    constructor() {
        // Inicializa as ações ao carregar a página
        this.initialize();
    }

    initialize() {
        // Adicione qualquer lógica de inicialização necessária aqui
    }

    addProduct() {
        // Lógica para adicionar um produto
        alert('Você será redirecionado');
        window.location.href = '../AddProduto/addProduto.html';
    }

    infoUser() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        alert(`Usuário logado aqui: ${loggedInUser}`);
    }
}

// Instância da classe Loja
const loja = new Loja();
