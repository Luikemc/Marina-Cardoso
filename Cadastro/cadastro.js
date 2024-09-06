import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4';
const supabase = createClient(supabaseUrl, supabaseKey);

/*deve-se comecar igual os outros. colocando a classe e etc. Ok? E cada classe vai ter as funcoes e etc.
Tem o nome la espefico mas nao me lembro, objetos acho... Acho que e isso. Dentro da classe de cadastro vai ter 
os objetos por exemplo, 'pegarValor' que taria recebendo os valores do input. Seria uma funcao no caso.
Pode usar o login como exemplo pra saber fazer ou o cadastro de  produtos que e o 'addproduto'. 

QUALQUER DUVIDA PODE PERGUNTAR...*/

/*Outra dica--> sempre use o inspecionar elemente do navegar e va em console. Ele vai te dar varias informacoes importantes
sobre seu codigo e o que pode estar aconteccendo de errado nele. 

Outra dica -> voce pode usar um debug manual, que seria colocar console.log dentro das funcoes pra saber se elas estao
sendo chamadas corretamente e etc...*/