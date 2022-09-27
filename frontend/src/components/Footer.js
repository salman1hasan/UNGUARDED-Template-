import React from 'react' //import react
import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap
import "bootstrap/dist/js/bootstrap.bundle"; //import bootstrap
import '../../src/Footer.css'

import logo from '../images/logo.png'; //import unguarded image 



// I made a footer that included a container that includes the social items. I used the icon buttons and created an ahref to connect my social accounts to the footer

function Footer() { //create a container and then create three hrefs 
  return (
    <div className="social-container">
        <img src={logo} width="30%" className="logo"  alt='UNGUARDED INSTAGRAM' />
      
    </div>
  );
}

export default Footer;