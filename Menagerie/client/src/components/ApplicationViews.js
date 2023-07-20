import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/" >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route index element={isLoggedIn ? <VideoList /> : <Navigate to="/login" />} />
                <Route path="videos">
                    <Route index element={isLoggedIn ? <VideoList /> : <Navigate to="/login" />} />
                    <Route path="add" element={isLoggedIn ? <VideoForm /> : <Navigate to="/login" />} />
                    <Route path=":id" element={isLoggedIn ? <VideoDetails /> : <Navigate to="/login" />} />
                </Route>
                <Route path="users/:id" element={isLoggedIn ? <UserVideos /> : <Navigate to="/login" />} />
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
};

export default ApplicationViews;