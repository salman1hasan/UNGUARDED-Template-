const Product = require('../database/models/products')
const dotenv= require('dotenv');
const connectDatabase = require('../database/database');

const products = require('../database/data/product');
const {connect} = require('mongoose');

dotenv.config({ path: 'database/config.env'})

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All products are added')

        process.exit()

    }catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()