const express=require("express");
const checkAuth = require("../../middlewares/auth");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {list,create,createAdmin,update,remove,orderById,listPromo}=require("./controller");
router.get("/orders",checkRoleAuth([`admin`,`user`]),list);
router.post("/createOrder",checkAuth,checkRoleAuth([`user`,`admin`]),create);
router.post("/createOrderAdmin",checkRoleAuth([`admin`]),createAdmin);
router.delete("/:orderId",remove);
router.put("/update/:orderId",checkRoleAuth([`admin`]),update);
router.get("/listPromo",listPromo);

router.param("orderId",orderById);

module.exports=router;