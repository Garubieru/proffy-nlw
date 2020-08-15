// Instalar o sqlite com npm install sqlite-async
// Importar o módulo
const Database = require('sqlite-async')

function execute(db) {
    // Criar as tabelas do banco de dados.
    // Crie a tabela se não existir
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}
// Exportar o db(BAnco de dados)
module.exports = Database.open(__dirname + '/database.sqlite').then(execute) // Abrir o banco de dados e criar um arquivo. A função then() serve para executar as outras linhas do código somente depois do arquivo ser criado ou salvado.
