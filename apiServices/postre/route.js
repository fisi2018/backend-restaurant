const express=require("express");
const checkAuth = require("../../middlewares/auth");
const { cacheInit } = require("../../middlewares/cache");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {list,create,update,remove,img,postreById}=require("./controller");
router.get("/postres",checkAuth,checkRoleAuth([`admin`,`user`]),cacheInit,list);
router.post("/createPostre",create);
router.put("/update/:postreId",update);
router.delete("/:postreId",remove);
router.get("/img/:postreId",cacheInit,img);

router.param("postreId",postreById);

module.exports=router;