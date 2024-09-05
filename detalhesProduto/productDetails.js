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

    async productRecommended() {
        const productRecommended = document.getElementById('product-recommended');
        
        const { data: products, error } = await supabase
            .from('products')
            .select('imagem, name'); // Recupera as imagens e os nomes dos produtos
    
        if (error) {
            console.error('Erro ao buscar os produtos recomendados:', error);
            return;
        }
    
        let carouselItems = '';
        let itemsPerSlide = 4; // Número de imagens por slide
        products.forEach((product, index) => {
            if (index % itemsPerSlide === 0) {
                if (index !== 0) {
                    carouselItems += '</div>'; // Fechar o slide anterior
                }
                // Verifica se é o primeiro item, que precisa da classe "active"
                const activeClass = index === 0 ? 'active' : '';
                carouselItems += `<div class="carousel-item ${activeClass}">`;
            }
            
            carouselItems += `
                <img src="${product.imagem}" class="d-block" alt="${product.name}">
            `;
        });
        
        carouselItems += '</div>'; // Fechar o último slide
        productRecommended.innerHTML = carouselItems;
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
    <strong class="fs-3">PODE GOSTAR TAMBÉM</strong>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="product-recommended"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>


        `;
    }
}

const productDetails = new ProductDetails();
document.addEventListener('DOMContentLoaded', () => productDetails.loadProductDetails());
