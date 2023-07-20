import React, { useEffect, useState } from "react";
import { Pet } from "./Pet";

export const MyPets = ({ userProfile }) => {
    const [pets, setPets] = useState([])

    useEffect(() => {
        if (userProfile) {
            fetch('/api/Pet/' + userProfile.id).then(res => (res.json())).then(res => setPets(res))
        }
    }, [userProfile])

    return (
        <>{userProfile ? (
            <>
                <h1>{userProfile.name}'s Pets</h1>
                {pets.map((pet) => (<Pet pet={pet} key={pet.id} />))}
            </>) : ("")}
        </>
    )
}