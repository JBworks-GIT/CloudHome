const mongoose = require('mongoose');

const uri = "mongodb+srv://<username>:<password>@cluster0.ynfgwko.mongodb.net/<dbName>?retryWrites=true&w=majority&appName=Cluster0";

let dbUrl = uri.replace("<username>",process.env.DB_USERNAME);
dbUrl = dbUrl.replace("<password>",process.env.DB_PASSWORD);
dbUrl = dbUrl.replace("<dbName>",process.env.DB_NAME);




mongoose.connect(dbUrl).then(()=>{
    console.log("----------------------DB Connected------------------");
}).catch((err)=>{
    console.log("DB Connect Failed:\n");
    console.log(err);
})