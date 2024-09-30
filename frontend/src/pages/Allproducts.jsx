import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './style/Allprod.css'
import ImageCard from '../components/ImageCard'
import Pagination from '../components/Pagination'

function Allproducts() {
  let pages = [];
  
  let [pgNum, setPgnum] = useState(10);
  let [pgCurr, setPgcurr] = useState(1)
  let [minPrice, setMinprice] = useState(0)
  let [maxPrice, setMaxprice] = useState(0)

  const lastPostindex = pgCurr * pgNum;
  const firstPostindex = lastPostindex -pgNum;
 console.log(pgCurr)
  
  return (
    
    <>
    <Header></Header>
    <div className='pg-ctn'>
        <div className='filter-container'>
              <div className="filter-categ">
                <h4>Category:</h4>
                <div className="categories">
                  <li>uniform</li>
                  <li>uniform</li>
                  <li>uniform</li>
                  <li>uniform</li>
                </div>
              </div>
              <div className="filter-price">
                <div class="slider">
                <label for="vol">Min Price {minPrice} :</label>
                  <input type="range" id="vol" name="vol" min="0" max="100000" onChange={(e)=>
                    {
                      setMinprice(e.target.value)
                    }
                  }/>
                  

                  <label for="vol">max Price {maxPrice}:</label>
                  <input type="range" id="vol" name="vol" min="0" max="100000" onChange={(e)=>
                    {
                      setMaxprice(e.target.value)
                    }}
                    />
                  
                  <input type="submit" />
                </div>
              </div>
        </div>
        <div className="all-prod">
            <h1>Shop</h1>
            <div className="items">
                <ImageCard></ImageCard>
                
                
                
                  
                
                
            </div>
            <div className='pag'>
              <Pagination pgNum={pgNum} pgCurr={setPgcurr}></Pagination>
            </div>
            
        </div>
    </div>
    
    <Footer></Footer>
    </>
    
  )
}

export default Allproducts