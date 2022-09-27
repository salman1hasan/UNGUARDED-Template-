const router = require('express').Router() //I declare a const and require express and router 
const { registerUser, activateEmail,login, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser,deleteUser} = require('../controllers/userCtrl')
const {isAuthenticatedUser, authorizeRoles } = require('../middleware/auths')

router.route('/register').post(registerUser)//router. post() refers to POST requests and router. get() referes to GET request.

router.route('/activation').post(activateEmail)//router. post() refers to POST requests and router. get() referes to GET request.

router.route('/login').post(login)//router. post() refers to POST requests and router. get() referes to GET request.

router.route('/logout').get(logout)//router. post() refers to POST requests and router. get() referes to GET request.

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('user'),allUsers)

router.route('/admin/users/:id')
.get(isAuthenticatedUser, authorizeRoles('user'),getUserDetails)
.put(isAuthenticatedUser, authorizeRoles('user'),updateUser)
.delete(isAuthenticatedUser, authorizeRoles('user'),deleteUser)
// router.post('/activation', userCtrl.activateEmail ) //this specifically activates the email 

// router.post('/login', userCtrl.login) //this activates the login 

// router.post('/refresh_token', userCtrl.getAccessToken) //this activates the login 

// router.post('/forgot', userCtrl.forgotPassword) //forgot password using authentication

// router.put('/reset/:token', auth, userCtrl.resetPassword) //password reset using authentication

// router.get('/infor', auth, userCtrl.getUserInfor) //get user info using authentication

// router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor) //get user info using authentication

// router.get('/logout', userCtrl.logout)  //get route for user to log out

// router.patch('/update', auth, userCtrl.updateUser) //a request method in HTTP for making partial changes to an existing resource

// router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

// router.delete('/delete/:id', auth, authAdmin, userCtrl.updateUsersRole)


module.exports = router //module.exports = router