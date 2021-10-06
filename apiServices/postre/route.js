const express=require("express");
const router=express.Router();
const {list,create,update,remove,img,postreById}=require("./controller");
router.get("/postres",list);
router.post("/createPostre",create);
router.put("/update/:postreId",update);
router.delete("/:postreId",remove);
router.get("/img/:postreId",img);

router.param("postreId",postreById);

module.exports=router;