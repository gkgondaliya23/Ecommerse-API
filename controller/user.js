const bcrypt = require('bcrypt');
const User = require('../model/usersModel');

exports.updateUser = async (req, res) =>{
    try{
        const {name, username, email, password, phone, isAdmin} = req.body;
        // check user is found
        const isExsting = await User.findOne({_id: req.params.id});
        if(!isExsting)
        return res.status(400).json({message:'User is not Found.'});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // update data
        const doc = await User.findOneAndUpdate({_id : req.params.id},
            {
                $set:{
                    name: name,
                    username: username,
                    email: email,
                    password: hashPassword,
                    phone: phone,
                    isAdmin
                }
            },
            {new: true,upsert:true})
            res.status(200).json({ user_id: doc.id, message: 'User update successfully' });
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
}


exports.deleteUser = async (req, res) =>{
    try{
        const userId = req.params.id;

        // check user is found
        const isExsting = await User.findOne({id: userId});
        if(!isExsting)
        return res.status(400).json({message:'User is not Found.'});


        // delete user
        const doc = User.findOneAndDelete({id : userId})
            res.status(200).json({ doc,message: 'User delete successfully' });
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
}