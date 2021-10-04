const express=require("express");
const { cacheInit } = require("../../middlewares/cache");
const router=express.Router();
const {list,create,remove,update,entradaById,imgEntrada} =require("./controller");
router.get("/entradas",cacheInit,list);
router.post("/createEntrada",create);
router.put("/update/:entradaId",update);
router.delete("/:entradaId",remove);
router.get("/img/:entradaId",imgEntrada);

router.param("entradaId",entradaById);

module.exports=router;