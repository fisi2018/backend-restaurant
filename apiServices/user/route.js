const express=require("express");
const checkAuth = require("../../middlewares/auth");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();

const {list,register,update,remove,login,userById,img}=require("./controller");
router.get("/users",checkRoleAuth([`admin`,`user`]),list);
router.post("/register",register);
router.put("/update/:userId",checkAuth,checkRoleAuth([`admin`]),update);
router.delete("/:userId",checkRoleAuth([`admin`]),remove);
router.post("/login",login);
router.get("/img/:userId",img);

router.param("userId",userById);
module.exports=router;