class Produto{
    constructor(){
        this.id = 1
        this.arrayProdutos = []
        this.confirmEdit = null
    }

    salvar(){
        let produto = this.lerDados()

        if(this.validaCampo(produto)){
            if (this.confirmEdit == null) {
                this.adicionar(produto)
            }else{
                this.atualizar(this.confirmEdit, produto)
                this.confirmEdit = null;
                document.getElementById('btn1').innerHTML = 'Salvar';
            }
            
        }

        this.listarTabela()
        this.cancelar()
    }
    
    cancelar(){
        document.getElementById('produto').value = ''
        document.getElementById('valor').value = ''
    }

    adicionar(produto){
        this.arrayProdutos.push(produto)
        this.id++
    }

    listarTabela(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++){

            let tr = tbody.insertRow()
            
            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_preco = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_preco.innerText = this.arrayProdutos[i].preco

            td_id.classList.add('center')
            td_produto.classList.add('center')
            td_preco.classList.add('center')
            td_acoes.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = './imagens/editar-texto.png'
            imgEdit.setAttribute("onclick", "produto.prepararEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")")

            let imgDelete = document.createElement('img')
            imgDelete.src = './imagens/excluir.png'
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")")
            
            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)
        }
    }

    lerDados(){
        let produto ={}

        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('valor').value

        return produto
    }

    validaCampo(produto){
        let msg = ''

        if(produto.nomeProduto == ''){
            alert(`Voce deixou o campo Produto em branco`)
        }

        if(produto.preco == ''){
            alert(`Voce deixou o campo Preco em branco`)
        }

        if(msg != ''){
            alert(msg)
            return false
        }
        
        return true
    }

    deletar(id){

        if (confirm(`Quer deletar o ${id}`)) {
    
            let tbody = document.getElementById('tbody')

            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }
    }

    prepararEdicao(dados){
        this.confirmEdit = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('valor').value = dados.preco

        document.getElementById('btn1').innerHTML = 'Atualizar'
    
    }

    atualizar(id, produto){
        for (let i = 0;  i < this.arrayProdutos.length; i++){
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }
}

var produto = new Produto()