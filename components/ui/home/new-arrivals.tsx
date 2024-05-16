import React from 'react'
import ProductCard from '../Cards/product-card'
import Link from 'next/link'

const NewArrivals = () => {
  return (
    <>
    <h2 className='text-5xl font-light text-primary font-karantina p-5 pb-5 '>New Arrivals
    <hr className='w-20 border-2 border-accent' />
    </h2>
    <section className='grid grid-cols-2 md:grid-cols-4 gap-3 md:px-5 justify-items-center'>
        {
            [1,2,3,4,5,6,7,8].map((item, index)=>(
            <ProductCard variant='V1'/>
            ))
        }
    </section>

   <div className='w-full grid place-items-center py-5'>
   <Link href={"/"} className='text-xl p-2  px-5 border-2 border-transparent bg-accent hover:border-accent text-white mx-auto hover:bg-white hover:text-accent'>Shop Now</Link>
   </div>
    </>
  )
}

export default NewArrivals