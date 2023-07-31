import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { MyPets } from "./MyPets";
import { PetForm } from "./PetForm"
import { Genetics } from "./Genetics"
import { ClutchCalculator } from "./ClutchCalculator";

const ApplicationViews = ({ isLoggedIn, userProfile, selectedPet, setSelectedPet }) => {
    return (
        <Routes>
            <Route path="/" >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route index element={isLoggedIn ? <MyPets userProfile={userProfile} setSelectedPet={setSelectedPet} selectedPet={selectedPet} /> : <Navigate to="/login" />} />
                <Route path="clutchCalculator" element={isLoggedIn ? <ClutchCalculator userProfile={userProfile} /> : <Navigate to="/login" />}></Route>
                <Route path="addPet" element={isLoggedIn ? <PetForm userProfile={userProfile} /> : <Navigate to="/login" />}></Route>
                <Route path="genetics" element={isLoggedIn ? <Genetics userProfile={userProfile} /> : <Navigate to="/login" />}></Route>
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
};

export default ApplicationViews;