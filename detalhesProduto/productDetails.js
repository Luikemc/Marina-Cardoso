import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4';
const supabase = createClient(supabaseUrl, supabaseKey);

class ProductDetails {
    async loadProductDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product_id');

        if (productId) {
            const { data: product, error } = await supabase
                .from('products')
                .select('*')
                .eq('product_id', productId)
                .single();

            if (error) {
                console.error('Erro ao carregar os detalhes do produto:', error.message);
            } else {
                this.displayProductDetails(product);
                this.productRecommended();  // Chama o carrossel depois de carregar os detalhes do produto
            }
        } else {
            console.error('ID do produto não fornecido na URL.');
        }
    }


    displayProductDetails(product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
        <div class="container mt-5 p-5">
            <div class="row">
                <div class="col-md-3 d-flex justify-content-center w-50">
                    <img src="${product.imagem}" alt="${product.name}" class="img-fluid">
                </div>
                <div class="col-md-5 m-0">
                    <div>
                        <h5 class="card-title fs-5 mt-n3">${product.name}</h5>
                        <p class="text-success fs-5"><strong>R$ ${product.price},00</strong></p>
                        <div class="mb-3">
                            <p class="fs-5"><strong>CORES</strong></p>
                            <div class="d-flex">
                                <div class="color-circle" style="background-color: red;"></div>
                                <div class="color-circle" style="background-color: blue;"></div>
                                <div class="color-circle" style="background-color: green;"></div>
                                <div class="color-circle" style="background-color: yellow;"></div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <p class="fs-5"><strong>TAMANHOS</strong></p>
                            <div class="d-flex">
                                <div class="size-box">P</div>
                                <div class="size-box">M</div>
                                <div class="size-box">G</div>
                                <div class="size-box">GG</div>
                            </div>
                            <p class="text-success fs-6"><strong>ESTOQUE ${product.stock}</strong></p>
                        </div>

                        <button class="w-100 bg-green fw-bold">COMPRAR</button>
                    </div>
                </div>
            </div>
            <p class="fs-4"><strong>Descrição do Produto</strong></p>
            <p class="card-text col-md-7">${product.description}</p>
        </div>
    
        <div class="container mt-0 p-5">
    <strong class="fs-3">PODE GOSTAR TAMBÉM</strong></div>
        
        `;
    }
    
}

const productDetails = new ProductDetails();
document.addEventListener('DOMContentLoaded', () => productDetails.loadProductDetails());