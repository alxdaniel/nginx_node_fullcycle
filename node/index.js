require('dotenv').config(); 
const express = require('express')
const mysql = require('mysql2');

const { uniqueNamesGenerator, adjectives, colors, names } = require('unique-names-generator');

const app = express()
const port = 8081

const dbPoolConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

const pool = mysql.createPool(dbPoolConfig);

function generateName()  {
    return new Promise((resolve) => {
        var name = uniqueNamesGenerator({
            dictionaries: [names, colors, adjectives], 
            length: 3,
            style: 'capital',
            separator: ' ',
        }); 
        return resolve(name);
    });
};

function nameToDatabase(name) {    
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PEOPLE(name) VALUES (?)', [name], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

function namesFromDatabase() {
    return new Promise((resolve, reject)  => {
        pool.query("SELECT name FROM PEOPLE", (error, rows) => {
            if (error) {
                return reject(error);
            };
            return resolve(rows.map((row) => row.name));
       });
    });
}

app.get('/', (req, res) => {

    generateName()
        .then((name) => {
            console.log(`Nome gerado: ${name}`);
            return nameToDatabase(name);
        })
        .then(() => {
            return namesFromDatabase();
        })
        .then((names) => {
            const namesList = names.map((name) => `<li>${name}</li>`).join('');

            const htmlResponse = `<h1> Full Cycle Rocks!! </h1><ul>${namesList}</ul>`;
            res.send(htmlResponse);
        });
})

app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK');
})

app.listen(port, () => {
    console.log('Rodando na porta: ' + port)    
})

