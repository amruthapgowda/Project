const express=require("express");
const router=express.Router();
//index-p
router.get("/",(req,res)=>{
    res.send("GET for posts");
});
//show-p
router.get("/:id",(req,res)=>{
    res.send("GET for id");
});
//post-p
router.post("/",(req,res)=>{
    res.send("post for posts");
});
//delete-p
router.delete("/:id",(req,res)=>{
    res.send("delete for posts id");
});
module.exports=router;
