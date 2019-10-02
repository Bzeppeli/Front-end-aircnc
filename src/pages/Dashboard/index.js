import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/Api';

import './style.css';

/*
o useEffect pode ser usado como função, e recebe dois parametros
o primeiro, é uma função e o segundo é um array de dependencias,
que são variaveis de quando é que você queira que a primeira função seja
executada
*/
export default function Dashboard(){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        
        async function loadSpots(){
            /*
            é preciso antes de carregar os spots ver o usuário logado, então o localstorage
            que é a memoria do navegador, você pode usar esse getItem e usar o nome que foi atribuido na pagina
            de login que no caso foi user.
            */
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboards',{
                headers: { user_id }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, [])
    
    return (
        <>
            <ul className="spot-list">
                {spots.join(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            < Link to="/new">
                <button className="btn">Cadastrar um novo spot</button>
            </Link>
        </>
    )
}