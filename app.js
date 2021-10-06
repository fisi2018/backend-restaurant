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
app.use("/api/plato",require("./apiServices/plato/route"));
app.use("/api/bebida",require("./apiServices/bebida/route"));
app.use("/api/postre",require("./apiServices/postre/route"));
app.use("/api/order",require("./apiServices/order/route"));

module.exports=app;