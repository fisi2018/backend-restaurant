const express=require("express");
const router=express.Router();
const {list,create,update,remove,img,bebidaById}=require("./controller");
router.get("/bebidas",list);
router.post("/createBebida",create);
router.delete("/:bebidaId",remove);
router.put("/update/:bebidaId",update);
router.get("/img/:bebidaId",img);

router.param("bebidaId",bebidaById);

module.exports=router;