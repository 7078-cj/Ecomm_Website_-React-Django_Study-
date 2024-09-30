import React from 'react'
import './css/Pagination.css'

function Pagination({pgNum,pgCurr}) {
    let pages = [];
    for (let i = 1; i <= pgNum ; i++){
        pages.push(i)
        
    }
  
  return (
    
    <div className="pgs-btn">
                  {
                    pages.map((page,index) =>{
                      return <div><button key={index} onClick={()=>{pgCurr(page)}}>{page}</button></div>
                    })
                  }
                </div>
    
    
  )
}

export default Pagination