import React from 'react'

const DealCard = () => {
    return (
        <div className='w-[10rem] max-w cursor-pointer border-4 border-black rounded-lg overflow-hidden'>
            <img 
                className='w-full h-[9rem] object-cover object-top border-b-4 border-pink-600 rounded-t-lg' 
                src='https://cdn-icons-png.freepik.com/256/8334/8334173.png?semt=ais_hybrid' 
                alt='Best Dog Food'
            />
            <div className='bg-black text-white p-3 text-center'>
                <p className='text-lg font-semibold'>Best Dog Food</p>
                <p className='text-2xl font-bold'>Fresh Item</p>
                <p className='text-lg'>Shop Now</p>
            </div>
        </div>
    )
}


export default DealCard;