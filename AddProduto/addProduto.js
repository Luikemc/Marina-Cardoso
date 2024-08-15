import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4';
const supabase = createClient(supabaseUrl, supabaseKey);

class Produto {
    constructor() {
        this.arrayProdutos = [];
        this.confirmEdit = null;
    }

    async salvar() {
        let produto = this.lerDados();
    
        if (this.validaCampo(produto)) {
            if (this.confirmEdit == null) {
                await this.adicionar(produto);
            } else {
                await this.atualizar(this.confirmEdit, produto);
                this.confirmEdit = null;
                document.getElementById('btn1').innerHTML = 'Salvar';
                document.getElementById('btn1').onclick = () => this.salvar();
            }
            this.listarTabela(); // Mova para dentro do bloco condicional
        }
        this.cancelar();
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('descr').value = '';
        document.getElementById('imagem').value = '';
        document.getElementById('estoque').value = '';
    
        console.log(`cancelando`);

        this.confirmEdit = null;
        document.getElementById('btn1').innerHTML = 'Salvar';
    }

    async adicionar(produto) {
        let { data, error } = await supabase
            .from('products')
            .insert([produto]);
    
        if (error) {
            console.error('Erro ao adicionar produto:', error.message);
            alert('Erro ao adicionar produto!');
            return;
        }
    
        console.log('Produto adicionado com sucesso:', data);
        
         // Atualize a tabela
         this.listarTabela();
         this.cancelar()
        // Adicione o novo produto à lista local
        this.arrayProdutos.push(data[0]);
    }

    async listarTabela() {
        let tbody = document.getElementById('tbody');
        console.log(`estou listando`)
        tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
    
        let { data: produtos, error } = await supabase
            .from('products')
            .select('*');
        
        if (error) {
            console.error('Erro ao carregar produtos:', error.message);
            alert('Erro ao carregar produtos!');
            return;
        }
        
        this.arrayProdutos = produtos; // Armazena os produtos no array
        
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();
            
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_img = tr.insertCell();
            let td_estoque = tr.insertCell();
            let td_acoes = tr.insertCell();
            
            td_id.innerText = this.arrayProdutos[i].product_id;
            td_produto.innerText = this.arrayProdutos[i].name;
            td_preco.innerText = this.arrayProdutos[i].price;
            td_descricao.innerText = this.arrayProdutos[i].description;
            td_img.innerText = this.arrayProdutos[i].imagem;
            td_estoque.innerText = this.arrayProdutos[i].stock;
            
            td_id.classList.add('center');
            td_produto.classList.add('center');
            td_preco.classList.add('center');
            td_descricao.classList.add('center');
            td_img.classList.add('center');
            td_estoque.classList.add('center');
            td_acoes.classList.add('center');
            
            // Ícone de edição
            // Ícone de edição
            let editWrapper = document.createElement('span');
            let editIcon = document.createElement('i');
            editIcon.setAttribute('data-feather', 'edit');
            editIcon.classList.add('m-2', 'cursor-pointer');
            editIcon.style.cursor = 'pointer';
            editWrapper.onclick = () => this.prepararEdicao(this.arrayProdutos[i]);
            editWrapper.appendChild(editIcon);

            // Ícone de exclusão
            let deleteWrapper = document.createElement('span');
            let deleteIcon = document.createElement('i');
            deleteIcon.setAttribute('data-feather', 'trash');
            deleteIcon.classList.add('m-2', 'cursor-pointer');
            deleteIcon.style.cursor = 'pointer';
            deleteWrapper.onclick = () => this.deletar(this.arrayProdutos[i].product_id);
            deleteWrapper.appendChild(deleteIcon);

            td_acoes.appendChild(editWrapper);
            td_acoes.appendChild(deleteWrapper);

            console.log(`listados`)
            feather.replace();
        }
    }

    lerDados() {
        let produto = {};
        const maxLength = 30;
    
        produto.name = document.getElementById('produto').value;
        produto.price = document.getElementById('valor').value;
        produto.description = document.getElementById('descr').value;
        produto.imagem = document.getElementById('imagem').value;
        produto.stock = document.getElementById('estoque').value;
    
        if (produto.imagem.length > maxLength) {
            produto.imagem = produto.imagem.slice(0, maxLength) + '...';
        }
    
        console.log('lerDados:', produto);
        return produto;
    }

    validaCampo(produto) {
        let msg = '';

        if (produto.name === '') {
            msg += 'Você deixou o campo Produto em branco.\n';
        }

        if (produto.price === '') {
            msg += 'Você deixou o campo Preço em branco.\n';
        }

        if (produto.description === '') {
            msg += 'Você deixou o campo Descrição em branco.\n';
        }

        if (produto.imagem === '') {
            msg += 'Você deixou o campo Imagem em branco.\n';
        }

        if (produto.stock === '') {
            msg += 'Você deixou o campo Estoque em branco.\n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }
        
        return true;
    }

    async deletar(id) {
        if (confirm(`Quer deletar o produto com ID ${id}?`)) {
            let { data, error } = await supabase
                .from('products')
                .delete()
                .eq('product_id', id); // Ajuste o nome da coluna se necessário

            if (error) {
                console.error('Erro ao deletar produto:', error.message);
                alert(`Erro ao deletar produto! ${id}`);
                return;
            }

            console.log('Produto deletado com sucesso:', data);

            // Atualiza o array e a tabela
            this.arrayProdutos = this.arrayProdutos.filter(produto => produto.product_id !== id);
            this.listarTabela();
        }
    }

    prepararEdicao(dados) {
        this.confirmEdit = dados.product_id;
    
        document.getElementById('produto').value = dados.name;
        document.getElementById('valor').value = dados.price;
        document.getElementById('descr').value = dados.description;
        document.getElementById('imagem').value = dados.imagem;
        document.getElementById('estoque').value = dados.stock;
    
        console.log('preparando edicao')
        document.getElementById('btn1').innerHTML = 'Atualizar'
    }

    async atualizar(id, produto) {
        let { data, error } = await supabase
            .from('products')
            .update(produto)
            .eq('product_id', id);
        
        if (error) {
            console.error('Erro ao atualizar produto:', error.message);
            alert('Erro ao atualizar produto!');
            return;
        }
        
        console.log('Produto atualizado com sucesso:', data);

        // Atualize a tabela
        this.listarTabela();
        this.cancelar()
        // Adicione o novo produto à lista local
        this.arrayProdutos.push(data[0]);
        
        // Atualiza o produto no array local
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].product_id === id) {
                this.arrayProdutos[i] = data[0];
            }
        }
    }
}

var produto = new Produto(); // Inicializa a instância

document.addEventListener('DOMContentLoaded', () => {
    produto.listarTabela();
});
document.getElementById('btn1').addEventListener('click', () => {
    produto.salvar(); // Usa o método salvar da instância
});
document.getElementById('btn2').addEventListener('click', ()=>{
    produto.cancelar()
})
