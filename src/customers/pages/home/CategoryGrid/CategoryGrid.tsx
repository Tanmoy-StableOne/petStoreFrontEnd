import React from 'react'

const CateGoryGrid = () => {
    return (
        <div className='grid gap-4 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
            <div className='col-span-2 row-span-1 text-white'>
                <img 
                    src="https://media.istockphoto.com/id/1158878159/vector/pet-shop-poster-or-banner-design-template-vector-cartoon-illustration-of-cats-dogs-aquarium.jpg?s=612x612&w=0&k=20&c=cfrTJw7SK8FX3mrD7qL0NZkb-TcekYR6t5rfDB8jb7M=" 
                    alt='' 
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className='col-span-8 row-span-1 text-white'>
                <img 
                    src='https://media.istockphoto.com/id/1334825179/vector/pet-shop-interior-concept-vector-illustration-animal-store-with-canine-food-birds-cage.jpg?s=612x612&w=0&k=20&c=Ju9jiZaqfL7uNAv-1FeFrVeaXq2PIqaooa0FRweGDv4=' 
                    alt='' 
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className='col-span-2 row-span-1 text-white'>
                <img 
                    src="https://media.istockphoto.com/id/1351093796/photo/woman-in-pet-shop.jpg?s=612x612&w=0&k=20&c=Y751-zPMBtGcs2kbBZB0rCPb6GSTBeYPLXc4eAJcL8c=" 
                    alt='' 
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
        </div>
    );
    
}

export default CateGoryGrid