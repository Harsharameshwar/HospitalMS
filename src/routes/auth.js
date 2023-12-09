const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Patients = require("../models/Patients");


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
        const patient=await Patients.findOne({ email: req.body.email })
        if(!patient){
            res.status(400).json({message:"Wrong credentials!"})
        }
        else{
            const validated = await bcrypt.compare(req.body.password, patient.password);
            if(!validated){
                res.status(400).json({message:"Wrong credentials!"});
            }
            else{
                const { password, ...others } = patient._doc;
                res.status(200).json(others);
            }
        }    
    }
    else{
        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            res.status(400).json({message:"Wrong credentials!"});
        }
        else{
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }
    
    }

    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router