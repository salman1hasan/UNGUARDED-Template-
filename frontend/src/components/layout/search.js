import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button,Container,Form,Nav,Navbar} from 'react-bootstrap'; //import bootstrap components
import { FaHome, FaVideo,FaUpload,FaShoppingCart,FaUser} from 'react-icons/fa' //import all fa icons 
import { AiOutlineSearch} from "react-icons/ai";
import {Link} from 'react-router-dom' //import link to hook up react router dom


const Search = () => {
      let navigate = useNavigate();
      const [keyword, setKeyword] = useState("");
      const searchHandler = (e) => {
          e.preventDefault();
          if (keyword.trim()) {
              navigate(`/search/${keyword}`);
          } else {
              navigate("/");
          }
      };

  return (
    <Form  onSubmit={searchHandler} className="d-flex" align="end">
      <Form.Control type="search" placeholder="SEARCH..." aria-label="Search" overflow="hidden" onChange={(e) => setKeyword(e.target.value)}/>
      <Button className="button1"><AiOutlineSearch size='1.4rem'/></Button>
      <Link to="/Register" style={{textDecoration:"none"}}><Button className="button"> <FaUser size='1.5rem'/>SIGNUP</Button></Link>
    </Form>
  )
}

export default Search
