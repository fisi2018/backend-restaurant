const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const app= express();

app.use(morgan("dev"));
app.use( express.json() );
app.use(cors());

//routes
app.use("/api/user",require("./apiServices/user/route"));
app.use("/api/entrada",require("./apiServices/entrada/route"));

module.exports=app;