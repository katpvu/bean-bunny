import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css'
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import spilledBeans from "../../assets/spilled-beans.png"

const LoginFormPage = (props) => {
    // hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;


    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        dispatch(login(user))
            .catch(async res => {
                let errors = await checkErrors(res)
                setErrors(errors)
            });
    };

    const handleDemoLogIn = (e) => {
        e.preventDefault();
        const demoUser = {
            username: 'demobunny',
            password: 'password'
        }
        dispatch(login(demoUser))
            .then(history.push("/"))
    };

    return (
        <>
        <div className="login-container">
            <h2 className="login-form-title">Welcome back</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <ul>
                    {errors.map(error => <li key={error} className="error-message">{error}</li>)}
                </ul>
                <input 
                    required 
                    className="sign-in-text-box" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username" 
                />
                <input 
                    required 
                    className="sign-in-text-box" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="password"
                />
                <div className="create-acc-line" >
                    <p >Not a member yet? <Link to="/signup">Create an account</Link></p>
                </div>
                    <button className="login-button">Sign In</button>

                    <button className="login-button" onClick={handleDemoLogIn}>Login as Demo User</button>
            </form>
            <img className="login-beans" src={spilledBeans} alt="background" />
        </div>
        </>
    )

};

export default LoginFormPage;