const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "nodedb"
});

con.connect().then(() => console.log("Connected"));

// CREATE
app.post('/postData', (req, res) => {
    const { id, name, email, password, role, phone, verified, type } = req.body;
    const insert_query = 'INSERT INTO "user" (id, name, email, password, role, phone, verified, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    con.query(insert_query, [id, name, email, password, role, phone, verified, type], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("POSTED DATA");
    });
});

// READ ALL
app.get('/getData', (req, res) => {
    const select_query = 'SELECT * FROM "user"';
    con.query(select_query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result.rows);
    });
});

// READ BY ID
app.get('/getData/:id', (req, res) => {
    const { id } = req.params;
    const select_query = 'SELECT * FROM "user" WHERE id = $1';
    con.query(select_query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result.rows);
    });
});

// UPDATE
app.put('/updateData/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, phone, verified, type } = req.body;
    const update_query = 'UPDATE "user" SET name = $1, email = $2, password = $3, role = $4, phone = $5, verified = $6, type = $7 WHERE id = $8';
    con.query(update_query, [name, email, password, role, phone, verified, type, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("UPDATED DATA");
    });
});

// DELETE
app.delete('/deleteData/:id', (req, res) => {
    const { id } = req.params;
    const delete_query = 'DELETE FROM "user" WHERE id = $1';
    con.query(delete_query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("DELETED DATA");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 ..... ");
});
