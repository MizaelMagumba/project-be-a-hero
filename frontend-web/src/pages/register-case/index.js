import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../../global.css';
import './register-case.css'; 
import logo from '../../assets/logo.png';
import {ArrowLeft} from 'react-feather';
import api from '../../services/api';

export default function RegisterCase() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
 

    async function registerNewCase(e) {
        e.preventDefault()

        const dataCases = {
            title,
            description,
            value,
        }

        try {
            await api.post('casos', dataCases, {
                headers: {
                    ong_id: ongId
                }
            }) 
            history.push('home')

        } catch (error) {
            alert('Erro ao criar caso, tente novamente.')
        }
    }

     
    return (
        <div className="register-case-container">
            <section className="register-case-section" >
                <div className="content">
                    <img className="register-img-logo" src={logo} alt=""/>
                    <h2>Cadastrar novo caso</h2>
                    <p>Descreva o caso detalhadamentepara encontrar um heroi para resolver isso.</p>
                    <Link className="voltar-home" to="/home" >
                        <ArrowLeft color="#440297" size={16} className="arrow-left" />
                        voltar para home
                    </Link>
                </div>

                <form onSubmit= {registerNewCase}>
                    <input   
                        placeholder="Titulo do caso" 
                        className="new-case-input"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea  
                        placeholder="Descrição" 
                        className="new-case-input"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <input  
                        placeholder="valor em metical" 
                        className="new-case-input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        
                    />

                    <div className="new-case-btn" >
                        <button className="btn-cancel" >Cancelar</button>
                        <button className="btn-cadastrar" type= "submit">Cadastrar</button>
                    </div> 
                </form>
            </section>
        </div>
    )
}