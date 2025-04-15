import React from 'react'

const Card = ({image, name, dob , clas}) => {
    return (
        <div className='flex justify-center py-5 bg-black text-white '>
            <div className=' border w-[25%] flex flex-col justify-center align-middle rounded-2xl p-6  '>
                <img className='ml-16 w-[45%] rounded-full' src={image} />
                <h1>Name: {name}</h1>
                <p>Dob: {dob} </p>
                <p>Class: {clas} </p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicdus corporis!</p>
            </div>
        </div>

    )
}

export default Card