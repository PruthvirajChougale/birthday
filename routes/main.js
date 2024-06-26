const express = require('express');
const router = express.Router();
const Birthday = require('./../models/birthday.js');

router.get('/:name',async (req,res)=>{
    try{
        const name=req.params.name;
        let response = await Birthday.findOne({name:name});
    if(response){
        res.status(200).json(response);
    }
    else{
        res.status(404).json({error:"couldn't fetch"})
    }
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: "internal server error"})
    }
    
});



router.post('/add', async (req,res)=>{
    try{
        const { name , birthdate} = req.body;
        const newbirthday = new Birthday({ name , birthdate});

        const response=await newbirthday.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        res.status(404).json({error: "internal server error"});
    }
});

router.put('/update/:name', async (req,res)=>{
    try{
        const namee=req.params.name;
        console.log(namee);
        const updateMe = req.body;
        console.log(updateMe);
    const response =await Birthday.findOneAndUpdate({name:namee},updateMe,
        {
        new: true,
        runValidators: true,
    });
    console.log(response);

    if(!response){
        res.status(500);
    }
        res.status(200).json(response);
       
    }
    catch(err){
        res.status(404).json({error: "internal server error"});
    }
    
});

router.delete('/:name', async (req,res)=>{
    try{
        const deleteDate = await Birthday.findOneAndDelete({name:req.params.name});
        if(deleteDate){
            res.status(200);
        }
        else{
            res.status(500);
        }
    }
    catch(err){
        res.status(404).json({error: "internal server error"});
    }
})

module.exports=router;