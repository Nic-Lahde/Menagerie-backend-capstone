import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Login Failed"));
    };

    return (
        <Form onSubmit={loginSubmit}>
            <fieldset>
                <FormGroup row className="mt-5">
                    <Label for="email" sm={{ size: 2, offset: 3 }}>Email</Label>
                    <Col sm={2}>
                        <Input
                            id="email"
                            type="text"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row className="mt-5">
                    <Label for="password" sm={{ size: 2, offset: 3 }}>Password</Label>
                    <Col sm={2}>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button>Login</Button>
                </FormGroup>
                <em>
                    Not registered? <Link to="/register">Register</Link>
                </em>
            </fieldset>
        </Form>
    );
}
