const generateCodeNumber=(length)=>{
    const CARACTERES="0123456789";
    const CARACTERES_INIT="123456789";
        let id="";
        for(let i=0;i<length;i++){
            i===0?
            id+=CARACTERES_INIT.charAt(Math.floor(Math.random()*CARACTERES_INIT.length))
            :
            id+=CARACTERES.charAt(Math.floor(Math.random()*CARACTERES.length));
        }
        return id;
}
module.exports={generateCodeNumber}