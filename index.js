const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    response(200, "ini data", "Berhasil", res)
})
// get list mahasiswa
app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (error, result) => {
        response(200, result, "Berhasil get list mahasiswa", res)
    })
})
// get detail mahasiswa
app.get('/mahasiswa/:nim', (req, res) => {
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.params.nim}`;
    db.query(sql, (error, result) => {
        response(200, result, `List Mahasiswa Muncul ${req.params.id}`, res)
    })
})
// post mahasiswa
app.post('/mahasiswa', (req, res) => {
    const {nim, nama_lengkap, kelas, alamat} = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}')`
    db.query(sql, (error, result) => {
        res.send('berhasilmenambahkan mahasiswa')
    })
})
// put mahasiswa
app.put('/mahasiswa', (req, res) => {
    const {nim, nama_lengkap, kelas, alamat} = req.body
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`
    db.query(sql, (error, result) => {
        if (error) response(500, "invalid", "error", res)
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                message: result.message
            }
            response(200, data, `Berhasil mengupdate data`, res)
        }
        response(404, "user not found", "error", res)
    })
})
// delete mahasiswa
app.delete('/mahasiswa/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM mahasiswa WHERE id = ${id}`
    db.query(sql, (error, result) => {
        if (error) response(500, "invalid", "error", res)
        if (result.affectedRows) {
            response(200, `${req.params.id}`, 'Data Berhasil Di Hapus', res)
        }
    })
})



// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM mahasiswa";
//     db.query(sql, (error, result) => {
//         response(200, result, "Berhasil", res)
//     })
// })

// app.get('/find', (req, res) => {
//     const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`;
//     db.query(sql, (error, result) => {
//         response(200, result, "Berhasil", res)
//     })
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})