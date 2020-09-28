import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import '../../global.css';
import './login.css';
import logo from '../../assets/logo.png';
import heroes from '../../assets/heroes.png';
import {LogIn } from 'react-feather';
import api from '../../services/api';
 


export default function Login() {

    const history = useHistory();
    const [id, setId] = useState('');

   async function userLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('login', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('home')
             
             
        } catch (error) {
            alert('ID nao encontrado nos nossos Registos!');
        }
    }


    return (
         <div className="login-container">
             <div className="content">
                <img  className="img-login" src={logo} alt=""/>
                <h1>Faça seu Login</h1>

                <form onSubmit = {userLogin}>
                    <input className="login-input"
                    placeholder="sua ID"
                    value = {id}
                    onChange = {e => setId(e.target.value)} 
                    />

                    <button className="login-btn" type = "submit" >Entrar</button>
                </form> 
                <Link to="/register">
                    
                        <LogIn className="login" size={16} color="#440297"  />
                    
                        Nao tenho cadastro
                </Link>

             </div>

             <img src={heroes} alt=""/>
         </div>
    )
}