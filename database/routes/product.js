const express = require('express')
const router = express.Router();
const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview} = require('../controllers/productController')
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auths');


router.route('/products').get(getProducts)
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('user'),newProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(getProductReviews)
router.route('/reviews').delete( deleteReview)

module.exports = router;

