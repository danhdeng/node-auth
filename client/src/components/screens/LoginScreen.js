import React, {useState} from 'react'
import axios from "axios";
import "./LoginScreen.css";

export default function LoginScreen({history}) {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");
    
    const loginHandler=async (e)=>{
        e.preventDefault();

        const config={
            header: {
                "Content-Type":"application/json",
            },
        };

        try{
            const {data}=await axios.post(
                "/api/auth/login",
                {
                    email,
                    password
                }, 
                config
            );

            localStorage.setItem("authToken", data.token);

            history.push("/");
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }

    return (
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen__form">
                <h3 className="login-screen__title">login</h3>
                    {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        required
                        id="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        required
                        id="password"
                        placeholder="Enter password"
                        autoComplete="true"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    login
                </button>
           </form>
        </div>
    );
};
