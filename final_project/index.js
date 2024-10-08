const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const SECRET_KEY = require('./router/auth_users.js').SECRET_KEY;

const app = express();

app.use(express.json());

app.use(function methodLogger(req, res, next) {
    const method = req.method;
    const ip = req.ip;
    const path = req.path;
    const now = new Date();
    const dateTimeString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    console.log("");
    console.log(`METHOD: ${method} in ${dateTimeString} at ${path} from ${ip}`);
    
    next();
})

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    // write auth logic with express-session from the request object
    if(req.session.authorization){
        const username = req.session.authorization.username;
        console.log(`AUTHORIZING: User: ${username}`);
    //   console.log(JSON.stringify(req.session.authorization));
        
        let token = req.session.authorization.accessToken;
        // console.log(token);
        jwt.verify(token, SECRET_KEY, (err, decoded)=>{
            if (!err){
                // req.user = decoded;
                console.log("AUTHORIZING SUCCESSFUL");
                next();
            }else{
                console.log("Error: " + err);
                res.status(401).send("Unauthorized: You are not Authenticated");
            }
        });
    } else{
        console.log("AUTHORIZING UNSUCCESSFUL: user not logged in");
        res.status(401).send("Unauthorized: You are not logged in!");
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));