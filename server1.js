const express = require('express');
const app = express();
const port= 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const validator = require('validator');
const pg = require('pg');

const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'mywebstore',
password: 'data',
port: '5432'});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '50mb'  }));
app.use(cors());
app.post('/save',(req,res)=>{

     // pool.query("CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL,employee VARCHAR(40) NOT NULL,phone VARCHAR(11) NOT NULL, salary VARCHAR(20),experience VARCHAR(100),aadhar TEXT, cert_10 TEXT, cert_12 TEXT, degree TEXT)", (err, res) => {
     //      console.log(err, res);
     //      pool.end();
     //      });
          

     //res.send(JSON(user));
     //es.send("Hello world");
     const name= req.body.user.data.ename;
     const emp_no= req.body.user.data.emp_no;
     const phone =  req.body.user.data.phone;
     const salary =req.body.user.data.salary;
     const exp=req.body.user.data.exp;
     const aadhar = req.body.user.data.docs.aadhar;
     const cert_10 = req.body.user.data.docs.cert_10;
     const cert_12= req.body.user.data.docs.cert_12;
     const degree = req.body.user.data.docs.Degree;

     //const experience = req.body.user.data.exp;
     // // console.log(name);
     // // console.log(emp_no);
     // // console.log(phone);
     // // console.log(salary);
     // // console.log(experience);
     let result ={};
     var count=0;
     if(!validator.isAlpha(name)){
          result.name="Name should consist only of letters";
          count+=1;
     }
     if(!validator.isAlphanumeric(emp_no)){
          count+=1;
          result.emp_no="Employee number should only consist of alphabets and numbers.No special characters are allowed";
     }
     if(!((validator.isNumeric(phone))  &&( phone.length==10))){
          result.phone="Number length should consist of 10 digits and should only be numbers";
          count+=1;
     }
     if(!((validator.isNumeric(salary)) && (salary>5000))){
          result.salary="Salary should consist only of numbers and be greater than 5000";
          count+=1;
     }
     if(count==0){
     const alldata = req.body.user.data;
     console.log(degree)
     pool.query(`INSERT INTO users(name,employee,phone, salary,experience ,aadhar, cert_10, cert_12, degree)VALUES('asf','${emp_no}','${phone}','${salary}','${exp}','${aadhar}','${cert_10}','${cert_12}','${degree}')`,(err, res) => {
     console.log(err, res);
     pool.end();
     });
     
     
     result.res="SUCCESS."
     }
    res.json(result)
})



app.listen(port,()=>console.log('Server running on port '+ port));
