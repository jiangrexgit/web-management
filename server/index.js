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

// 刪除帳號
app.post('/api/delete/:id', (req, res) => {

    const id = req.params.id;
    db.query("DELETE FROM user_infos WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
});


// 新增帳號
app.post('/api/adduser', (req, res) => {

    const id = req.body.id;
    const account = req.body.account;
    const password = req.body.password;
    const name = req.body.name;
    const mail = req.body.mail;
    const gender = req.body.gender;

    console.log(id, account, name, mail, gender)


    db.query("INSERT INTO user_infos (id, account, password, name, mail, gender) VALUES (?,?,?,?,?,?)", [id, account, password, name, mail, gender], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)

    });
})


// 更新會員資料
app.post('/api/updateUser', (req, res) => {

    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const mail = req.body.mail;

    db.query("UPDATE user_infos SET password = ?,  name = ? , mail = ? WHERE id = ?", [password, name, mail, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})

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
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const checkin = req.body.checkin;

    console.log(id, account, year, month, day, checkin)


    db.query("INSERT INTO checkin_record (id, account, year, month, day, checkin) VALUES (?,?,?,?,?,?)", [id, account, year, month, day, checkin], (err, result) => {
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
    const month = req.body.month;
    const day = req.body.day;

    console.log(checkin, id)
    db.query("UPDATE checkin_record SET checkin = ? WHERE id = ? AND month = ? AND day = ?", [checkin, id, month, day], (err, result) => {
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
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const checkout = req.body.checkout;

    console.log(id, account, year, month, day, checkout)


    db.query("INSERT INTO checkin_record (id, account, year, month, day, checkout) VALUES (?,?,?,?,?,?)", [id, account, year, month, day, checkout], (err, result) => {
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
    const month = req.body.month;
    const day = req.body.day;

    console.log(checkout, id)
    db.query("UPDATE checkin_record SET checkout = ? WHERE id = ? AND month = ? AND day = ?", [checkout, id, month, day], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})

// 取請假紀錄資料
app.get('/api/getVacation', (req, res) => {
    db.query("SELECT * FROM vacation_record", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

// 取請假紀錄資料
app.post('/api/addVacation', (req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const start = req.body.start;
    const end = req.body.end;
    db.query("INSERT INTO vacation_record (id, name, start, end) VALUES (?,?,?,?)", [id, name, start, end], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})