import React from 'react'
import { FoodCategoryCard } from './FoodCategoryCard'

const FoodCategory = () => {
    return (
        <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
            {[1,1,1,1,1].map((item)=> <FoodCategoryCard></FoodCategoryCard>)}
        </div>
    )
}

export default FoodCategory