import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const PlantCareLogo = () => {
    return (
        <div>
            <h2 className='text-green-500 flex items-center text-2xl md:text-4xl font-bold'>Plant <span><FaLeaf/></span> <span className='text-green-600'>Care</span></h2>
        </div>
    );
};

export default PlantCareLogo;