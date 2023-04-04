const Favorites = require('../model/favoriteModel');
const User = require('../model/usersModel');
const Product = require('../model/productModel');

exports.createFavorites = async (req, res) =>{
    try{
        const {userId, productId} = req.params;

        // check user is found
        const isExsting = await User.findOne({_id: userId});
        if(!isExsting)
        return res.status(400).json({message:'User is not Found.'});

        // check product is found
        const isexsting = await Product.findOne({_id: productId});
        if(!isexsting)
        return res.status(400).json({message:'Product is not Found.'});


        const favo = new Favorites({
            user : userId,
            product: productId
        });

        await favo.save();
        res.status(200).json({ favo,message: 'Product added to favorites..' });
    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllFavorites = async (req, res) =>{
    try{
        const {userId} = req.params;

        // check user is found
        const isExsting = await User.findOne({_id: userId});
        if(!isExsting)
        return res.status(400).json({message:'User is not Found.'});
        
        const getData = await Favorites.find({user: userId}).populate({
            path: 'user',
            select: "name"
        }).populate({
            path: 'product',
            select: "title price"
        });
        return res.status(200).json(getData);

    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.removeFavorites = async (req, res) =>{
    try{
        const {userId, productId} = req.params;

        // check user is found
        const isExsting = await User.findOne({_id: userId});
        if(!isExsting)
        return res.status(400).json({message:'User is not Found.'});

        // check product is found
        const isexsting = await Product.findOne({_id: productId});
        if(!isexsting)
        return res.status(400).json({message:'Product is not Found.'});
        
        const getData = await Favorites.findOneAndDelete({user: userId, product: productId});
        return res.status(200).json(getData);

    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};