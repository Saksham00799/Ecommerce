const app =require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling uncaught exceptin
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection")
})

//config

dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log('Error: ${err.message}');
    console.log(`Shutting down the server due to unhandled promise rejection`);
    
    ServerApiVersion.close(() => {
        process.exit(1);
    });
});