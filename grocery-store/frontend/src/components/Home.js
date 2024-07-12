import React, {useEffect, useState} from 'react';
import {getGroceries} from '../services/api';

function Home() {
    const [groceries, setGroceries] = useState([]);


    useEffect(() => {
        getGroceries().then((response) => {
            setGroceries(response.data);
        });
    }, []);

    return (
        <div> 
            <h1>Grocery Store</h1>
            <ul>
                {groceries.map((grocery) => (
                    <li key={grocery._id}>{grocery.name} - ${grocery.price}</li>
                ))}
            </ul>
        </div>
    );
}