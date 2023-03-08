import React, { useEffect, useState } from "react";

const Status = ({ status }) => {
    const [means, setMeans] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            setMeans('Ожидание');
        } else if (status === 'stopped') {
            setMeans('На паузе'); 
        } else {
            setMeans('Запись');
        }
    }, [status]);

    return(
        <div className="status">
            <div className="status__circle" 
            style={(means === 'Ожидание') ? {background: '#D9D9D9'} :
            (means === 'На паузе') ? {background: '#EB5757'} : {background: '#219653'}}
            >
            </div>
            <div className="status__text">{means}</div>
        </div>
    )
};

export default Status;