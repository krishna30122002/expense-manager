import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
    //submit Handler
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    //submit Handler
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/users/login", values);
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
        <>
            <div className="register-page">
                {loading && <Spinner />}
                <div className="register-wrapper">
                    <Form layout="vertical" onFinish={submitHandler}>
                        <h1>‎ ‎ ‎ ‎ ‎ Login Form ‎ ‎ ‎ ‎ ‎ </h1>
                        <Form.Item label="Email" name="email">
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" />
                        </Form.Item>
                        <div className="btn-link">
                            <button className="btn btn-primary">Login</button>
                            <Link to="/register">
                                Not a user? Click here to Register
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;
