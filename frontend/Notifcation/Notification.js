import React from 'react' //import react and notification .css to style errors 
import './notification.css'

export const showErrMsg = (msg) => { //error message is imported 
    return <div className="errMsg">{msg}</div>
}

export const showSuccessMsg = (msg) => { //success message is imported 
    return <div className="successMsg">{msg}</div>
}