var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'test',
});

var server = app.listen(3000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log('server start')
});

conn.connect(function(error){
    if(!!error) console.log('error');
    else console.log('connected');
});

app.get('/users',function(req,res){
    conn.query('SELECT * FROM user_account',function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(rows);
        }
    })
});

app.get('/userInfo',function(req,res){
    conn.query('SELECT * FROM user_info',function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(rows);
        }
    })
});

app.post('/users',function(req,res){
    conn.query('INSERT INTO user_account SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

app.get('/users/:account',function(req,res){
    conn.query('SELECT * FROM user_account WHERE account=?',req.params.account,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

app.get('/userInfo/:phone',function(req,res){
    conn.query('SELECT * FROM user_info WHERE phone=?',req.params.phone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));

        }
    })
});

app.delete('/users/:id',function(req,res){
    conn.query('DELETE FROM user_account WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});
