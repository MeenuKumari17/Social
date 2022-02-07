import axios from 'axios';
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Password don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                
            }
            try {
                await axios.post("http://localhost:4000/api/auth/register", user);
                navigate("/login");
            } catch (error) {
                console.log(error);
            }
        }
    }




  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialApp</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on SocialApp.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    
                    <input 
                    placeholder='Username' 
                    required 
                    ref={username} 
                    className="loginInput" 
                    />
                    
                    <input 
                    placeholder='Email' 
                    required ref={email} 
                    className="loginInput" 
                    type="email"
                    />

                    <input 
                    placeholder='Password' 
                    required 
                    ref={password} 
                    className="loginInput"
                    type="password" 
                    minLength="6"
                    />

                    <input 
                    placeholder='Confirm Password' 
                    required 
                    ref={confirmPassword} 
                    className="loginInput" 
                    type="password"
                    minLength="6"
                    />

                    <button className="loginButton" type='submit'>Sign Up</button>
                    
                    <button className="loginRegisterButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
