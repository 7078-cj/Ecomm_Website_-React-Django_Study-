import React from 'react'
import './style/Home.css'
import Header from '../components/Header'
import ImageCard from '../components/ImageCard'
import CategoryCard from '../components/CategoryCard'
import Footer from '../components/Footer'

import { useNavigate } from 'react-router-dom'

function Home() {
  var nav = useNavigate();
  return (
    <>
    <Header></Header>
    <div className="hero-container">

      <div className="content-container">
        <h1 className='content'>Heading</h1>
        <p className='content'>Sub</p>
        <button className='content' id='shop' onClick={()=>{
        nav('/shop')
      }}>
          Shop Now
        </button>
        
        
      </div>
      {/* <img src="src\pages\img\images.jpg" alt="" /> */}
     
      <div className="heroImg"></div>
    </div>
    <div className="hero-footer">
      <h2>VERSACE</h2>
      <h2>ZARA</h2>
      <h2>GUCCI</h2>
      <h2>PRADA</h2>
      <h2>CALVIN KLEIN</h2>
    </div>
    <section className='st-sect'>
      <div className='new-arri'>
        <h4>New Arrival</h4>
        <div className='mid-img'>
          <ImageCard></ImageCard>
         
          
        </div>
        
      </div>
      
      <hr />

      <div className='top-sell'>
        <h3>Top-Seller</h3>
          <div className="mid-img">
            <ImageCard></ImageCard>
            
          </div>
          
        
      </div>
      

    </section>
    <section id='nd-sect'>
      <div className="browse">
        <h3>Browse By style</h3>
        <div className="category">
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          
          
          
        </div>
      </div>
      
    </section>
    <Footer></Footer>
    


    

    </>
  )
}

export default Home