import { useState } from "react";
// import { Button } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useGlobalContext } from "../../contexts/GlobalContext";

const ProfileForm = ({ handleCloseForm }) => {
    const {
        token,
        userId,
        user
    } = useGlobalContext();

    const handleChangeProfile = async (e) => {
        try {
            const res = await axios.put(`http://localhost:8080/users/${userId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.success) {
                console.log(res)
            }
            handleCloseForm();
        } catch (err) {
            console.log(err);
        }
    };

    const [formData, setFormData] = useState({
        email: user.email || '',
        password: user.password || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
    });

    const [repassword, setRepassword] = useState(user.password);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeRepassword = (event) => {
        setRepassword(event.target.value)
    }

    return (
        <div className="note-form-container">
            <form>
                <Modal.Header>
                    <h3>Profile</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="repassword"
                        value={repassword}
                        onChange={handleChangeRepassword}
                    />
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="userName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="userLastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseForm()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleChangeProfile(formData)}>
                        Change Profile
                    </Button>
                </Modal.Footer>
            </form >
        </div>

    );
};

export default ProfileForm;