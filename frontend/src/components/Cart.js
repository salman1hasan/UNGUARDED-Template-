import React, {Fragment, useState, useEffect} from 'react'
import MetaData from './MetaData'
import Pagination from 'react-js-pagination'
import '../../src/App.css'
import { useDispatch, useSelector} from 'react-redux'
import {getProducts} from '../actions/productActions'
import Product from './product/product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';




const Store = (match) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1) 
  let params = useParams();

  

  const {loading, products,error, productCount, resPerPage} = useSelector(state => state.products)

  const keyword = match.params.keyword

  useEffect(() => {
    if (error) {
        return alert.error(error)
    }

    dispatch(getProducts(keyword, currentPage));


}, [dispatch, alert, error,keyword, currentPage])

function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
}

  
  return (
    <Fragment>
      {loading ? <Loader/>: (
         <Fragment>
          <MetaData title={'UNGUARDED Products'}/>
        <h1 id="products_heading">Latest Products</h1>
         <section id="products" className="container mt-5">
   <div className="row">
       {products && products.map(product => (
       <Product key ={product._id} product={product}/>
       ))}
    </div>
 </section>
 {resPerPage <= productCount && (
 <div className ="d-flex justify-content-center mt-5">
        <Pagination 
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass='pageLinkActive'
            />
 </div>

  )}

          </Fragment>
      )}
      </Fragment>
  )
}
    


export default Store;

