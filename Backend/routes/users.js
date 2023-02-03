const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const HistoryOfUsers = require("../models/HistoryOfUsers");


router.post("/",async (req,res)=>{
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  try{
  if(req.body.phone.toString().length===10)
  {
    if(req.body.creator){
  const newUser= new User({
      name:req.body.name,
      email:req.body.email,
      address:req.body.address,
      gender:req.body.gender,
      qualification:req.body.qualification,
      specialization:req.body.specialization,
      password:hashedPass,
      role:req.body.role,
      phone:req.body.phone
  })
  const user = await newUser.save();
  const HistoryOfUser=new HistoryOfUsers({
    creator:req.body.creator,
    action:`${req.body.creator} Has Created This Record`,
    actionType:"Addition",
    name:user.name,
    email:user.email,
    address:user.address,
    gender:user.gender,
    qualification:user.qualification,
    specialization:user.specialization,
    role:user.role,
    phone:user.phone
  })
  const histofuser= await HistoryOfUser.save();
  res.status(200).json("Success");
}
else{
  res.status(401).json({message:"Creator is required"});
}
}
else{
  res.status(401).json({message:"Invalid Phone Number"});
}
  }
  catch(err){
    if(err.message){
      res.status(500).json(err)
    }
    else if(err.keyValue.email){
      res.status(500).json({message:`Email ${err.keyValue.email} already exists`})
    }
    else if(err.keyValue.phone){
      res.status(500).json({message:`Phone ${err.keyValue.phone} already exists`})
    }
  }
})

//UPDATE
router.put("/:id", async (req, res) => {
    if(req.body.creator){
    var olduser= await User.findById(req.params.id)
    if(olduser){
      const {__v,_id,createdAt,updatedAt,...others}=olduser._doc
      var changedfields=[]
  
      Object.entries(others).forEach(([key, value]) => {
        switch (key) {
          case "name":
            if(value!==req.body.name){
              changedfields.push(key)
            }
            break;
          case "email":
            if(value!==req.body.email){
              changedfields.push(key)
            }
            break;
          case "phone":
            if(value!==req.body.phone){
              changedfields.push(key)
            }
            break;
          case "specialization":
            if(value!==req.body.specialization){
                changedfields.push(key)
              }
              break;
          case "gender":
            if(value!==req.body.gender){
                changedfields.push(key)
              }
              break;
          case "address":
            if(value!==req.body.address){
                changedfields.push(key)
              }
              break;
          case "qualification":
            if(value!==req.body.qualification){
                changedfields.push(key)
              }
              break;
          case "role":
            if(value!==req.body.role){
                changedfields.push(key)
              }
              break;
          case "password":
            bcrypt.compare(req.body.password, value).then(function(result) {
              if(!result){
                changedfields.push(key)
              }
          });
              break;
          default:
            break;
        }
      });
      if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        changedfields.forEach(function(i){
          if(i==="password"){
            const hou=new HistoryOfUsers({
              creator:req.body.creator,
              action:`${req.body.creator} Has Updated ${i} Field`,
              actionType:"Updation",
              name:olduser.name,
              email:olduser.email,
              address:olduser.address,
              gender:olduser.gender,
              qualification:olduser.qualification,
              specialization:olduser.specialization,
              role:olduser.role,
              phone:olduser.phone
            })
            Update(hou)
          }
          else{
            const hou=new HistoryOfUsers({
              creator:req.body.creator,
              action:`${req.body.creator} Has Updated ${i} Field From ${olduser._doc[i]} To ${req.body[i]}`,
              actionType:"Updation",
              name:olduser.name,
              email:olduser.email,
              address:olduser.address,
              gender:olduser.gender,
              qualification:olduser.qualification,
              specialization:olduser.specialization,
              role:olduser.role,
              phone:olduser.phone
            })
            Update(hou)
          }
        })
        async function Update(hou){
          const histofuser=await hou.save();
        }
        var data=req.body
        olduser.email===data.email && delete data.email
        olduser.phone===data.phone && delete data.phone
        // if(!changedfields.includes('password')){
        //     req.body.password=olduser.password
        // }
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: data,
          },
          { new: true }
        );
        res.status(200).json("Success");
      } catch (err) {
        console.log(err)
        if(err.message){
          res.status(500).json(err)
        }
        else if(err.keyValue.email){
          res.status(500).json({message:`Email ${err.keyValue.email} already exists`})
        }
        else if(err.keyValue.phone){
          res.status(500).json({message:`Phone ${err.keyValue.phone} already exists`})
        }
      }
    }
    else{
      res.status(401).json({message:"Invalid User"});
    }
  }
  else{
    res.status(401).json({message:"Creator is required"});
  }
});

//DELETE
router.delete("/:email", async (req, res) => {
    try {
      const user = await User.findOne({email:req.params.email});
      if(!user){
        res.status(400).json({message:"User Not Found"});
      }
      else{
        try {
          if(req.body.creator){
          const histofuser=new HistoryOfUsers({
            creator:req.body.creator,
            action:`${req.body.creator} Has Deleted User Having Email ${user._doc.email}`,
            actionType:"Deletion",
            name:user._doc.name,
            email:user._doc.email,
            address:user._doc.address,
            gender:user._doc.gender,
            qualification:user._doc.qualification,
            specialization:user._doc.specialization,
            role:user._doc.role,
            designation:user._doc.designation,
            phone:user._doc.phone
          })
          const hou= await histofuser.save();
          await User.findOneAndDelete({email:req.params.email});
          res.status(200).json("User has been deleted...");
          }
          else{
            res.status(401).json({message:"Creator is required"});
          }
        } catch (err) {
          res.status(500).json(err);
        }
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
});

//GET USER
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({email:req.params.email});
    if(user===null){
       res.status(400).json({message:"User Not Found"});
    }
    else{
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = router;