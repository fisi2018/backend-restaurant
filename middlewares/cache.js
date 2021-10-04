const getExpeditiousCache =require("express-expeditious");

const options={
    namespace:"cacheexpress",
    defaultTtl:"10 min",
    statusCodeExpires:{
        404:"5 minutes",
        500:0
    }
}
const cacheInit=getExpeditiousCache(options);

module.exports={cacheInit};