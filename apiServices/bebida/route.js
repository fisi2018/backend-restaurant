const express=require("express");
const checkAuth = require("../../middlewares/auth");
const { cacheInit } = require("../../middlewares/cache");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {list,create,update,remove,img,bebidaById}=require("./controller");
router.get("/bebidas",checkAuth,checkRoleAuth([`admin`,`user`]),cacheInit,list);
router.post("/createBebida",create);
router.delete("/:bebidaId",remove);
router.put("/update/:bebidaId",update);
router.get("/img/:bebidaId",cacheInit,img);

router.param("bebidaId",bebidaById);

module.exports=router;