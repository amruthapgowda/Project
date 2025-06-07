const express=require("express");
const router=express.Router();
// const app=express();
// const users=require("./routes/user.js");

//index-user
router.get("/",(req,res)=>{
    res.send("GET for users");
});
//show-user
router.get("/:id",(req,res)=>{
    res.send("GET for user id");
});
//post-user
router.post("/",(req,res)=>{
    res.send("post for user");
});
//delete-user
router.delete("/:id",(req,res)=>{
    res.send("delete for usr id");
});
module.exports=router;


