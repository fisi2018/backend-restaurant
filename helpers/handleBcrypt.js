const bcrypt=require("bcryptjs");

const encrypt=async(text)=>{
    const hash= await bcrypt.hash(text,10);
    return hash;
}
const compare=async(text,hash)=>{
    return await bcrypt.compare(text,hash);
}
module.exports={encrypt,compare}