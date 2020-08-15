const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')


// Servidor
const express = require('express')
const server = express() // chama a função express da constante express

// Configurar o nunjucks - coversar com o html
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, // Desativar o guardar em memória

})

// Configurar os arquivos estáticos onde tem todas as (imagens, scripts e css)
server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
// receber os dados no req.body
// Applications rotes
.get("/", pageLanding)
.get("/study", pageStudy) // GET - define a rota, por exemplo nessa o study que acessára o arquivo study.html
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500)

// Chamar a função do servidor express e criar um servidor com a porta 5500
// Pegar o / pedido na página e uma arrow function(com, req e res) que retornará a página sempre que entrar na rota.
// Chamar a funcionalidade listen do objeto express para criar um servidor(porta)
// OBS: Desligar o servidor a cada mundança(CTRL + C - desliga, CTRL + L - limpa o terminal)

// No terminal bash:
// 1 - npm init -y; começa um novo projeto(cria o package.json - objetos)
// 2 - npm install express: biblioteca do servidor(node_modules e o package-lock.json)
// OBS: node src/sever.js - acessa o server manualmente
// 3 - npm install nodemon -D: desliga e liga o servidor a cada mudança(-D só para dev)
// 4 - após isso, em scripts no package.json, mude 'test' para 'dev' e bote o comando: 'nodemon src/server.js'
// 5 - rodar e acessar dev com o npm: 'npm run dev' no terminal bash e a cada vez que salvar o server será reiniciado.
// 6 - sendFile(__dirname(dirname tem o caminho do arquivo(src/) + o /pasta/arquivo.html)
// 7 - para rodar o servidor na máquina só abrir o terminal no bash e executar o comando(npm server.js)
// 8 - instalar o npm install nunjucks(pacote para pegar os objetos e botar no html)


// ligar o servidor: npm 
/* function express() {  // Criar uma função que retorna um objeto
    return {
        name: 'Gabriel',
        age: 19
    }
}

express().age //Executar a função chamando o key*/