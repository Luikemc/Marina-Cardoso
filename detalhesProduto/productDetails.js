import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';
import { initializeSwiper } from './recommendedProduct.js'

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
                await this.loadRecommendedProducts();
                // Chama o carrossel depois de carregar os detalhes do produto
            }
        } else {
            console.error('ID do produto não fornecido na URL.');
        }
    }

    async loadRecommendedProducts() {
        try {
            const { data: product, error } = await supabase
                .from('products')
                .select('*')
                .limit(6); // Carregar 6 produtos recomendados

            if (error) throw error;
            this.displayRecommendedProducts(product);
        } catch (error) {
            console.error('Erro ao carregar produtos recomendados:', error.message);
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
            <strong class="fs-3">PODE GOSTAR TAMBÉM</strong>
        </div>
        `;
    }

    displayRecommendedProducts(products) {
        const productRecomenda = document.getElementById('product-recomendas');
        let productSlides = '';

        products.forEach(product => {
            productSlides += `
                <div class="swiper-slide">
                    <a href="../detalhesProduto/productDetails.html?product_id=${product.product_id}">
                        <img src="${product.imagem}" alt="${product.name}" width="300" height="404" loading="lazy">
                        <h3>${product.name}</h3>
                    </a>
                </div>
            `;
        });

        productRecomenda.innerHTML = `
            <div class="carousel-block">
                <div class="container">
                    <div class="slider-container">
                        <div class="swiper mySwiper">
                            <div class="swiper-wrapper">
                                ${productSlides}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        initializeSwiper(); // Inicializa o Swiper depois de adicionar os slides
    }
    
}

const productDetails = new ProductDetails();
document.addEventListener('DOMContentLoaded', () => productDetails.loadProductDetails());
