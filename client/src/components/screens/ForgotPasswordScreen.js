import React, {useState} from 'react';
import axios from "axios";
import "./ForgotPasswordScreen.css";

export default function ForgotPasswordScreen({history}) {
    const [email, setEmail]=useState("");
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");

    const forgotpasswordHandler=async (e)=>{
        e.preventDefault();

        const config={
            header: {
                "Content-Type":"application/json",
            },
        };

        try{
            const {data}=await axios.post(
                "/api/auth/forgetPassword",
                {
                    email,
                }, 
                config
            );

            setSuccess(data.data);
            
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }

    return (
        <div className="forgotpassword-screen">
            <form onSubmit={forgotpasswordHandler} className="forgotpassword-screen__form">
                <h3 className="forgotpassword-screen__title">forgotpassword</h3>
                    {error && <span className="error-message">{error}</span>}
                    {success && <span className="success-message">{success}</span>}
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

                <button type="submit" className="btn btn-primary">
                     Send Email
                </button>
           </form>
        </div>
    );
};
