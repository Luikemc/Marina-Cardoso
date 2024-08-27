import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4';
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('loja.js carregado');

class Loja {
    constructor() {
        // Inicializa as ações ao carregar a página
        this.initialize();
    }

    async initialize() {
        // Chama o método para carregar produtos
        await this.loadProducts();
    }


    async loadProducts() {
        try {
            // Conecta ao banco de dados e busca os produtos
            let { data: products, error } = await supabase
                .from('products')
                .select('*');

            if (error) throw error;

            // Chama a função para exibir os produtos na página
            this.displayProducts(products);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error.message);
        }
    }

    displayProducts(products) {
        const productList = document.getElementById('product-list');

        products.forEach(product => {
            const productCard = `
                <div class="col-md-3">
                    <div class="card mb-4 shadow-sm">
                        <img src="${product.imagem}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text text-success"><strong>R$ ${product.price}</strong></p>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });
    }

}

// Instância da classe Loja
var loja = new Loja();
    
  

