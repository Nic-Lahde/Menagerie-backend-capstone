import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Pet } from "./Pet";
import { PetDetails } from "./PetDetails"

export const MyPets = ({ userProfile }) => {
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState()
    useEffect(() => {
        if (userProfile) {
            fetch('/api/Pet/' + userProfile.id).then(res => (res.json())).then(res => setPets(res))
        }
    }, [userProfile])

    return (
        <>
            {userProfile ? (
                <>
                    {selectedPet ? (
                        <PetDetails pet={selectedPet} setSelectedPet={setSelectedPet} setPets={setPets} />
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