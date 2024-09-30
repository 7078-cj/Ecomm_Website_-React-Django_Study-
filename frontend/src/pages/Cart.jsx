import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartProd from '../components/CartProd'
import  './style/Cart.css'
import Pagination from '../components/Pagination'


function Cart() {
  
  let [pgNum, setPgnum] = useState(10);
  let [pgCurr, setPgcurr] = useState(1)

  return (
    <>
    <Header></Header>
    <div className="Cart-container">

      <div className="Cart-prods">
            <CartProd></CartProd>
            
            <Pagination pgNum={pgNum} pgCurr={setPgcurr}></Pagination>
      </div>

      <div className="Total">
        b
      </div>

    </div>
  
    <Footer></Footer>
    </>
  )
}

export default Cart