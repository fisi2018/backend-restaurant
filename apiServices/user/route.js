const express=require("express");
const router=express.Router();
const {list,register,update,remove,login,userById}=require("./controller");
router.get("/users",list);
router.post("/register",register);
router.put("/update",update);
router.delete("/:userId",remove);
router.post("/login",login);

router.param("userId",userById);
module.exports=router;