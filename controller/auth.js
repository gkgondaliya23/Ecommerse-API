const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');


exports.registerAuth = async (req, res) =>{
    try{
        const {name, username, email, password, phone} = req.body;

        // check user is existing
        const isExsting = await User.findOne({email});
        if(isExsting)
        return res.status(400).json({message:'User is already exists.'});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new User
        const user = new User({
            name,
            username,
            email,
            password: hashPassword,
            phone
        });
        await user.save();

        res.status(201).json({ user_id: user.id, message: 'User registered successfully' });
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
    
};


exports.loginAuth = async (req, res) =>{
    try{
        const {email, password} = req.body;

        // check user is existing
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message:'User is not found'});

        // Password checking
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(400).json({message:'Password is not matched'});
        
        // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC);

    res.json({ user_id: user.id, name: user.name, email: user.email  ,token });

    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }

}