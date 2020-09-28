import React, { useState, useEffect } from 'react';
import {Power, Trash2} from 'react-feather'; 
import {Link, useHistory} from 'react-router-dom';
import logo from '../../assets/logo.png';
import './main.css';
import '../../global.css'; 
import api from '../../services/api';
 

export default function Main() {

    const [casos, setCasos] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory(); 

    useEffect(() => {
        api.get('perfil', {
            headers: {
                ong_id: ongId
            }
        }).then(response => {
            setCasos(response.data)
        })
        
    }, [ongId])

    async function casosDelete(id) {
        
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    ong_id: ongId
                }
            })

            setCasos(casos.filter(caso => caso.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function logOut() {
        localStorage.clear()
        
        history.push('/');
    }



    return (
        <div className="main-container">
            <header>
                
                <img className="img-main" src={logo} alt=""/>
                <h3>Bem vindo, {ongName}</h3> 
                
               <Link to="/register-case" className="main-btn" >Cadastrar novo caso</Link>
               <button className="power" onClick={logOut} >
                    <Power color="#440297"/>
                </button>
               
               

            </header>

            <h2>Casos Cadastrado</h2>

            <ul>
               { casos.map(caso => (
                    <li key={caso.id}>
                
                        <strong>Caso:</strong>
                        <p>{caso.title}</p>

                        <strong>Descrição</strong>
                        <p>{caso.description}</p>

                        <strong>Valor</strong>
                        
                        <p>  
                        
                        {  
                         Intl.NumberFormat('pt-PR', {style: 'currency', currency: 'Mzn'}).format(caso.value)
                        }
                        </p>
                   
                        
                        <button onClick={() => casosDelete(caso.id)}>
                        <Trash2 color="#440297" className="trash2" />
                        </button>
                    </li>
                   ))
               }
              
            </ul>
        </div>
    )
}