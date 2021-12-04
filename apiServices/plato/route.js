const express=require("express");
const checkAuth = require("../../middlewares/auth");
const { cacheInit } = require("../../middlewares/cache");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {list,create,remove,update,img,platoById}=require("./controller");

router.get("/platos",checkAuth,checkRoleAuth([`admin`,`user`]),cacheInit,list);
router.post("/createPlato",create);
router.delete("/:platoId",remove);
router.put("/update/:platoId",update);
router.get("/img/:platoId",cacheInit,img)

router.param("platoId",platoById);

module.exports=router;