const express = require('express');
const app = express();
const port= 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const validator = require('validator');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '50mb'  }));
app.use(cors());
app.post('/save',(req,res)=>{

     //res.send(JSON(user));
     //es.send("Hello world");
     const name= req.body.user.data.ename;
     const emp_no= req.body.user.data.emp_no;
     const phone =  req.body.user.data.phone;
     const salary =req.body.user.data.salary;
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
     //console.log(alldata)
   
     MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("Employee");
       var myobj = {id :  "1", alldata  };
       dbo.collection("EmployeeData").insertOne(myobj, function(err, res) {
         if (err) throw err;
         console.log("1 document inserted");
         
         db.close();
       });
     });
     result.res="SUCCESS."
     }
    res.json(result)
})




app.listen(port,()=>console.log('Server running on port '+ port));
