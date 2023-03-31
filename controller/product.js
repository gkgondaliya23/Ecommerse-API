const model = require('../model/productModel');
const Product = model.Product;

exports.createProduct = async (req, res) =>{
    try{
        const { title, description, price, image, rating, countInStock, category } = req.body;

        // check product is existing
        const isExsting = await Product.findOne({ title });
        if(isExsting)
            return res.status(400).json({message:'Product is already exists.'});

        // Create new Product
        const product = new Product({
            
            title,
            description,
            price,
            image,
            rating,
            countInStock,
            category
        });
        await product.save();

        res.status(201).json({ id: product.id , message: 'Product registered successfully' });
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllProduct = async (req, res) =>{
    try{
       const allProduct = await Product.find({});
        
        res.status(200).json(allProduct);
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};


exports.getProduct = async (req, res) =>{
    try{
       const getProduct = await Product.findOne({_id: req.params.id});

       if(!getProduct)
       return res.status(400).json({message:'Product is not Found.'});

       const {id,title, description,price,rating,image} = getProduct;
       
        res.status(200).json({ product_id: id, title, description, price, rating, image});
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) =>{
    try{
       const getProduct = await Product.findOne({_id: req.params.id});

       if(!getProduct)
            return res.status(400).json({message:'Product is not found.'});
        
        const updateProduct = await Product.findOneAndUpdate({_id: req.params.id},
            {
                $set: req.body
            },
            { new: true});
            await updateProduct.save();
        res.status(200).json({updateProduct, message: 'Product is updated.'});
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};


exports.deleteProduct = async (req, res) =>{
    try{
       const getProduct = await Product.findOneAndDelete({_id: req.params.id});

       if(!getProduct)
            return res.status(400).json({message:'Product is not Found.'});
        
        res.status(200).json({getProduct,message: 'Product is deleted.' });
    }catch(err){
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};
