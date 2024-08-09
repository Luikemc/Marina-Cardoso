class Home {
    constructor() {
        // Inicializa as ações ao carregar a página
        this.initialize();
    }
    
    initialize() {
        // Adiciona o event listener para quando o DOM estiver completamente carregado
        document.addEventListener('DOMContentLoaded', () => {
            // Obtém o nome de usuário e o status de administrador do localStorage
            const loggedInUser = localStorage.getItem('loggedInUser');
            const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Assume que o status de admin é armazenado como 'true' ou 'false'

            console.log(`ele e um adm? ${isAdmin}`)
          
            if (!loggedInUser) {
                // Se não houver usuário logado, redireciona para a página de login
                window.location.href = '../login.html';
            } else {
                // Exibe uma mensagem de boas-vindas ou outras informações
                console.log(`Usuário logado aqui: ${loggedInUser}`);
                
                // Ajusta a visibilidade do ícone de adicionar produto
                this.toggleAddProductIcon(isAdmin);
            }
        });
    }

    toggleAddProductIcon(isAdmin) {
        const addProductIcon = document.getElementById('plus');
        if (isAdmin) {
            addProductIcon.style.display = 'block'; // Torna visível
        } else {
            addProductIcon.style.display = 'none';  // Torna invisível
        }
    }

    addProduct() {
        // Lógica para adicionar um produto
        alert('Voce sera redirecionado');
        window.location.href = '../AddProduto/addProduto.html';
    }

    infoUser(){
        const loggedInUser = localStorage.getItem('loggedInUser');
        alert(`Usuário logado aqui: ${loggedInUser}`)
    }
}

// Crie uma instância da classe Home
const home = new Home();
