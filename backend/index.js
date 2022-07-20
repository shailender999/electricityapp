const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./database/database.js");
//const routes = require('../backend/routes/student.route')

const app = express();
const port = 3001;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/details', (req, res) => {
    res.send({data: 'Hello World, from express'});
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

app.get("/", (req, res, next) => {
    var sql = "select * from bills order by amount desc"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/bill/:id", (req, res, next) => {
    var sql = "select * from bills where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/", (req, res, next) => {
    var errors=[]
    if (!req.body.amount){
        errors.push("No Amount specified");
    }
    if (!req.body.units){
        errors.push("No units specified");
    }
    if (!req.body.billdate){
        errors.push("Bill Date cannot be empty");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    let ts = Date.now();
    var data = {
        amount: req.body.amount,
        units: req.body.units,
        paiddate: req.body.paiddate,
        billdate: req.body.billdate,
        created_on: Math.floor(ts/1000),
        updated_on: Math.floor(ts/1000),
    }
    var sql ='INSERT INTO bills (amount, units, paiddate, billdate, created_on, updated_on) VALUES (?,?,?,?)'
    var params =[data.amount, data.units, data.paiddate, data.billdate, data.created_on, data.updated_on]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.put("/:id/edit", (req, res, next) => {
    let ts = Date.now();
    var data = {
        amount: req.body.amount,
        units: req.body.units,
        paiddate: req.body.paiddate,
        billdate: req.body.billdate,
        created_on: Math.floor(ts/1000),
        updated_on: Math.floor(ts/1000),
    }
    
    db.run(
        `UPDATE bills SET 
           amount = coalesce(?,amount), 
           units = COALESCE(?,units), 
           paiddate = coalesce(?,paiddate),
           billdate = coalesce(?,billdate),
           updated_on = coalesce(?, updated_on) 
           WHERE id = ?`,
        [data.amount, data.units, data.paiddate, data.billdate, data.updated_on, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/delete/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


// Root path
/* app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
}); */