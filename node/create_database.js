const mysql = require('mysql2');
require('dotenv').config(); 

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
});

var createDb = new Promise(function(resolve, reject) {
    con.execute("CREATE DATABASE IF NOT EXISTS nodedb");
    resolve("Database `nodedb` criado"); 
});

var createTb = new Promise(function(resolve, reject) {
    con.execute("CREATE TABLE IF NOT EXISTS nodedb.people(name VARCHAR(100) NOT NULL)");
    resolve("Tabela `people` criada");
});

Promise.allSettled([createDb, createTb]).then((result) => {
        console.log("Migração executada corretamente:", result);
        setTimeout(() => {
            console.log("Saindo...");
            con.end;
            process.exit(0);
        }, 3000);        
    });