import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4';
const supabase = createClient(supabaseUrl, supabaseKey);

class Login {
  async verificaLogin(event) {

    console.log('start now');
    
    event.preventDefault();

    let username = document.getElementById('user').value;
    let password = document.getElementById('senha').value;

    let { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    if (error) {
      console.error('Erro ao buscar usuário:', error.message);
      alert('Erro ao fazer login!');
      return false;
    }

    if (users && users.length > 0 && users[0].password === password) {
      console.log('Login bem-sucedido');
      alert('Login bem-sucedido!');

      localStorage.setItem('loggedInUser', username)

       let admValue = await this.verificarAdm(username);
      if (admValue) {
        console.log('Usuário é administrador');
        // Adicione lógica para administradores se necessário
      } else {
        console.log('Usuário não é administrador');
      }
      
      localStorage.setItem('isAdmin', admValue);
      window.location.href = '../Home/home.html';
      return true;

    } else {
      console.log('Login inválido');
      alert('Login inválido!');
      return false;
    }
  }

  async verificarAdm(username) {
    // Realiza a consulta no Supabase
    let { data: users, error } = await supabase
      .from('users')
      .select('adm')       // Seleciona apenas a coluna 'adm'
      .eq('username', username);  // Filtra pelo nome de usuário

    if (error) {
        console.error('Erro ao buscar dados:', error.message);
        return null;  // Retorna null ou um valor apropriado em caso de erro
    }

    if (users && users.length > 0) {
        // Obtém o valor de 'adm' do primeiro usuário retornado
        const admValue = users[0].adm;

        if (admValue) {
            console.log('O valor de adm é verdadeiro');
        } else {
            console.log('O valor de adm é falso');
        }

        return admValue;  // Retorna o valor de 'adm' para uso posterior
    } else {
        console.log('Nenhum usuário encontrado');
        return null;  // Retorna null se nenhum usuário for encontrado
    }
}
}
let login = new Login();
document.getElementById('login-form').addEventListener('submit', (event) => login.verificaLogin(event));
