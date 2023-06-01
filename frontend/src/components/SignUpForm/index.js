import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import './index.css'
import { signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import spilledBeans from "../../assets/spilled-beans.png"


const SignUpForm = (props) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        dispatch(signup(newUser))
            .catch(async res => {
                let errors = await checkErrors(res)
                setErrors(errors)
            });
    };

    return (
        <div className="login-container">
                <h2 className="login-form-title">Create an Account</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <ul className="errors">
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <input 
                        required 
                        className="sign-in-text-box" 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="email"/>
                    <input 
                        required 
                        className="sign-in-text-box" 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="username"/>
                    <input 
                        required 
                        className="sign-in-text-box" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="password"/>
                    <div className="create-acc-line">
                        <p>Already have an account? <Link to="/login">Sign in here!</Link></p>
                    </div>
                    <button className="login-button">Sign Up</button>
                </form>
                <img className="login-beans" src={spilledBeans} alt="background" />


        </div>
    )
};

export default SignUpForm;