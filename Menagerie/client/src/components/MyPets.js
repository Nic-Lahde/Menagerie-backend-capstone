import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Pet } from "./Pet";
import { PetDetails } from "./PetDetails"
import { getToken } from "../modules/authManager";

export const MyPets = ({ userProfile }) => {
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState()
    useEffect(() => {
        if (userProfile) {
            getToken().then((token) => {
                fetch('/api/Pet/' + userProfile.id, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => setPets(res));
            });
        }
    }, [userProfile]);

    return (
        <>
            {userProfile ? (
                <>
                    {selectedPet ? (
                        <PetDetails pet={selectedPet} setSelectedPet={setSelectedPet} setPets={setPets} userProfile={userProfile} />
                    ) : (
                        <>
                            <h1>{userProfile.name}'s Pets</h1>
                            <Row className="justify-content-evenly">
                                {pets.map((pet) => (
                                    <Pet pet={pet} key={pet.id} setSelectedPet={setSelectedPet} />
                                ))}
                            </Row>
                        </>
                    )}
                </>
            ) : (
                ""
            )}
        </>
    );
}