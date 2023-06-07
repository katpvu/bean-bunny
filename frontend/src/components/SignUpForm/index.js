import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { restoreSession, signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import spilledBeans from "../../assets/spilled-beans.png"
import { Ring } from '@uiball/loaders';


const SignUpForm = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [loginLoad, setLoginLoad] = useState(false);

    
    useEffect(() => {
        dispatch(restoreSession())
    }, []);
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        setLoginLoad(true);
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        dispatch(signup(newUser))
            .catch(async res => {
                let errors = await checkErrors(res);
                setErrors(errors);
                setLoginLoad(false);
            });
    };

    return (
        <div className="login-container">
                <h2 className="login-form-title">Create an Account</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <ul className="error-message">
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
                    <button className="login-button">
                        {loginLoad ?
                        <Ring 
                            size={20}
                            lineWeight={5}
                            speed={2} 
                            color="white" 
                            />
                        : "Sign Up"
                        }
                    </button>
                </form>
                <img className="login-beans" src={spilledBeans} alt="background" />


        </div>
    );
};

export default SignUpForm;