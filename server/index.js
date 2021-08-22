const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())


// 取帳號密碼做登入比對
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM user_infos", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// 取打卡紀錄資料
app.get('/api/getCheckin', (req, res) => {
    db.query("SELECT * FROM checkin_record", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

// 簽到
app.post('/api/checkin', (req, res) => {

    const id = req.body.id;
    const account = req.body.account;
    const department = req.body.department;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const checkin = req.body.checkin;

    console.log(id, account, department, year, month, day, checkin)


    db.query("INSERT INTO checkin_record (id, account, department, year, month, day, checkin) VALUES (?,?,?,?,?,?,?)", [id, account, department, year, month, day, checkin], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)

    });
})


// 更新簽到時間
app.post('/api/updateCheckIn', (req, res) => {

    const id = req.body.id;
    const checkin = req.body.checkin;

    console.log(checkin, id)
    db.query("UPDATE checkin_record SET checkin = ? WHERE id = ?", [checkin, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})


// 簽退
app.post('/api/checkout', (req, res) => {

    const id = req.body.id;
    const account = req.body.account;
    const department = req.body.department;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const checkout = req.body.checkout;

    console.log(id, account, department, year, month, day, checkout)


    db.query("INSERT INTO checkin_record (id, account, department, year, month, day, checkout) VALUES (?,?,?,?,?,?,?)", [id, account, department, year, month, day, checkout], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)

    });
})


// 更新簽退時間
app.post('/api/updateCheckOut', (req, res) => {

    const id = req.body.id;
    const checkout = req.body.checkout;

    console.log(checkout, id)
    db.query("UPDATE checkin_record SET checkout = ? WHERE id = ?", [checkout, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})

// Route for like
app.post('/api/like/:id', (req, res) => {

    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

// Route to delete a post

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})