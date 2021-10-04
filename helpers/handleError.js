const httpError=(res,error)=>{
    res.status(500);
    res.send({
        message:"Ha ocurrido un error",
        error
    })
}

module.exports={httpError}