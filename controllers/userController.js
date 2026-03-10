const User = require("../models/user");

exports.createUser = async (req,res)=>{
    const user = await User.create(req.body);
    res.json(user);
};

exports.getAllUser = async (req,res)=>{

    const query = {isDeleted:false};

    if(req.query.username){
        query.username = {
            $regex: req.query.username,
            $options:"i"
        }
    }

    const users = await User.find(query).populate("role");

    res.json(users);
};

exports.getUserById = async (req,res)=>{
    const user = await User.findById(req.params.id)
        .populate("role");

    res.json(user);
};
exports.updateUser = async (req,res)=>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(user);
};
exports.deleteUser = async (req,res)=>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {isDeleted:true},
        {new:true}
    );

    res.json({message:"User deleted (soft)"});
};
exports.enableUser = async (req,res)=>{

    const {email,username} = req.body;

    const user = await User.findOne({email,username});

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    user.status = true;
    await user.save();

    res.json(user);
};

exports.disableUser = async (req,res)=>{

    const {email,username} = req.body;

    const user = await User.findOne({email,username});

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    user.status = false;
    await user.save();

    res.json(user);
};
exports.getUserByRole = async (req,res)=>{

    const users = await User.find({
        role:req.params.id,
        isDeleted:false
    }).populate("role");

    res.json(users);
};