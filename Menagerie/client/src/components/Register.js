import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { name, email };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup row className="mt-5">
                    <Label htmlFor="name" sm={{ size: 2, offset: 3 }}>Name</Label>
                    <Col sm={2}>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </FormGroup>
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
                <FormGroup row className="mt-5">
                    <Label for="confirmPassword" sm={{ size: 2, offset: 3 }}>Confirm Password</Label>
                    <Col sm={2}>
                        <Input
                            id="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}