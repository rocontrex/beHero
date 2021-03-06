import React, { useState } from 'react';
import API from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    
    async function handleIncident( e ){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            const response = await API.post('incidents',data, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        }catch (err){
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="new_incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleIncident}>
                    <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>

                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>

                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}/>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}