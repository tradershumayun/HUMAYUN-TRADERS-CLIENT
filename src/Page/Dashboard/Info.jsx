import React from 'react';
import Time from '../../Components/Time';
import Calculator from '../../Components/Calculator';

const Info = () => {
    return (
        <div>
            <Time/>
            <hr className='py-4' />
            <Calculator/>
            
        </div>
    );
};

export default Info;