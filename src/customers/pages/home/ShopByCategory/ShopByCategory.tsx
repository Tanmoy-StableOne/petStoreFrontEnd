import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'

export const ShopByCategory = () => {
    return (
        <div className='flex flex-wrap justify-between gap-2 lg:px-20'>
            {[1,1,1,1,1,1,1,1,1,1,1].map((item)=><ShopByCategoryCard></ShopByCategoryCard>)}
        </div>
    )
}

export default ShopByCategory;