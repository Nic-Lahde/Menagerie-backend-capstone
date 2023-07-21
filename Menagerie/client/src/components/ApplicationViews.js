import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { MyPets } from "./MyPets";
import { PetDetails } from "./PetDetails"
import { PetForm } from "./PetForm"

const ApplicationViews = ({ isLoggedIn, userProfile }) => {
    return (
        <Routes>
            <Route path="/" >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route index element={isLoggedIn ? <MyPets userProfile={userProfile} /> : <Navigate to="/login" />} />
                <Route path="index/:id" element={isLoggedIn ? <PetDetails userProfile={userProfile} /> : <Navigate to="/login" />}></Route>
                <Route path="addPet" element={isLoggedIn ? <PetForm userProfile={userProfile} /> : <Navigate to="/login" />}></Route>

            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
};

export default ApplicationViews;