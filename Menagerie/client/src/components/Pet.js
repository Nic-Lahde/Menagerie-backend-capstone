import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";

export const Pet = ({ pet, setSelectedPet }) => {


    const handleCardClick = () => {
        setSelectedPet(pet);
    };

    const daysUntilNextFeeding = () => {
        if (pet.feedings && pet.feedings.length > 0) {
            const feedingsDates = pet.feedings.map(feeding => new Date(feeding.date));
            const mostRecentFeedingDate = new Date(Math.max(...feedingsDates));
            const currentTime = new Date();
            const timeSinceLastFeeding = currentTime.getTime() - mostRecentFeedingDate.getTime();
            const daysSinceLastFeeding = timeSinceLastFeeding / (1000 * 3600 * 24); // Convert milliseconds to days
            const daysRemaining = pet.foodInterval - daysSinceLastFeeding;
            return Math.floor(Math.max(0, daysRemaining)); // Ensure it's not negative
        }
        return 0;
    };

    // Function to check if it's time for another feeding
    const isTimeForFeeding = () => {
        return daysUntilNextFeeding() === 0;
    };

    return (
        <Col md="6">
            <div className="d-flex flex-column align-items-center">
                <Card style={{ width: '40rem' }} onClick={handleCardClick} className="mb-5 ml-5 mt-5 mt-5 bg-success text-white">
                    <CardBody>
                        <CardTitle tag="h5">
                            {pet.name}
                        </CardTitle>
                        <img src={pet.imageUrl} alt="image of pet" className="img-thumbnail" style={{ width: "400px", height: "300px" }} />
                        <p>{pet.speciesCommon}</p>
                        <p>{pet.speciesLatin}</p>
                        {isTimeForFeeding() ? (
                            <p>It's time for another feeding!</p>
                        ) : (
                            <p>Next feeding in {daysUntilNextFeeding()} days</p>
                        )}
                    </CardBody>
                </Card>
            </div>
        </Col>
    );
};