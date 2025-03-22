import React from 'react'
import "./ShopByCategory.css"

export const ShopByCategoryCard = () => {
    return (
        <div className='flex gap-3 flex-col lg:w-[249] lg:h-[249] justify-center items-center group cursor-pointer'>
            <div className='custom-border w-[150px] h-[150px] rounded-full bg-primary-color'>
                <img className='rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full' src='https://cdn-icons-png.freepik.com/256/14257/14257459.png?semt=ais_hybrid' alt=''></img>
            </div>
            <h1>Foods</h1>
        </div>
    )
}

export default ShopByCategoryCard;