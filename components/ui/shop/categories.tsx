import Link from 'next/link'
import React from 'react'

const Categories = () => {
  return (
    
    <div className="w-full border flex flex-col gap-3 px-2 pb-4">
    <h3 className="text-lg p-1  border-b">Categories</h3>

    {["Men shoes", "Women shoes", "Kids shoes"].map(
      (item, index) => (
        <Link
          className="text-sm text-primary/80 hover:text-accent "
          href={`/${item.toLocaleLowerCase()}`}
          key={index}
        >
          {item}
        </Link>
      )
    )}
  </div>
  )
}

export default Categories