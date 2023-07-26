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
                    .then(petsData => {
                        const petsWithFeedingTime = petsData.map(pet => ({
                            ...pet,
                            daysUntilNextFeeding: daysUntilNextFeeding(pet)
                        }));
                        const sortedPets = sortPetsByFeedingTime(petsWithFeedingTime);
                        setPets(sortedPets);
                    });
            });
        }
    }, [userProfile, selectedPet]);

    const daysUntilNextFeeding = (pet) => {
        if (pet.feedings && pet.feedings.length > 0) {
            const feedingsDates = pet.feedings.map(feeding => new Date(feeding.date));
            const mostRecentFeedingDate = new Date(Math.max(...feedingsDates));
            const currentTime = new Date();
            const timeSinceLastFeeding = currentTime.getTime() - mostRecentFeedingDate.getTime();
            const daysSinceLastFeeding = timeSinceLastFeeding / (1000 * 3600 * 24);
            const daysRemaining = pet.foodInterval - daysSinceLastFeeding;
            return Math.floor(Math.max(0, daysRemaining));
        }
        return 0;
    };
    const sortPetsByFeedingTime = (pets) => {
        return pets.sort((petA, petB) => {
            const daysUntilPetAFeeding = petA.daysUntilNextFeeding;
            const daysUntilPetBFeeding = petB.daysUntilNextFeeding;
            return daysUntilPetAFeeding - daysUntilPetBFeeding;
        });
    };
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
                                    <Pet pet={pet} key={pet.id} setSelectedPet={setSelectedPet} daysUntilNextFeeding={daysUntilNextFeeding} />
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