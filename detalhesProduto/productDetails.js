import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function loadProductDetails() {
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
            displayProductDetails(product);
        }
    } else {
        console.error('ID do produto não fornecido na URL.');
    }
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
    <div class="container mt-5 p-5">
    <div class="row align-items-center">
        <div class="col-md-3 d-flex justify-content-center w-50">
            <img src="${product.imagem}" alt="${product.name}" class="img-fluid w-500">
        </div>
        <div class="col-md-5 m-5 ">
            <div>
                <h5 class="card-title">${product.name}</h5>
                <p class="text-success"><strong>R$ ${product.price}</strong></p>
               <div class="mb-3">
                    <p><strong>CORES</strong></p>
                    <div class="d-flex">
                        <div class="color-circle" style="background-color: red;"></div>
                        <div class="color-circle" style="background-color: blue;"></div>
                        <div class="color-circle" style="background-color: green;"></div>
                        <div class="color-circle" style="background-color: yellow;"></div>
                    </div>
                </div>

                <div class="mb-3">
                    <p><strong>TAMANHOS</strong></p>
                    <div class="d-flex">
                        <div class="size-box">P</div>
                        <div class="size-box">M</div>
                        <div class="size-box">G</div>
                        <div class="size-box">GG</div>
                    </div>
                </div>

                <button class="w-100 bg-green">COMPRAR</button>
            </div>
        </div>
    </div>
    <p class="card-text">${product.description}</p>
</div>



    `;
}

document.addEventListener('DOMContentLoaded', loadProductDetails);
