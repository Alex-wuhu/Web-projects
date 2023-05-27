const express=require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",(req,res)=>{
    var email = req.body.email_input;
    var first_name = req.body.firstname_input;
    var last_name = req.body.lastname_input;
    var data ={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:first_name,
                    LNAME:last_name
                }
            }

        ]
    }
    
    var jasonData = JSON.stringify(data);
    const url ="https://us21.api.mailchimp.com/3.0/lists/8dd275c365";
    const options = {
        method:"POST",
        auth:"alex:90adbfb9730a608acc7cd04ac633106b-us21"
    }
    const request = https.request(url,options,(response)=>{
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        console.log(response.statusCode);
    });
    request.write(jasonData);
    request.end();
});
app.post("/success",(req,res)=>{
    res.redirect("/");
})
app.post("/failure",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT||3000,()=>{
    console.log("listening 3000 port");
});