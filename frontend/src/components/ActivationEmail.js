import React, {useState, useEffect} from 'react' //import react. usestate. and useeffect
import {useParams} from 'react-router-dom' //import use params for activation token
//useState hook is used for storing variables that are part of your application's state and will change as the user interacts with your website. 
//The useEffect hook allows components to react to lifecycle events such as mounting to the DOM, re-rendering, and unmounting
import axios from 'axios' //import axios 

import {Link} from 'react-router-dom' //import link from react router dom 
import hello from '../../src/images/logo.png'

function ActivationEmail() {
    const {activation_token} = useParams() //The useParams hook returns an object of key/value pairs of the 
    //dynamic params from the current URL that were matched by the <Route path>, might be able to use this to get the old password when resetting password 
    const [err, setErr] = useState('') //create a setErr and set it equal to use state 
    const [success, setSuccess] = useState('') //create a setSuccess and set it = to useState 

    useEffect(() => {
        if(activation_token){ //useeffect hook and create an if statement with a try catch block, and with the try we set a const and await activation for axios.post and user activation and response error 
            const activationEmail = async () => {
                try {
                
                    const res = await axios.post('/user/activation', {activation_token}) 
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    //links the page to login
    return (
        <div className="active_page">
           <Link to="/Login">  <img src={hello} width="100%" alt='' /></Link> 
        </div>
    )
}

export default ActivationEmail