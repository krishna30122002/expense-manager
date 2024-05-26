import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import front from "../images/front.png";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post("/users/login", formData);
            setLoading(false);
            message.success("Login Successful");
            localStorage.setItem(
                "user",
                JSON.stringify({ ...data.user, password: "" })
            );
            navigate("/");
        } catch (error) {
            setLoading(false);
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="register-page">
            <img className="imagefront" height={"14rem"} src={front} alt="front" />
            {loading && <Spinner />}
            <div className="register-wrapper">
                <div className="register-title">
                    <span>Login</span>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <i>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        <input
                            type="email"
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
                        <input type="submit" value="Login" />
                    </div>
                    <div className="signup-link">
                        <Link to={"/register"}>
                            Not a user? Click here to Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
