const express = require('express')
const router = express.Router();

const {newOrder, getSingleOrder,myOrders, allOrders, updateOrder,deleteOrder} = require('../controllers/orderController')

const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auths')

router.route('/order/new').post(isAuthenticatedUser, newOrder);


router.route('/orders/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/order/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('user'),allOrders);
router.route('/admin/order/:id')
     .put(isAuthenticatedUser, authorizeRoles('user'),updateOrder)
     .delete(isAuthenticatedUser, authorizeRoles('user'),deleteOrder);

module.exports = router