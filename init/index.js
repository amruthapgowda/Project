const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}//7

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68398e3018b56d6f267b611f",}))
    await Listing.insertMany(initData.data);
    console.log("data initialized")
};//8
initDB();//9