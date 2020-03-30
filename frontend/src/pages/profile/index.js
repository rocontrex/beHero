import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import API from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongId')
    const history = useHistory();

    useEffect(() => {
        API.get('profile', {
            headers: {
                Authorization: ongID,
            }
        }).then( response => {
            setIncidents(response.data);
        } )
    }, [ongID]);

    async function handleDeleteIncident(id){
        try{
            await API.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongID,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Não foi possivel excluir o caso, tente novamente.');
        }

    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
    <div className="profile-container">
        <header>
            <img src={logoImg} alt="Be the Hero"/>
            <span>
                Bem vinda, {ongName}
            </span>
            <Link className='button' to="/incident/new">Cadastrar novo caso</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color='#E02041'/>
            </button>
        </header>

        <h1>Casos cadastrados</h1>
        <ul>
            {
                incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>
                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>
                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                    <button  onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color='#a8a8b3'/>
                    </button>
                </li>
                ))
            }
        </ul>
    </div>
    );
}