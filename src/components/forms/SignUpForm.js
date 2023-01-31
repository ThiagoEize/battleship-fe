import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUnlockAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

import './Form.css';

const SignUpForm = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/users/signup', formData)
            if (res.data.success) {
                console.log(res)
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };

    const [formData, setFormData] = useState({
        permissionId: null,
        email: '',
        password: '',
        repassword: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="note-form-container">
            <form className="signup-form">
                <div className="input-icon">
                    <input className="form-email"
                        type="email"
                        title="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    >
                    </input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
                <div className="input-icon">
                    <input className="form-password"
                        type={showPassword ? 'text' : 'password'}
                        title="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                    </input>
                    <span className='eye-icon' onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUnlockAlt} />
                    </span>
                </div>
                <div className="input-icon">
                    <input className="form-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        title="Password"
                        name="repassword"
                        value={formData.repassword}
                        onChange={handleChange}
                    >
                    </input>
                    <span className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                </div>
                <div className="input-icon">
                    <input className="form-firstName"
                        type="text"
                        title="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    >
                    </input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                </div>
                <div className="input-icon">
                    <input className="form-lastName"
                        type="text"
                        title="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    >
                    </input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div>
                <button className="form-btn-signup" onClick={(e) => handleSignUp(formData)}>
                    Sign In
                </button>
            </form >
        </div >

    );
};

export default SignUpForm;