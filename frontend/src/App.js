import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import '../src/App.css'
import Product from './components/Productdetails'

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
        <Routes> 
          <Route path="/Cart" element={<Cart />} />
          <Route path="/search/:keyword" element={<Cart/>}/>
          <Route path="/products/:id" element={<Product/>} />
        </Routes>   
        <Footer/> 
    </div>
  </Router>
  );
}


export default App;


