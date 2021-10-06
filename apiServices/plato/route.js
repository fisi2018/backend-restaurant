const express=require("express");
const router=express.Router();
const {list,create,remove,update,img,platoById}=require("./controller");

router.get("/platos",list);
router.post("/createPlato",create);
router.delete("/:platoId",remove);
router.put("/update/:platoId",update);
router.get("/img/:platoId",img)

router.param("platoId",platoById);

module.exports=router;