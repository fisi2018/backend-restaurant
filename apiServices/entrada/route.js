const express=require("express");
const checkAuth = require("../../middlewares/auth");
const { cacheInit } = require("../../middlewares/cache");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {list,create,remove,update,entradaById,imgEntrada} =require("./controller");
router.get("/entradas",checkAuth,checkRoleAuth([`user`,`admin`]),cacheInit,list);
router.post("/createEntrada",create);
router.put("/update/:entradaId",update);
router.delete("/:entradaId",remove);
router.get("/img/:entradaId",cacheInit,imgEntrada);

router.param("entradaId",entradaById);

module.exports=router;