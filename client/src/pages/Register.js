import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import front from "../images/front.png";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/users/register", formData);
            message.success("Registration Successful");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            message.error("Something went wrong");
        }
    };

    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <div className="register-page">
                <img className="imagefront" src={front} alt="front" />
                {loading && <Spinner />}
                <div className="register-wrapper">
                    <div className="register-title">
                        <span>Registration</span>
                    </div>
                    <form layout="vertical" onSubmit={submitHandler}>
                        <div className="row">
                            <i>
                                <FontAwesomeIcon icon={faUser} />
                            </i>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="row">
                            <i>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </i>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="row">
                            <i>
                                {" "}
                                <FontAwesomeIcon icon={faLock} />
                            </i>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="row button">
                            <input type="submit" defaultValue="Register" />
                        </div>
                        <div className="signup-link">
                            <Link to={"/login"}>
                                Already Registered? Click here to login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
