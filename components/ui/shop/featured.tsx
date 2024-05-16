import React from 'react'
import ProductCard from '../Cards/product-card'

const Featured = () => {
  return (
   
    <div className="w-full border flex flex-col gap-2 px-2 pb-4">
    <h3 className="text-lg p-1  border-b">Featured</h3>
     <ProductCard  variant="V2"/>
     <ProductCard  variant="V2"/>
     <ProductCard  variant="V2"/>
     <ProductCard  variant="V2"/>

  </div>
  )
}

export default Featured