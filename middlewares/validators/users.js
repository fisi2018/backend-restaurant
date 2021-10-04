const {check}=require("express-validator");
const {validateResult}=require("../../helpers/validateHelper");
const validateRegister=[
    (req,res,next)=>{
        validateResult(req,res,next)
    }
];

module.exports={validateRegister};