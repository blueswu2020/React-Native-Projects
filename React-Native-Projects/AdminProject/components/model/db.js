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

//1.对login数据库表的操作
//获取所有用户的账号密码信息
app.get('/login',function(req,res){
    conn.query('SELECT * FROM login',function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(rows);
        }
    })
});

//注册
app.post('/login',function(req,res){
    conn.query('INSERT INTO login SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//根据账户获取账号密码
app.get('/login/:account',function(req,res){
    conn.query('SELECT * FROM login WHERE account=?',req.params.account,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用户账户删除用户账户密码
app.delete('/login/:account',function(req,res){
    conn.query('DELETE FROM login WHERE account=?',req.params.account,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});

//修改用户密码
app.put('/user',function(req,res){
    conn.query('UPDATE login SET password=? WHERE account=?',
        [req.body.password,req.body.account],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//2.对user_info数据库表的操作
//添加用户信息
app.post('/user',function(req,res){
    conn.query('INSERT INTO user_info SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//获取所有用户信息
app.get('/users',function(req,res){
    conn.query('SELECT * FROM user_info',function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(rows);
        }
    })
});

//根据管理员手机号获取用户列表
app.get('/users/:adminPhone',function(req,res){
    conn.query('SELECT * FROM user_info WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));

        }
    })
});

//根据用户手机号获取用户个人信息
app.get('/user/:phone',function(req,res){
    conn.query('SELECT * FROM user_info WHERE phone=?',req.params.phone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));

        }
    })
});

//根据用户账户删除用户个人信息
app.delete('/user/:phone',function(req,res){
    conn.query('DELETE FROM user_info WHERE phone=?',req.params.phone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});

//修改用户信息
app.put('/userModify',function(req,res){
    conn.query('UPDATE user_info SET name=?,gender=?,birthday=?,address=?,caseHistory=?,guardian=?,relationship=?,emergencyCall=? WHERE phone=?',
        [req.body.name,req.body.gender,req.body.birthday,req.body.address,req.body.caseHistory,req.body.guardian,req.body.relationship,req.body.emergencyCall,req.body.phone],function(error,rows,fields){
            if(!!error)
                console.log('error');
            else {
                console.log(req.body)
                console.log(rows);
                //console.log('修改成功');
                res.send(JSON.stringify(rows));
            }
        })
})

//3.对activity数据库表的操作
//根据管理员手机号获取社区活动列表
app.get('/activities/:adminPhone',function(req,res){
    conn.query('SELECT * FROM activity WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据活动id获取社区活动详情
app.get('/activity/:id',function(req,res){
    conn.query('SELECT * FROM activity WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//添加活动
app.post('/activity',function(req,res){
    conn.query('INSERT INTO activity SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//修改社区活动报名人数
app.put('/activityEnrollNumber',function(req,res){
    conn.query('UPDATE activity SET enrollNumber=? WHERE id=?',
        [req.body.enrollNumber,req.body.id],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//修改活动信息
app.put('/activity',function(req,res){
    conn.query('UPDATE activity SET title=?,context=?,location=?,startTime=?,endTime=?,maxNumber=?,enrollNumber=?,attention=?,releaseTime=? WHERE id=?',
        [req.body.title,req.body.context,req.body.location,req.body.startTime,req.body.endTime,req.body.maxNumber,req.body.enrollNumber,req.body.attention,req.body.releaseTime,req.body.id],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//删除活动
app.delete('/activity/:id',function(req,res){
    conn.query('DELETE FROM activity WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});

//4.对activity_enroll数据库表的操作
//新增活动报名信息
app.post('/activityEnroll',function(req,res){
    conn.query('INSERT INTO activity_enroll SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//根据活动id查找相关活动是否报名
app.get('/activityEnroll/:id',function(req,res){
    conn.query('SELECT userPhone FROM activity_enroll WHERE activityId=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用户手机号查找所有已报名的活动
app.get('/activityEnrolls/:phone',function(req,res){
    conn.query('SELECT * FROM activity_enroll WHERE userPhone=?',req.params.phone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据活动id查找所有已报名的用户
app.get('/activityEnrolledUsers/:activityId',function(req,res){
    conn.query('SELECT userPhone FROM activity_enroll WHERE activityId=?',req.params.activityId,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//5.对education数据库表的操作
//根据管理员手机号获取教育活动列表
app.get('/educations/:adminPhone',function(req,res){
    conn.query('SELECT * FROM education WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据教育id获取社区活动详情
app.get('/education/:id',function(req,res){
    conn.query('SELECT * FROM education WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//添加活动
app.post('/education',function(req,res){
    conn.query('INSERT INTO education SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//修改社区教育报名人数
app.put('/educationEnrollNumber',function(req,res){
    conn.query('UPDATE education SET enrollNumber=? WHERE id=?',
        [req.body.enrollNumber,req.body.id],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//修改教育活动信息
app.put('/education',function(req,res){
    conn.query('UPDATE education SET title=?,context=?,location=?,startTime=?,endTime=?,maxNumber=?,enrollNumber=?,attention=?,releaseTime=? WHERE id=?',
        [req.body.title,req.body.context,req.body.location,req.body.startTime,req.body.endTime,req.body.maxNumber,req.body.enrollNumber,req.body.attention,req.body.releaseTime,req.body.id],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//删除活动
app.delete('/education/:id',function(req,res){
    conn.query('DELETE FROM education WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});

//6.对education_enroll数据库表的操作
//新增教育报名信息
app.post('/educationEnroll',function(req,res){
    conn.query('INSERT INTO education_enroll SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//根据教育id查找相关活动是否报名
app.get('/educationEnroll/:id',function(req,res){
    conn.query('SELECT userPhone FROM education_enroll WHERE educationId=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用户手机号查找所有已报名的教育活动
app.get('/educationEnrolls/:phone',function(req,res){
    conn.query('SELECT * FROM education_enroll WHERE userPhone=?',req.params.phone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据教育活动id查找所有已报名的用户
app.get('/educationEnrolledUsers/:educationId',function(req,res){
    conn.query('SELECT userPhone FROM education_enroll WHERE educationId=?',req.params.educationId,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//7.对employment数据库表的操作
//根据管理员手机号获取就业活动列表
app.get('/employments/:adminPhone',function(req,res){
    conn.query('SELECT * FROM employment WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据就业活动id获取就业活动详情
app.get('/employment/:id',function(req,res){
    conn.query('SELECT * FROM employment WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//添加就业活动
app.post('/employment',function(req,res){
    conn.query('INSERT INTO employment SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//修改社区就业报名人数
app.put('/employmentEnrollNumber',function(req,res){
    conn.query('UPDATE employment SET enrollNumber=? WHERE id=?',
        [req.body.enrollNumber,req.body.id],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//修改活动信息
app.put('/employment',function(req,res){
    conn.query('UPDATE employment SET title=?,context=?,location=?,startTime=?,endTime=?,maxNumber=?,enrollNumber=?,attention=?,releaseTime=? WHERE id=?',
        [req.body.title,req.body.context,req.body.location,req.body.startTime,req.body.endTime,req.body.maxNumber,req.body.enrollNumber,req.body.attention,req.body.releaseTime,req.body.id],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//删除活动
app.delete('/employment/:id',function(req,res){
    conn.query('DELETE FROM employment WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});

//8.对employment_enroll数据库表的操作
//新增教育报名信息
app.post('/employmentEnroll',function(req,res){
    conn.query('INSERT INTO employment_enroll SET ?',req.body,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
})

//根据就业id查找相关活动是否报名
app.get('/employmentEnroll/:id',function(req,res){
    conn.query('SELECT userPhone FROM employment_enroll WHERE employmentId=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用户手机号查找所有已报名的就业活动
app.get('/employmentEnrolls/:phone',function(req,res){
    conn.query('SELECT * FROM employment_enroll WHERE userPhone=?',req.params.phone,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据教育活动id查找所有已报名的用户
app.get('/employmentEnrolledUsers/:employmentId',function(req,res){
    conn.query('SELECT userPhone FROM employment_enroll WHERE employmentId=?',req.params.employmentId,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//9.对数据库表feedback_userInfo的操作
//新增一条反馈
app.post('/feedbackUserInfo',function(req,res){
    conn.query('INSERT INTO feedback_userInfo SET ?',req.body,function (error,rows,fields) {
        if(!!error) console.log('error');
        else {
            console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据管理员手机号获取反馈列表
app.get('/feedbackUserInfo/:adminPhone',function(req,res){
    conn.query('SELECT * FROM feedback_userInfo WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据反馈id获取反馈信息
app.get('/feedbackUserInfoById/:id',function(req,res){
    conn.query('SELECT * FROM feedback_userInfo WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据反馈id删除反馈记录
app.delete('/feedbackUserInfo/:id',function(req,res){
    conn.query('DELETE FROM feedback_userInfo WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});


//10.对数据库表feedback_response的操作
//新增一条反馈回复
app.post('/feedbackRespond',function(req,res){
    conn.query('INSERT INTO feedback_respond SET ?',req.body,function (error,rows,fields) {
        if(!!error) console.log('error');
        else {
            console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用户手机号获取反馈回复
app.get('/feedbackRespondList/:userPhone',function(req,res){
    conn.query('SELECT * FROM feedback_respond WHERE userPhone=?',req.params.userPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用id获取反馈回复
app.get('/feedbackRespond/:id',function(req,res){
    conn.query('SELECT * FROM feedback_respond WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//11..对求救信息表alert的操作
//新增一条求救信息
app.post('/alert',function(req,res){
    conn.query('INSERT INTO alert SET ?',req.body,function (error,rows,fields) {
        if(!!error) console.log('error');
        else {
            console.log(req.body)
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//修改求救信息
app.put('/alert',function(req,res){
    conn.query('UPDATE alert SET time=?,longitude=?,latitude=?,location=? WHERE userPhone=?',
        [req.body.time,req.body.longitude,req.body.latitude,req.body.location,req.body.userPhone],function(error,rows,fields){
            if(!!error) console.log('error');
            else {
                //console.log(req.body)
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
})

//根据管理员手机号获取到求救信息
app.get('/alert/:adminPhone',function(req,res){
    conn.query('SELECT * FROM alert WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据用户手机号获取到求救信息
app.get('/getAlertByUserPhone/:userPhone',function(req,res){
    conn.query('SELECT * FROM alert WHERE userPhone=?',req.params.userPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据求救id获取求救信息
app.get('/getAlertById/:id',function(req,res){
    conn.query('SELECT * FROM alert WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据求救id删除求救记录
app.delete('/alert/:id',function(req,res){
    conn.query('DELETE FROM alert WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else {
            console.log(rows);
            res.end('deleted successfully');
        }
    })
});

//12.对数据库表alertHandled的操作
//新增一条记录
app.post('/alertHandled',function(req,res){
    conn.query('INSERT INTO alert_handled SET ?',req.body,function (error,rows,fields) {
        if(!!error) console.log('error');
        else {
            //console.log(req.body)
            //console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据管理员手机号获取到已处理信息
app.get('/alertHandled/:adminPhone',function(req,res){
    conn.query('SELECT * FROM alert_handled WHERE adminPhone=?',req.params.adminPhone,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

//根据求救id获取求救信息
app.get('/getAlertHandledById/:id',function(req,res){
    conn.query('SELECT * FROM alert_handled WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        }
    })
});

// conn.end();
