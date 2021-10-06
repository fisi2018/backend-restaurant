const express=require("express");
const checkAuth = require("../../middlewares/auth");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {list,create,createAdmin,update,remove,orderById}=require("./controller");
router.get("/orders",checkRoleAuth([`admin`,`user`]),list);
router.post("/createOrder",checkAuth,create);
router.post("/createOrderAdmin",checkRoleAuth([`admin`]),createAdmin);
router.delete("/:orderId",remove);
router.put("/update/:orderId",checkRoleAuth([`admin`]),update);

router.param("orderId",orderById);

module.exports=router;